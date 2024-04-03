export default function ChangeTheme(){
    
  const changeTheme = () => {
    const html = document.querySelector("html");
    const theme = html.classList.value;
    if (theme == "dark") {
      html.classList.remove("dark");
      html.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      html.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
    onClick={changeTheme}
    className="py-2 px-3 rounded-xl dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-800 bg-gray-100 hover:bg-gray-300 focus:bg-gray-100"
  >
    <i className="bi bi-brightness-high-fill"></i>
  </button>
  )
}