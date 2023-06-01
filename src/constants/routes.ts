const ROUTES = {
   SIGN_IN: {
      name: "Sign Out",
      route: "/signin",
   },
   SIGN_UP: {
      name: "SignUp",
      route: "/signup",
   },
   FEED: {
      name: "Feed",
      route: "/feed",
      subRoutes: {
         POST_ID: {
            name: "Feed",
            route: "/feed/:guid",
         },
         NEW: {
            name: "New post",
            route: "/feed/new",
         },
         EDIT: {
            name: "Edit post",
            route: "/feed/:guid/edit",
         },
      },
   },
   PROFILE: {
      name: "Profile",
      route: "/profile",
   },
};
export default ROUTES;
