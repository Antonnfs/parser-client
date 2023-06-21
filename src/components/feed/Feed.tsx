import React, { useEffect } from "react";
import classNames from "classnames";
import { useRoot } from "../../state/root";
import { usePosts } from "../../state/posts";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Loading from "../Loading";
import ActionPanel from "../menus/ActionPanel";

export default function Feed() {
   const sidebar = useRoot((state) => state.sidebar);
   const getPosts = usePosts((state) => state.getPosts);
   const posts = usePosts((state) => state.posts);
   const { first, last, loading, page, pages, sort } = usePosts(
      (state) => state
   );
   useEffect(() => {
      getPosts();
   }, [first, last, sort]);

   if (loading) return <Loading />;

   return (
      <>
         <div className="flex justify-start pb-9">
            <div className="grid h-full w-full grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
               {posts?.map((post) => (
                  <Link
                     state={post}
                     key={post.guid}
                     replace
                     to={`/feed/${post.guid}`}
                     className="group flex flex-col w-full h-full"
                  >
                     <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                           src={post.image}
                           alt={post.title}
                           className=" h-[250px] w-full sm:h-[200px] lg:h-[220px] xl:h-[250px] 2xl:h-[300px] object-cover object-center group-hover:opacity-75 transition-all"
                        />
                     </div>
                     <h5 className="mt-3 text-lg w-full text-gray-700 dark:text-white">
                        {post.title}
                     </h5>
                  </Link>
               ))}
            </div>
         </div>
         <Pagination />
      </>
   );
}
