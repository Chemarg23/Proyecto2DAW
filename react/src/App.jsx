import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { addUser } from "./store/store";

const App = () => {
  const dispatch = useDispatch();
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      dispatch(addUser(parsedUser));
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  }

  if (
    !document.querySelector("html").classList.contains("light") &&
    !document.querySelector("html").classList.contains("light")
  ) {
    document.querySelector("html").classList.add("dark");
  }
  document.querySelector("html").classList.add(localStorage.getItem("theme"));
  return <RouterProvider router={router} />;
};

export default App;
