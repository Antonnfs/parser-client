import React from "react";
import { Link } from "react-router-dom";
import { useRoot } from "../../state/root";

const ActionPanel = () => {
   const hideHeaderPanel = useRoot((state) => state.hideHeaderPanel);
   return (
      <nav className="  h-10 py-1">
         <Link
            to="/feed/new"
            type="button"
            onClick={hideHeaderPanel}
            className=" max-w-fit text-white flex justify-center gap-2 items-center w-full py-2 px-9 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all text-center"
         >
            Create Post
         </Link>
      </nav>
   );
};

export default ActionPanel;
