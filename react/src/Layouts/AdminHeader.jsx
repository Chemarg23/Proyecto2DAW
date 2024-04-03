import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function AdminHeader() {

  const state = useSelector((state) => state.user)
  const navigate = useNavigate()

  state.rol === 0 && navigate('/')
    const changeTheme = ()=>{
        const html = document.querySelector("html")
        const theme = html.classList.value;
        if(theme == "dark"){
            html.classList.remove("dark");
            html.classList.add("light")
            localStorage.setItem("theme","light")
        }else{
            html.classList.add("dark");
            html.classList.remove("light")
            localStorage.setItem("theme","dark")
        }

    }
  return (
    <header className="shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] dark:bg-gray-900 dark:text-white">
      <div className="flex flex-wrap items-center justify-between gap-5 relative ">
        <div className="flex lg:order-1 max-sm:ml-auto">
          <button onClick={changeTheme} className="py-2 px-3 rounded-xl dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-800 bg-gray-100 hover:bg-gray-300 focus:bg-gray-100">
          <i className="bi bi-brightness-high-fill"></i>
          </button>
        </div>
        <ul
          id="collapseMenu"
          className="lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full"
        >
          <li className="max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded">
            <a
              className="lg:hover:text-[#007bff] text-[#007bff] max-lg:text-white block font-semibold text-[15px]"
            >
              Home
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
            >
              Team
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
            >
              Feature
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
            >
              Blog
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
            >
              About
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
