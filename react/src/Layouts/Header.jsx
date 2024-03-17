export default function Header() {
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
          <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
            Login
          </button>
          <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] ml-3">
            Sign up
          </button>
          <button>

          </button>
          <button id="toggle" className="lg:hidden ml-7">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
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
