import React from "react";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useRoot } from "../../state/root";
import ControlPanel from "./ControlPanel";
import { ArrowIconBlue } from "../../assets/icons/menu/menu-icons";
import { usePosts } from "../../state/posts";
import LogButton from "../buttons/LogButton";
import ActionPanel from "../menus/ActionPanel";

const AuthenticatedHeader = () => {
   const selectedTitle = useRoot((state) => state.selectedItem);
   const count = usePosts((state) => state.count);
   const headerPanel = useRoot((state) => state.headerPanel);
   const { pathname } = useLocation();
   const navigate = useNavigate();
   const isFeedPage = pathname === "/feed";
   const canGoBack = pathname.split("/").length >= 3;

   return (
      <Header>
         <div className=" w-full flex flex-col">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-5">
                  <button
                     onClick={() =>
                        canGoBack && navigate(pathname.split("/")[0])
                     }
                     className="flex gap-3 p-3 items-center -ml-4"
                  >
                     {canGoBack && (
                        <img
                           className=" h-5 w-5"
                           src={ArrowIconBlue}
                           alt="go back"
                        />
                     )}
                     <h3
                        className={classNames(
                           "text-blue-500 text-xl text-center flex items-center gap-2",
                           {
                              "hover:cursor-pointer": canGoBack,
                           }
                        )}
                     >
                        {selectedTitle}
                        {isFeedPage && (
                           <p className="text-blue-500 text-lg">({count})</p>
                        )}
                     </h3>
                  </button>
               </div>
               <ControlPanel />
            </div>
            {headerPanel && <ActionPanel />}
         </div>
      </Header>
   );
};

export default AuthenticatedHeader;
