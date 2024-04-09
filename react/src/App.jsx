import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddSerie from "./pages/AddSerie";
import AdministrationUserPage from "./pages/AdministrationUserPage";
import AllSeriesPage from "./pages/AllSeriesPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import SeriePage from "./pages/SeriePage";
import VideoPage from "./pages/VideoPage";
import WishListPage from "./pages/WishListPage";
import { addUser } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  
 const storedUser = localStorage.getItem("user")
 storedUser && dispatch(addUser(JSON.parse(storedUser)))
  const user = useSelector((state) => state.user);
  document.querySelector("html").classList.add(localStorage.getItem("theme"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" Component={RegisterPage} />
        <Route path="/login" Component={LoginPage} />

        {user.name && (
          <>
            <Route path="main" Component={MainPage} />
            <Route path="watch/:name" Component={VideoPage} />
            <Route path="serie/:name" Component={SeriePage} />
            <Route path="search/:name/:page?" Component={SearchPage} />
            <Route path="category/:name/:page?" Component={CategoryPage} />
            <Route path="series/:page?" Component={AllSeriesPage} />
            <Route path="list/:page?" Component={WishListPage} />
            <Route path="profile" Component={ProfilePage} />
          </>
        )}
        {user.rol && user.auth && (
          <>
            <Route path="/series/create" Component={AddSerie} />
            <Route path="/admin" Component={AdministrationUserPage} />
          </>
        )}
        <Route path="*" element={<Navigate to={"/login"} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
