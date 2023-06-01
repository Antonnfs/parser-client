import { useEffect } from "react";
import { useUser } from "../state/user";
import AuthRouter from "./AuthRouter";
import GuestRouter from "./GuestRouter";
import Loading from "../components/Loading";

export default function AppRouter() {
   const user = useUser((state) => state.user);
   const loading = useUser((state) => state.loading);
   const authListener = useUser((state) => state.authListener);

   useEffect(() => {
      const unsubscribe = authListener();
      return () => unsubscribe();
   }, []);

   if (loading) {
      return <Loading />;
   }
   return <>{user?.uid ? <AuthRouter /> : <GuestRouter />}</>;
}
