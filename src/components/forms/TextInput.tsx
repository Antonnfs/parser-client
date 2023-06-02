
const TextInput = ({
   label,
   id,
   inputType = "input",
   register,
   errors,
}: {
   label: string;
   id: string;
   inputType: "input" | "textarea";
   register: any;
   errors: any;
}) => {
   return (
      <>
         <label htmlFor={id} className="text-[#3E3E3E] tracking-wider dark:text-[#F9F9F9]">
            {label}
         </label>
         {inputType === "input" && (
            <input
               {...register(id)}
               type="text"
               name={id}
               id={id}
               className="block w-full  px-4 py-2 mt-2 border rounded-md font-onest-regular text-gray-700 border-gray-200 placeholder-gray-400 bg-white dark:text-gray-300 dark:border-gray-700 dark:placeholder-gray-500 dark:bg-black disabled:bg-gray-300 dark:disabled:bg-[#3E3E3E] disabled:text-black disabled:cursor-not-allowed  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-50"
            />
         )}
         {inputType === "textarea" && (
            <textarea
               rows={5}
               {...register(id)}
               type="text"
               name={id}
               id={id}
               className="block resize-none w-full px-4 py-2 mt-2 border rounded-md font-onest-regular text-gray-700 border-gray-200 placeholder-gray-400 bg-white dark:text-gray-300 dark:border-gray-700 dark:placeholder-gray-500 dark:bg-black disabled:bg-gray-300 dark:disabled:bg-[#3E3E3E] disabled:text-black disabled:cursor-not-allowed  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-50"
            />
         )}
         <p className="h-6 ">
            {errors?.[id] && (
               <span className="text-red-600 text-xs">
                  {errors?.[id]?.message}
               </span>
            )}
         </p>
      </>
   );
};

export default TextInput;
