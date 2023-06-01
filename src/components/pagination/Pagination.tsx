import React from "react";
import LogButton from "../buttons/LogButton";
import { ArrowIconWhite } from "../../assets/icons/menu/menu-icons";
import { usePosts } from "../../state/posts";

export default function Pagination() {
   const { prevPage, nextPage, page, pages } = usePosts((state) => state);

   return (
      <div className="flex flex-col gap-5 pt-8 pb-16  justify-center">
         <span className="dark:text-white text-2xl pt-4 flex  justify-center w-full">
            Page: {page} / {pages}
         </span>
         <div className="flex gap-5 justify-center">
            <LogButton disabled={page <= 1} handleClick={prevPage}>
               <div className="flex gap-2  items-center justify-center">
                  <img className="w-4 h-4" src={ArrowIconWhite} alt="arrow" />
                  <span className=" text-lg">Prev</span>
               </div>
            </LogButton>
            <LogButton disabled={page === pages} handleClick={nextPage}>
               <div className="flex gap-2  items-center justify-center">
                  <span className=" text-lg">Next</span>
                  <img
                     className="w-4 h-4 rotate-180"
                     src={ArrowIconWhite}
                     alt="arrow"
                  />
               </div>
            </LogButton>
         </div>
      </div>
   );
}
