import React, { useEffect, useRef } from "react";
import ROUTES from "../../constants/routes";
import MenuItem from "./MenuItem";
import classNames from "classnames";
import { GuestPicture } from "../../assets/icons/header/header-icons";
import { useRoot } from "../../state/root";
import { useUser } from "../../state/user";

const { PROFILE, SIGN_IN } = ROUTES;

const UserMenu = () => {
   const ref = useRef(null);
   const toggleUserMenu = useRoot((state) => state.toggleUserMenu);
   const dropdown = useRoot((state) => state.user);
   const email = useUser((state) => state.user?.email);

   useEffect(() => {
      const checkIfClickedOutside = (e: any) => {
         // @ts-ignore
         if (dropdown && ref.current && !ref.current.contains(e.target)) {
            toggleUserMenu();
         }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside);
      };
   }, [dropdown]);

   return (
      <div className="flex items-center md:order-2 ml-4" ref={ref}>
         <button
            type="button"
            className="flex justify-center items-center bg-[#E8E8E8] rounded-full w-10 h-10 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={toggleUserMenu}
         >
            <span className="sr-only">Open user menu</span>
            <div className="relative w-10 h-10">
               <img
                  className="absolute w-full scale-50 h-full object-contain top-0 left-0  rounded-full"
                  src={GuestPicture}
                  alt="User avatar"
               />
            </div>
         </button>
         <div
            className={classNames(
               "w-[350px] top-[77px] right-[30px] z-50 p-2 font-onest-regular text-[#828282] dark:text-[#A8A8A8] text-sm rounded-br-xl rounded-bl-xl shadow bg-[#F5F5F5] dark:bg-[#333333]",
               {
                  hidden: !dropdown,
                  absolute: dropdown,
               }
            )}
            id="user-dropdown"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="bottom"
         >
            <div className="px-5 py-2 ">
               <span className="block text-black dark:text-white text-base truncate">
                  {email}
               </span>
            </div>
            <ul aria-labelledby="user-menu-button">
               <MenuItem item={PROFILE} />
               <MenuItem item={SIGN_IN} />
            </ul>
         </div>
      </div>
   );
};

export default UserMenu;
