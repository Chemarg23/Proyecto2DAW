import { createBrowserRouter } from "react-router-dom";
import Display from "../components/Display";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Display,
  },
  {
    path: "/display",
    Component: Display,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);

export default router;
