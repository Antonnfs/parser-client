import React, { useState } from "react";
import moment from "moment";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { PostItem, usePosts } from "../../state/posts";
import IconEdit from "../../assets/icons/common/edit";
import IconDelete from "../../assets/icons/common/delete";
import IconBxLinkExternal from "../../assets/icons/common/ReadMore";
import DeleteModal from "../modals/Delete";

export default function Post() {
   const [isModalOpen, setModalOpen] = useState(false);
   const deletePost = usePosts((state) => state.deletePost);
   const { pathname, state }: { pathname: string; state: PostItem } =
      useLocation();
   const navigate = useNavigate();

   const { title, content, image, isoDate, creator, link, guid, categories } =
      state;
   const date = moment(isoDate).format("HH:MM:SS DD.MM.YYYY");

   const handleDelete = async () => {
      await deletePost(guid);
      setModalOpen(false);
      navigate("/feed");
   };

   return (
      <>
         <div className="py-7 flex flex-col gap-7 relative pt-0 w-full dark:text-white">
            <h1 className="text-center text-xl ">{title}</h1>
            <div className="flex gap-7">
               <img
                  className="w-1/2 h-full rounded-lg"
                  src={image}
                  alt={title}
               />
               <div className="flex w-1/2 flex-col gap-7  ">
                  <div className="flex justify-between items-center text-sm opacity-70">
                     <p>Creator: {creator}</p>
                     <p>{date}</p>
                  </div>
                  <p className="py-3">{content}</p>
                  {link && (
                     <a
                        className="text-white flex justify-center gap-2 items-center w-full py-2 px-9 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all text-center"
                        href={link}
                     >
                        Read more
                        <IconBxLinkExternal />
                     </a>
                  )}
                  <div className="flex gap-7 w-full">
                     <Link
                        to={`/feed/${guid}/edit`}
                        state={state}
                        type="button"
                        className="w-full flex justify-center gap-2 items-center border bg-red-500 dark:bg-transparent border-red-500 dark:border-red-900 disabled:bg-red-300 disabled:cursor-not-allowed text-white dark:hover:border-red-500 hover:bg-red-700 transition-all focus:outline-none rounded-lg py-2 px-9 text-center"
                     >
                        <IconEdit />
                        Edit
                     </Link>
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
                  </div>
               </div>
            </div>
         </div>
         <DeleteModal
            text="post"
            isOpen={isModalOpen}
            setOpen={setModalOpen}
            handleDelete={handleDelete}
         />
      </>
   );
}
