import { Link } from "react-router-dom";
import ChangeTheme from "../components/ChangeTheme";
import ProfileOptions from "../components/ProfileOptions";
import SearchInput from "../components/SearchInput";
export default function GuestHeader() {
  return (
    <header className="shadow-md z-50 py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] dark:bg-gray-900 dark:text-white ">
      <div className="flex flex-wrap items-center justify-center  relative  lg:mt-2 mt-5 ">
        <div className="flex lg:order-1 max-sm:ml-auto absolute right-0">
          <ProfileOptions></ProfileOptions>
        </div>
        <div className="flex lg:order-2 max-sm:ml-auto absolute right-32">
          <SearchInput />
        </div>
        <div className="flex lg:order-3 max-sm:ml-auto absolute right-16">
          <ChangeTheme />
        </div>
        <ul
          id=""
          className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
        >
          <li className="max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded">
            <Link
              to={"/main"}
              className="lg:hover:text-[#007bff] text-[#007bff] max-lg:text-white block font-semibold text-[15px]"
            >
              Inicio
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <Link
              to={"/series"}
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
            >
              Series
            </Link>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]">
              Feature
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]">
              Blog
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]">
              About
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
