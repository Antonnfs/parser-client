export const authErrorHandler = (error: string) => {
   switch (error) {
      case "Firebase: Error (auth/wrong-password).":
         return "Invalid email or password";
      case "Firebase: Error (auth/user-not-found).":
         return "This user does not exist";
      case "Firebase: Error (auth/email-already-in-use).":
         return "This email already in use";
      case "Firebase: Error (auth/network-request-failed).":
         return "Network problems. Let's try again! ";
      case "Firebase: Error (auth/too-many-requests).":
         return "Sorry, too many requests";
      case "Firebase: Error (unavailable).":
         return "Unavaliable!";
      default:
         return error;
   }
};
