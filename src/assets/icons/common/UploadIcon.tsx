import { useRoot } from "../../../state/root";

export default function UploadIcon() {
   const theme = useRoot((state) => state.theme);

   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke={theme === "dark" ? "#FFF" : "#000"}
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         className="h-4 w-4"
      >
         <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
         <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
   );
}
