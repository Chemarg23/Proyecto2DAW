import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { addUser } from "./store/userSlice";
const App = () => {
  const dispatch = useDispatch();
  const storedUser = localStorage.getItem("user");
  storedUser && dispatch(addUser(JSON.parse(storedUser)));

  document.querySelector("html").classList.add(localStorage.getItem("theme"));
  return <RouterProvider router={router} />;
};

export default App;
