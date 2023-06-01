const getSystemTheme = (): "light" | "dark" => {
   let primaryTheme: "light" | "dark" = "light";
   if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
   ) {
      primaryTheme = "dark";
   }
   return primaryTheme;
};

export default getSystemTheme;
