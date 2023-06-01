import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import showToast, { ModalType } from "../modals/Toast";
import UploadIcon from "../../assets/icons/common/UploadIcon";
import Spin from "../../assets/icons/common/UploadSpin";
import classNames from "classnames";
import { useUser } from "../../state/user";
import { storage } from "../../firebase";

interface UploadProps {
   image: string;
   setImage: Dispatch<SetStateAction<string>>;
}

const UploadImage = ({ image, setImage }: UploadProps): JSX.Element => {
   const [spin, setSpin] = useState(false);
   const user = useUser((state) => state.user);
   const onDrop = useCallback(async (acceptedFiles: File[]) => {
      setSpin(true);
      setImage("");
      try {
         if (!user) return;
         const file = acceptedFiles[0];
         const refUrl = `posts/${user.uid}/${Date.now()}${file.name}`;
         const storageRef = ref(storage, refUrl);
         await uploadBytesResumable(storageRef, file);
         const image = await getDownloadURL(storageRef);
         if (image) {
            setImage(image);
            showToast({
               type: ModalType.success,
               title: "Uploaded successfully",
               description: "Image was uploaded!",
            });
         } else {
            showToast({
               type: ModalType.error,
               title: "Failed to upload",
               description: "Please try later",
            });
         }
         return;
      } catch (error: any) {
         showToast({
            type: ModalType.error,
            title: error?.message || "The error was occured",
            description: "Please try later",
         });
      }
      setSpin(false);
   }, []);
   const { getRootProps, getInputProps } = useDropzone({ onDrop });

   return (
      <>
         <div className="w-full flex flex-col mb-4">
            <label
               htmlFor="image"
               className="block mb-2  tracking-wider text-[#3E3E3E] dark:text-[#F9F9F9]"
            >
               Image
            </label>
            <div
               {...getRootProps()}
               className="h-full flex justify-center items-center w-full border border-black dark:border-white border-dashed rounded-lg cursor-pointer"
            >
               <input name="image" {...getInputProps()} />
               <div className="flex flex-col justify-center items-center">
                  {!image && <UploadIcon />}
                  {spin && !image && (
                     <div className="flex justify-center items-center">
                        <Spin />
                     </div>
                  )}
                  {!spin && !image && (
                     <p className="text-gray-500 p-3">
                        Drag your files here or click in this area.
                     </p>
                  )}
               </div>
               {image && (
                  <div className="relative w-full h-full ">
                     <img
                        alt="Title image"
                        className="absolute w-full h-full object-cover top-0 left-0 rounded-lg"
                        src={image}
                     />
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default UploadImage;
