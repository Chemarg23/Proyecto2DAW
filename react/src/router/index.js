import { createBrowserRouter } from "react-router-dom";
import AddSerie from "../pages/AddSerie";
import AdministrationUserPage from "../pages/AdministrationUserPage";
import AllSeriesPage from "../pages/AllSeriesPage";
import CategoryPage from "../pages/CategoryPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import SeriePage from "../pages/SeriePage";
import VideoPage from "../pages/VideoPage";
import WishListPage from "../pages/WishListPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/admin",
    Component: AdministrationUserPage,
  },
  {
    path: "/main",
    Component: MainPage,
  },
  {
    path: "/watch/:name",
    Component: VideoPage,
  },
  {
    path: "serie/:name",
    Component: SeriePage,
  },
  {
    path: "/search/:name/:page?",
    Component: SearchPage,
  },
  {
    path: "/category/:name/:page?",
    Component: CategoryPage,
  },
  {
    path: "/series/:page?",
    Component: AllSeriesPage,
  },
  {
    path: "/list/:page?",
    Component: WishListPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/series/create",
    Component: AddSerie,
  },
]);

export default router;
