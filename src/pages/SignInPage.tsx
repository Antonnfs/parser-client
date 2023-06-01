import React from "react";
import GuestPageWrapper from "../components/wrappers/GuestPageWrapper";
import SignInForm from "../components/forms/SignInForm";

export default function SignInPage() {
   return (
      <GuestPageWrapper>
         <SignInForm />
      </GuestPageWrapper>
   );
}
