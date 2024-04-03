import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../services/Service";
import UserIcon from "./icons/UserIcon";
export default function ProfileOptions() {
  const user = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className="flex items-center"
        onClick={() => setToggle((prev) => !prev)}
      >
        <Button className="rounded-full p-0">
          <img
            className="w-8 h-8 rounded-full shadow-sm shadow-black dark:shadow-purple-700"
            src={`${baseUrl}stream/img/user/${user.imgPath}`}
            alt="Jese image"
          />
        </Button>
        <button>
          <i className="bi bi-caret-down"></i>
        </button>
      </div>
      {toggle && (
  <div className="transition-all transform translate-y-6 top-0 absolute z-50 mt-3 dark:text-white dark:bg-gray-950 rounded-lg shadow-md -right-2 text-sm dark:shadow-purple-950 bg-gray-50 animate-slide-down">
    <ul>
      <li className="p-3 w-[100px] cursor-pointer">
        <Link to={"/profile"}>
          <span className="p-3">
            <UserIcon />
          </span>
          <span className="mt-1">Profile</span>
        </Link>
      </li>
      <li className="p-3 w-[110px]">
        <Link>
          <span>Cerrar sesión</span>
        </Link>
      </li>
    </ul>
  </div>
)}

      
      
    </>
  );
}
