import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useRoot } from "../../state/root";
import { useUser } from "../../state/user";

const MenuItem = ({
   item,
   sidebar, 
   children,
}: {
   item: {
      name: string;
      route: string;
   };
   sidebar?: boolean;
   children?: React.ReactNode;
}) => {
   const selectedItem = useRoot((state) => state.selectedItem);
   const isSelectedItem = selectedItem === item.name;
   const sidebarCollapsed = useRoot((state) => state.sidebar);
   const selectMenuItem = useRoot((state) => state.selectMenuItem);
   const resetMenus = useRoot((state) => state.resetMenus);
   const signOut = useUser((state) => state.signOut);

   const handleSignOut = () => {
      resetMenus();
      signOut();
   };
   
   return (
      <li
         key={item.route}
         onClick={() => {
            item === ROUTES.SIGN_IN
               ? handleSignOut()
               : selectMenuItem(item.name);
         }}
         className={classNames("block w-full rounded-xl mb-1", {
            "mb-4": sidebar,
            "bg-blue-500 text-white": isSelectedItem,
            "hover:bg-[#E8E8E8] dark:hover:bg-[#3E3E3E] hover:text-[#98989B]":
               !isSelectedItem,
            "text-base flex text-[#98989B]": sidebar && !isSelectedItem,
         })}
      >
         <Link
            to={item.route}
            className={classNames(
               "flex items-center w-full px-5 py-[10px] fill-[#A8A8A8]",
               {
                  "fill-white": sidebar && isSelectedItem,
               }
            )}
         >
            {children}
            <span
               className={classNames({
                  " text-lg": !sidebar,
                  "font-onest-medium ml-4": sidebar,
                  hidden: sidebar && !sidebarCollapsed,
               })}
            >
               {item.name}
            </span>
         </Link>
      </li>
   );
};

export default MenuItem;
