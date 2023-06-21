import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "../constants/routes";
import FeedPage from "../pages/FeedPage";
import ProfilePage from "../pages/ProfilePage";
import AuthenticatedHeader from "../components/header/Authenticated";
import GuestHeader from "../components/header/Guest";
import SidebarMenu from "../components/menus/SidebarMenu";
import PostPage from "../pages/PostPage";
import PostFormPage from "../pages/PostFormPage";

export default function AuthRouter() {
   return (
      <BrowserRouter>
         <AuthenticatedHeader />
         <SidebarMenu />
         <Routes>
            <Route path={ROUTES.FEED.route} element={<FeedPage />} />
            <Route
               path={ROUTES.FEED.subRoutes.POST_ID.route}
               element={<PostPage />}
            />
            <Route
               path={ROUTES.FEED.subRoutes.NEW.route}
               element={<PostFormPage />}
            />
            <Route
               path={ROUTES.FEED.subRoutes.EDIT.route}
               element={<PostFormPage />}
            />
            <Route path={ROUTES.PROFILE.route} element={<ProfilePage />} />
            <Route path={"/*"} element={<Navigate to={ROUTES.FEED.route} />} />
         </Routes>
      </BrowserRouter>
   );
}
