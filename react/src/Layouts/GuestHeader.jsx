import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChangeTheme from "../components/ChangeTheme";
import SearchInput from "../components/SearchInput";
import { baseUrl } from "../services/Service";
import { clear } from "../store/userSlice";
export default function GuestHeader() {
  const [showModal, setShowModal] = useState(false);
 const user = useSelector(state=>state.user)
 const dispatch = useDispatch()
 const navigate = useNavigate()
  return (
    <header
      className="dark:text-white relative w-screen top-0 h-16 dark:bg-gray-900 bg-gray-100"
      style={{ zIndex: 60 }}
    >
      <nav
        className="mx-auto flex w-screen items-center justify-between p-3.5 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <span className="sr-only">Your Company</span>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 dark:text-white text-gray-900"
              aria-expanded="false"
            >
              Product
              <svg
                className="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <Link
            to="/series"
            className="text-sm font-semibold leading-6 dark:text-white text-gray-900"
          >
            Series
          </Link>
          <Link
            to="/list"
            className="text-sm font-semibold leading-6 dark:text-white text-gray-900"
          >
            Mis series
          </Link>
          <Link to="">
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-5">
          <div className="text-sm font-semibold leading-6 dark:text-white text-gray-900">
            <SearchInput />
          </div>
          <div className="text-sm font-semibold leading-6 dark:text-white text-gray-900">
            <ChangeTheme />
          </div>
          <Button
            className="p-0 rounded-full"
            onClick={()=>{
              navigate("/login")
              dispatch(clear())
              
              }}
          >
            <img src={`${baseUrl}stream/img/user/${user.imgPath}`} alt="" className="rounded-full w-10 h-10" />
          </Button>
        </div>
      </nav>
      <div
        className={
          showModal
            ? "inset-0 lg:hidden transition-all z-50 right-0 duration-300 ease-in-out "
            : "hidden"
        }
        role="dialog"
      >
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 border-0 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10Name">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="mt-2 w-full" id="disclosure-1">
                  
                  <SearchInput />
                </div>
                <div className="-mx-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    aria-controls="disclosure-1"
                    aria-expanded="false"
                  >
                    Product
                    <svg
                      className="h-5 w-5 flex-none"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="mt-2 space-y-2" id="disclosure-1">
                    <a
                      href="#"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Analytics
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Engagement
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Security
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Integrations
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Automations
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Watch demo
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Contact sales
                    </a>
                  </div>
                </div>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 dark:text-white text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
