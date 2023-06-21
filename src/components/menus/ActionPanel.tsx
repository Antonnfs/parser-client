import { Link } from "react-router-dom";
import { useRoot } from "../../state/root";
import { usePosts } from "../../state/posts";
import { ArrowIconWhite } from "../../assets/icons/menu/menu-icons";
import classNames from "classnames";

const ActionPanel = () => {
   const hideHeaderPanel = useRoot((state) => state.hideHeaderPanel);
   const sort = usePosts((state) => state.sort);
   const toggleSort = usePosts((state) => state.toggleSort);

   return (
      <nav className="flex gap-5 items-center h-10 py-1">
         <Link
            to="/feed/new"
            type="button"
            onClick={hideHeaderPanel}
            className=" max-w-fit text-white flex justify-center gap-2 items-center w-full py-1 px-7 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all text-center"
         >
            Create Post
         </Link>
         <button
            className="flex gap-3 items-center  min-w-max border border-blue-600 rounded-lg py-1 px-7"
            onClick={toggleSort}
         >
            <p className="dark:text-white whitespace-nowrap">
               {sort === "desc" ? "Newest first" : "Oldest first"}
            </p>
            <img
               src={ArrowIconWhite}
               className={classNames("transition-all relative top-[1px]", {
                  "-rotate-90": sort === "asc",
                  "rotate-90": sort === "desc",
               })}
               alt="Workspace navigation collapse icon"
            />
         </button>
      </nav>
   );
};

export default ActionPanel;
