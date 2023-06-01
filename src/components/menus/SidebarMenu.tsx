import classNames from "classnames";
import {
   ArrowIcon,
   DashboardIcon,
   SettingsIcon,
} from "../../assets/icons/menu/menu-icons";
import ROUTES from "../../constants/routes";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { useRoot } from "../../state/root";

const { FEED, PROFILE } = ROUTES;

const SidebarMenu = () => {
   const sidebar = useRoot((state) => state.sidebar);
   const animation = useRoot((state) => state.sidebarAnimation);
   const resetSidebarAnimation = useRoot(
      (state) => state.resetSidebarAnimation
   );
   const toggleSidebarMenu = useRoot((state) => state.toggleSidebarMenu);
   const resetAnimation = () => {
      setTimeout(() => resetSidebarAnimation(), 300);
   };
   const [sidebarCollapsedButton, setSidebarCollapsedButton] = useState(false);

   return (
      <aside
         className={classNames(
            " fixed top-0 p-[30px] pt-[24px] flex-col items-center h-full bg-[#FCFCFC] dark:bg-[#161616] border-r border-[#EBEBEB] dark:border-[#212121] z-30",
            {
               "w-[238px]": sidebar,
               "w-[124px] flex items-center": !sidebar,
               "ease-in-out duration-300 translate-x-0": animation,
            }
         )}
         onMouseEnter={() => setSidebarCollapsedButton(true)}
         onMouseLeave={() => {
            setSidebarCollapsedButton(false);
         }}
      >
         <h3 className="text-black text-xl dark:text-white mb-8">PARSER</h3>
         <ul>
            <MenuItem sidebar={true} item={FEED}>
               <DashboardIcon />
            </MenuItem>
            <div
               className={classNames(
                  " w-16 h-px mt-4 mb-4 ease-in-out duration-300  bg-[#E8E8E8] dark:bg-[#3E3E3E]",
                  {
                     "w-16": !sidebar,
                     "w-[177px]": sidebar,
                  }
               )}
            ></div>
            <MenuItem sidebar={true} item={PROFILE}>
               <SettingsIcon />
            </MenuItem>
         </ul>
         <div
            className={classNames("w-full h-fit", {
               hidden: !sidebarCollapsedButton,
            })}
         >
            <button
               className="flex items-center justify-center rounded-full text-[#E72F3C] h-8 w-8 ring-1 ring-[#E72F3C] bg-white dark:bg-black absolute bottom-11 -right-4"
               data-test-id="Navigation-collapse-button"
               type="button"
               aria-expanded="true"
               aria-label="Workspace navigation"
               onClick={() => {
                  toggleSidebarMenu();
                  resetAnimation();
               }}
            >
               <img
                  src={ArrowIcon}
                  className={classNames({ "rotate-180": !sidebar })}
                  alt="Workspace navigation collapse icon"
               />
            </button>
         </div>
      </aside>
   );
};

export default SidebarMenu;
