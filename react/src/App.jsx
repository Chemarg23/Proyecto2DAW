
import { RouterProvider } from "react-router-dom";
import router from "./router";
const App = () => {
  document.querySelector("html").classList.add(localStorage.getItem("theme"))
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
