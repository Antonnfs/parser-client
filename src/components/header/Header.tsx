import classNames from "classnames";
import { useUser } from "../../state/user";
import React from "react";
import { useRoot } from "../../state/root";

const Header = ({ children }: { children: React.ReactNode }) => {
   const uid = useUser((state) => state.user?.uid);
   const sidebar = useRoot((state) => state.sidebar);
   const animation = useRoot((state) => state.sidebarAnimation);

   return (
      <header
         className={classNames(
            "fixed w-full top-0 right-0 z-30 border-b border-[#EBEBEB] dark:border-[#212121]",
            {
               "pl-[124px]": uid,
               "pl-[238px]": uid && sidebar,
               "ease-in-out duration-300 translate-x-0": animation,
            }
         )}
      >
         <nav className="relative px-[30px] py-[18px] bg-[#FCFCFC] dark:bg-[#161616]">
            <div className="flex flex-wrap justify-between items-center ">
               {children}
            </div>
         </nav>
      </header>
   );
};

export default Header;
