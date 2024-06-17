import { Button } from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChangeTheme from "../components/ChangeTheme";
import SearchInput from "../components/SearchInput";
import CategoryService from "../services/CategoryService";
import { baseUrl } from "../services/Service";
import { clear } from "../store/store";
export default function GuestHeader() {
  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const categoryService = new CategoryService();
  const [categories, setCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(true);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) =>
        cat.name.toUpperCase().includes(searchCategory.toUpperCase())
      )
      .slice(0, 9);
  }, [categories, searchCategory]);

  useEffect(() => {
    categoryService.getAll().then((response) => {
      setCategories(() => response.data);
    });
  }, []);
  return (
    <header
      className="dark:text-white relative w-screen top-0 h-16 dark:bg-gray-900 bg-gray-100"
      style={{ zIndex: 60 }}
    >
      <nav
        className="mx-auto flex w-screen items-center justify-between p-3.5 lg:px-8"
        aria-label="Global"
      >
        <div>
          <img
            className=" absolute top-0 left-4 w-20 h-16 cursor-pointer"
            src="/logo.png"
            alt=""
            onClick={() => navigate("/main")}
          />
        </div>
        <div className="flex lg:flex-1">
          <span className="sr-only">Your Company</span>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
          >
            <span className="sr-only">Abrir menu principal</span>
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
          <div
            className=""
            hidden={!user.rol}
            onClick={() => {
              setShowCategoryModal(true);
              setShowAdminModal((prev) => !prev);
            }}
          >
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 dark:text-white text-gray-900"
              aria-expanded="false"
            >
              Administración
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
          <div
            className="h-28 w-[9rem] rounded-lg bg-white dark:bg-gray-900 mt-12 absolute left-[32%] py-5 px-4 shadow-xl dark:shadow-purple-950 dark:shadow-md shadow-gray-500"
            hidden={showAdminModal}
          >
            <div className="search-container w-full mb-3 text-center">
              <p
                className="px-2 mb-3 text-center hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg py-1 cursor-pointer"
                onClick={() => navigate("/admin")}
              >
                <Link to={"/admin"}>Usuarios</Link>
              </p>
              <p
                className="px-2 mb-3 gap-x-3 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg py-1 cursor-pointer"
                onClick={() => navigate("/series/create")}
              >
                <Link to={"/series/create"}>Nueva Serie</Link>
              </p>
            </div>
            {filteredCategories.length === 0 ? (
              <span className="text-lg text-center">
                No hay categorías que coincidan con {searchCategory}
              </span>
            ) : (
              ""
            )}
          </div>
          <div
            className="relative"
            onClick={() => {
              setShowAdminModal(true);
              setShowCategoryModal((prev) => !prev);
            }}
          >
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 dark:text-white text-gray-900"
              aria-expanded="false"
            >
              Categorías
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
          <div
            className="h-96 w-80 rounded-lg bg-white dark:bg-gray-900 mt-12 absolute left-[38%] py-5 px-4 shadow-xl dark:shadow-purple-950 dark:shadow-md shadow-gray-500"
            hidden={showCategoryModal}
          >
            <div className="search-container w-full mb-3">
              <input
                type="text"
                className="py-2 px-3 rounded-xl w-full dark:bg-gray-700 bg-gray-200 focus:ring-blue-500"
                placeholder="Buscar Categorías..."
                onChange={(e) => setSearchCategory(e.target.value)}
                value={searchCategory}
              />
              <i className="bi bi-search search-icon cursor-pointer p-3"></i>
            </div>
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="py-[2px] rounded-lg dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer px-3"
                onClick={() => {
                  navigate(`/category/${category.search}`);
                  setShowCategoryModal(true);
                }}
              >
                <Link
                  className="text-lg font-semibold"
                  to={`/category/${category.search}`}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Link>
                <br />
              </div>
            ))}
            {filteredCategories.length === 0 ? (
              <span className="text-lg text-center">
                No hay categorías que coincidan con {searchCategory}
              </span>
            ) : (
              ""
            )}
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
          <Link to=""></Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-5">
          <div className="text-sm font-semibold w-[70%] mr-6 leading-6 dark:text-white text-gray-900">
            <SearchInput />
          </div>
          <div className="text-sm font-semibold leading-6 dark:text-white text-gray-900">
            <ChangeTheme />
          </div>
          <Button
            className="p-0 rounded-full"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            <img
              src={
                !user?.imgPath.includes("default.png")
                  ? `${baseUrl}stream/img/user/${user?.imgPath}`
                  : "https://thumbs.dreamstime.com/b/línea-icono-del-negro-avatar-perfil-de-usuario-121102131.jpg"
              }
              alt=""
              className="rounded-full w-10 h-10"
            />
          </Button>
          <div
            hidden={!showProfile}
            className="absolute dark:bg-gray-800 p-3 bg-white shadow-lg dark:shadow-purple-500 right-2 top-[110%] rounded-lg"
          >
            <div className="px-3 py-2 cursor-pointer rounded-lg dark:hover:bg-gray-700 hover:bg-gray-200">
              <Link to={"/profile"}>Perfil</Link>
            </div>
            <div className="px-3 py-2 cursor-pointer rounded-lg dark:hover:bg-gray-700 hover:bg-gray-200">
              <Link onClick={()=>dispatch(clear())} to={"/login"}>Log Out</Link>
            </div>
          </div>
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
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white text-lg"
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
                    onClick={() => setShowCategoryDropdown((prev) => !prev)}
                  >
                    Categorías
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
                  <div hidden={showCategoryDropdown}>
                    <div className="search-container w-full mb-3 mt-3">
                      <input
                        type="text"
                        className="py-3 px-4 rounded-xl w-full dark:bg-gray-700 bg-gray-200 focus:ring-blue-500"
                        placeholder="Buscar Categorías..."
                        onChange={(e) => setSearchCategory(e.target.value)}
                        value={searchCategory}
                      />
                      <i className="bi bi-search search-icon cursor-pointer p-3"></i>
                    </div>
                    {filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        className="py-[3px] rounded-lg hover:bg-gray-300 darkhover:bg-gray-700 cursor-pointer px-4"
                        onClick={() => {
                          navigate(`/category/${category.search}`);
                          setShowModal(false);
                        }}
                      >
                        <Link
                          className=" font-semibold ml-6"
                          to={`/category/${category.search}`}
                        >
                          {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1)}
                        </Link>
                        <br />
                      </div>
                    ))}
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
