import React from "react";
import { useUser } from "../../state/user";
import Loading from "../Loading";
import { usePosts } from "../../state/posts";

const GuestPageWrapper = ({ children }: { children: React.ReactNode }) => {
   const loading = useUser((state) => state.loading);
   const postsLoading = usePosts((state) => state.loading);

   if (loading || postsLoading) return <Loading />;

   return (
      <div className="bg-[#FCFCFC] dark:bg-[#161616] pt-[76px] font-onest-medium justify-center min-h-screen flex items-center w-screen mx-auto">
         {children}
      </div>
   );
};

export default GuestPageWrapper;
