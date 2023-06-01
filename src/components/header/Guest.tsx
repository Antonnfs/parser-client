import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import Header from "./Header";
import logo from "../../assets/logo.svg";
import LogButton from "../buttons/LogButton";
import { useUser } from "../../state/user";

const GuestHeader = () => {
   const { pathname } = useLocation();
   const signOut = useUser((state) => state.signOut);
   const signUpRoute = ROUTES.SIGN_UP.route;
   const signInRoute = ROUTES.SIGN_IN.route;
   const signInPath = pathname === signInRoute;
   const authPath = pathname !== ROUTES.SIGN_IN.route && pathname !== ROUTES.SIGN_UP.route;

   const navigate = useNavigate();

   const buttonText = signInPath ? "Sign Up" : "Sign In";
   const navigateLink = signInPath ? signUpRoute : signInRoute;
   const clickHandler = () => (authPath ? signOut() : navigate(navigateLink));

   return (
      <Header>
         <a href="/">
            {/* <img src={logo} className="mr-3" alt="Parser" /> */}
            <h3 className="text-black text-xl dark:text-white">PARSER</h3>
         </a>
         <LogButton handleClick={clickHandler}>{authPath ? 'Sign Out' : buttonText}</LogButton>
      </Header>
   );
};

export default GuestHeader;
