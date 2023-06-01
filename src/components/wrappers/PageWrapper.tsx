import React from "react";
import classNames from "classnames";
import { useUser } from "../../state/user";
import Loading from "../Loading";
import { useRoot } from "../../state/root";

export default function PageWrapper({
   children,
}: {
   children: React.ReactNode;
}) {
   const loading = useUser((state) => state.loading);
   const sidebar = useRoot((state) => state.sidebar);
   const animation = useRoot((state) => state.sidebarAnimation);
   const headerPanel = useRoot((state) => state.headerPanel);
   if (loading) return <Loading />;
   return (
      <main className="flex-col overflow-auto">
         <div
            className={classNames(
               " p-[30px] overflow-y-auto overflow-x-auto h-[calc(100vh_-_76px)] bg-[#FCFCFC] dark:bg-[#161616] flex justify-center",
               {
                  "ml-[124px]": !sidebar,
                  "ml-[238px]": sidebar,
                  "ease-in-out duration-300": animation,
                  "mt-[116px]": headerPanel,
                  "mt-[76px]": !headerPanel,
               }
            )}
         >
            <section
               className={classNames("flex flex-col w-full", {
                  "min-w-[calc(100vw-128px-60px)]": !sidebar,
                  "min-w-[calc(100vw-238px-60px)]": sidebar,
               })}
            >
               {children}
            </section>
         </div>
      </main>
   );
}
