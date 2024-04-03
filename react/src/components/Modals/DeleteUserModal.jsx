import { Button } from "@material-tailwind/react";
import UserService from "../../services/UserService";

export default function DeleteUserModal({
  setState,
  user,
  users,
  setUsers,
}) {
  const service = new UserService();
  const discharge = () => {
    service.delete(user.id);
    const updatedUsers = users.filter((item) => item.id !== user.id);
    setUsers(updatedUsers);
    setState(false);
  };

  return (
    <div className="z-50 absolute shadow-md top-[35%] left-[33%] bg-gray-950 dark:text-white px-10 py-10 rounded-xl dark:shadow-purple-900">
      <p
        onClick={() => setState(false)}
        className="absolute top-3 right-5 dark:text-white dark:hover:bg-gray-700 rounded-full py-1 px-3 cursor-pointer"
      >
        X
      </p>
      <h2 className="mt-3">
        Estas seguro de que quieres eliminar definitivamente a {user.name}
      </h2>
      <div className="flex justify-end mt-5 gap-5">
        <Button
          onClick={() => setState(false)}
          variant="outlined"
          className="2-[50%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl  border border-gray-600 text-white hover:bg-gray-700 focus:outline-none  dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-500  dark:bg-transparent bg-gray-600"
        >
          Cancelar
        </Button>
        <Button
          onClick={discharge}
          className="2-[50%] shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl  border border-red-600 text-white hover:bg-red-700 focus:outline-none  dark:text-red-500 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-500  dark:bg-transparent bg-red-600"
        >
          Dar Baja
        </Button>
      </div>
    </div>
  );
}
