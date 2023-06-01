import React from "react";
import { SearchIcon, SunIcon } from "../../assets/icons/header/header-icons";
import classNames from "classnames";
import Menu from "../menus/UserMenu";
import { useRoot } from "../../state/root";
import { ArrowIcon } from "../../assets/icons/menu/menu-icons";

const ControlPanel = () => {
   const theme = useRoot((state) => state.theme);
   const changeTheme = useRoot((state) => state.changeTheme);
   const sidebar = useRoot((state) => state.sidebar);
   const toggleHeaderPanel = useRoot((state) => state.toggleHeaderPanel);
   const headerPanel = useRoot((state) => state.headerPanel);

   return (
      <div className="flex">
         {/* <button className='flex items-center justify-center ml-2 w-10'>
        <img src={SearchIcon} alt='Search icon' />
      </button> */}
         <div className="flex justify-center items-center gap-4">
            <button
               className="flex items-center justify-center rounded-full text-[#E72F3C] h-6 w-6 ring-1 ring-[#E72F3C] bg-white dark:bg-black"
               data-test-id="navigation-collapse"
               type="button"
               onClick={toggleHeaderPanel}
            >
               <img
                  src={ArrowIcon}
                  className={classNames({
                     "-rotate-90": !headerPanel,
                     "rotate-90": headerPanel,
                  })}
                  alt="Workspace navigation collapse icon"
               />
            </button>
            <button
               className="flex items-center justify-center rounded-full dark:bg-white bg-[#3E3E3E] w-6 h-6"
               onClick={changeTheme}
            >
               <SunIcon stroke={theme === "dark" ? "black" : "white"} />
            </button>
         </div>
         <Menu />
      </div>
   );
};

export default ControlPanel;
