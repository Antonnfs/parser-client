import React, { useEffect } from "react";
import { THEMES } from "../../constants/themes";
import { useRoot } from "../../state/root";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
   const theme = useRoot((state) => state.theme);
   const setTheme = useRoot((state) => state.setTheme);

   useEffect(() => {
      window
         .matchMedia("(prefers-color-scheme: dark)")
         .addEventListener("change", (event) => {
            const colorScheme = event.matches
               ? (THEMES.dark as "dark")
               : (THEMES.light as "light");
            setTheme(colorScheme);
         });
   }, []);

   return <div className={`${theme} w-full h-full`}>{children}</div>;
};

export default ThemeWrapper;
