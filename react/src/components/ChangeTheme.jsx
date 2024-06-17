import { Button } from "@material-tailwind/react";

export default function ChangeTheme(){
    
  const changeTheme = () => {
    const html = document.querySelector("html");
    const theme = html.classList.value;
    if (theme.includes('dark')) {
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
    <Button
    onClick={changeTheme}
    className="py-2 px-3 rounded-xl dark:bg-gray-950 dark:hover:bg-gray-900 bg-gray-200 hover:bg-gray-300 "
  >
    <i className="bi bi-brightness-high-fill text-black dark:text-white"></i>
  </Button>
  )
}