import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { PostItem, usePosts } from "../../state/posts";
import IconDelete from "../../assets/icons/common/delete";
import DeleteModal from "../modals/Delete";
import { postSchema } from "../../schemas/postSchema";
import TextInput from "../forms/TextInput";
import UploadImage from "../forms/UploadImage";
import { fetchData } from "../../api";
import { FeedItem } from "../../types";

const PostForm = () => {
   const { pathname, state }: { pathname: string; state: PostItem | null } =
      useLocation();
   const isNewPost = pathname.split("/").pop() === "new";
   const [isModalOpen, setModalOpen] = useState(false);
   const [image, setImage] = useState(state?.image || "");
   const deletePost = usePosts((state) => state.deletePost);
   const navigate = useNavigate();
   const method = isNewPost ? "POST" : "PUT";
   const url = isNewPost ? "/posts/new" : `/posts/${state?.guid}`;

   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
   } = useForm({
      mode: "all",
      defaultValues: {
         title: state?.title || "",
         content: state?.content || "",
         creator: state?.creator || "",
         link: state?.link || "",
      },
      resolver: joiResolver(postSchema),
   });

   const handleDelete = async () => {
      if (state && state.guid) {
         await deletePost(state?.guid);
         setModalOpen(false);
         navigate("/feed");
      }
   };

   const onSubmit = async (data: Partial<FeedItem>) => {
      await fetchData({ method, url, data: { ...data, image } });
      navigate("/feed");
   };

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="dark:text-white text-center mb-3 text-xl">
               {isNewPost ? "New Post" : "Edit Post"}
            </h1>
            <div className="flex w-full gap-10">
               <div className="flex flex-col w-full">
                  <TextInput
                     label="Title"
                     id="title"
                     inputType="input"
                     register={register}
                     errors={errors}
                  />
                  <TextInput
                     label="Content"
                     id="content"
                     inputType="textarea"
                     register={register}
                     errors={errors}
                  />
                  <TextInput
                     label="Creator"
                     id="creator"
                     inputType="input"
                     register={register}
                     errors={errors}
                  />
                  <TextInput
                     label="Link"
                     id="link"
                     inputType="input"
                     register={register}
                     errors={errors}
                  />
               </div>
               <div className="flex w-full pb-2 relative">
                  <UploadImage image={image} setImage={setImage} />
                  <p className="h-6 absolute bottom-0 left-0">
                     {isValid && !image && (
                        <span className="text-red-600 text-xs">
                           Image is required!
                        </span>
                     )}
                  </p>
               </div>
            </div>

            <div className="flex gap-4 fixed bottom-12 right-10  w-1/3">
               <button
                  disabled={!isValid || !image}
                  className="w-full px-4 py-2 bg-blue-500 tracking-wide text-white disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200 transform rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
                  type="submit"
               >
                  {isNewPost ? "Create" : "Save"}
               </button>
               {isNewPost ? (
                  <Link
                     to="/feed"
                     type="button"
                     className="w-full flex justify-center gap-2 items-center border bg-red-500 dark:bg-transparent border-red-500 dark:border-red-900 disabled:bg-red-300 disabled:cursor-not-allowed text-white dark:hover:border-red-500 hover:bg-red-700 transition-all focus:outline-none rounded-lg py-2 px-9 text-center"
                  >
                     Cancel
                  </Link>
               ) : (
                  <button
                     type="button"
                     onClick={(e) => {
                        e.preventDefault();
                        setModalOpen(true);
                     }}
                     className="w-full flex justify-center gap-2 items-center border bg-red-500 dark:bg-transparent border-red-500 dark:border-red-900 disabled:bg-red-300 disabled:cursor-not-allowed text-white dark:hover:border-red-500 hover:bg-red-700 transition-all focus:outline-none rounded-lg py-2 px-9 text-center"
                  >
                     <IconDelete />
                     Delete
                  </button>
               )}
            </div>
         </form>
         <DeleteModal
            text="post"
            isOpen={isModalOpen}
            setOpen={setModalOpen}
            handleDelete={handleDelete}
         />
      </>
   );
};

export default PostForm;
