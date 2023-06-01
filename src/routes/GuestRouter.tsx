import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "../constants/routes";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import GuestHeader from "../components/header/Guest";

export default function GuestRouter() {
   return (
      <BrowserRouter>
         <GuestHeader />
         <Routes>
            <Route path={ROUTES.SIGN_IN.route} element={<SignInPage />} />
            <Route path={ROUTES.SIGN_UP.route} element={<SignUpPage />} />
            <Route
               path={"/*"}
               element={<Navigate to={ROUTES.SIGN_IN.route} replace />}
            />
         </Routes>
      </BrowserRouter>
   );
}
