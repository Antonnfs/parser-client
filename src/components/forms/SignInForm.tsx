import { useState } from "react";
import { useUser } from "../../state/user";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { authSchema } from "../../schemas/authSchema";
import { Link, redirect } from "react-router-dom";
import { AuthWithEmail } from "../../types/auth";
import ROUTES from "../../constants/routes";
import IconEye from "../../assets/icons/common/IconEye.svg";
import IconNotEye from "../../assets/icons/common/IconNotEye.svg";
import classNames from "classnames";
import { authErrorHandler } from "../../utils/authErrorHandler";

export default function SignInForm() {
   const [show, setShow] = useState(false);
   const error = useUser((state) => authErrorHandler(state.error));
   const signIn = useUser((state) => state.signIn);
   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
   } = useForm({
      mode: "all",
      defaultValues: {
         email: "",
         password: "",
      },
      resolver: joiResolver(authSchema),
   });
   const submit = async ({ email, password }: AuthWithEmail) => {
      await signIn(email, password);
      redirect(ROUTES.FEED.route);
   };
   return (
      <div className="flex-1 max-w-md lg:w-2/6 mt-6 pb-7 px-6 ">
         <h2 className="text-center text-[24px]  tracking-wider font-bold text-[#161616] dark:text-white">
            Sign in to access your account
         </h2>
         <p className="h-8 text-center">
            {error && <span className=" text-red-600 text-xs">{error}</span>}
         </p>
         <form onSubmit={handleSubmit(submit)}>
            <div>
               <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-[#161616] dark:text-gray-200"
               >
                  Email ID
               </label>
               <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="block w-full px-4 py-2 mt-2 border rounded-md font-onest-regular text-gray-700 border-gray-200 placeholder-gray-400 bg-white dark:text-gray-300 dark:border-gray-700 dark:placeholder-gray-600 dark:bg-[#161616] focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-50"
               />
               <p className="h-6 ">
                  {errors?.email && (
                     <span className=" text-red-600 text-xs">
                        {errors?.email?.message}
                     </span>
                  )}
               </p>
            </div>
            <div className="mt-3">
               <div className="flex justify-between mb-2">
                  <label
                     htmlFor="password"
                     className="text-sm text-[#161616] dark:text-gray-200"
                  >
                     Password
                  </label>
               </div>
               <div className="relative">
                  <input
                     {...register("password")}
                     type={show ? "text" : "password"}
                     id="password"
                     placeholder="Your Password"
                     className="block w-full px-4 py-2 mt-2 border rounded-md font-onest-regular bg-white text-gray-700 placeholder-gray-400 border-gray-200 dark:bg-[#161616] dark:text-gray-300 dark:placeholder-gray-600 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-50"
                  />
                  <img
                     onClick={() => setShow(!show)}
                     alt="View password"
                     className={classNames(
                        "absolute right-3  scale-125 cursor-pointer",
                        {
                           "top-[15px]": show,
                           "top-[13px]": !show,
                        }
                     )}
                     src={show ? IconEye : IconNotEye}
                  />
               </div>
               <p className="h-6 ">
                  {errors?.password && (
                     <span className=" text-red-600 text-xs">
                        {errors?.password?.message}
                     </span>
                  )}
               </p>
            </div>
            <div className="mt-6">
               <button
                  disabled={!isValid}
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 tracking-wide text-white disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200 transform rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
               >
                  Sign in
               </button>
            </div>
         </form>
         <p className="mt-6 text-sm text-center font-onest-regular tracking-wide dark:text-white text-[#161616]">
            Don&#x27;t have an account yet?{" "}
            <Link to={ROUTES.SIGN_UP.route}>
               <span className="text-blue-500 focus:outline-none focus:underline hover:underline">
                  Sign up
               </span>
            </Link>
            .
         </p>
      </div>
   );
}
