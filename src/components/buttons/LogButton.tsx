import React from "react";

const LogButton = ({
   handleClick,
   children,
   disabled = false,
}: {
   handleClick: () => void | Promise<void>;
   children: React.ReactNode;
   disabled?: boolean;
}) => {
   return (
      <button
         disabled={disabled}
         type="button"
         onClick={handleClick}
         className=" max-full px-7 py-2 bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed text-white hover:bg-gradient-to-br focus:outline-none font-onest-medium rounded-md text-sm text-center ml-2"
      >
         {children}
      </button>
   );
};

export default LogButton;
