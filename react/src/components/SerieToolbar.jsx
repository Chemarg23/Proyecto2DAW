import { Button } from "@material-tailwind/react";
import { useState } from "react";
import DeleteSerie from "./Modals/DeleteSerie";

export default function SerieToolbar({ serie, setSerie, episodes, setEpisodes }) {
  const [showSerieDelete, setShowSerieDelete] = useState(false);
  return (
    <>
      <div className="px-4 sm:px-10 mt-3 flex flex-wrap gap-3 md:gap-4">
        <Button className="w-full sm:w-auto dark:text-yellow-500 text-lg font-semibold dark:hover:text-yellow-400 dark:border-yellow-500  text-white border-yellow-400 hover:shadow-md dark:hover:shadow-yellow-500  rounded-xl px-3 py-2 border-2 dark:bg-transparent bg-yellow-400 hover:bg-yellow-500 hover:border-yellow-500">
          <i className="bi bi-pencil-square me-2"></i>Modificar
        </Button>
        <Button
          className="w-full sm:w-auto dark:text-red-500 text-lg font-semibold dark:hover:text-red-400 dark:border-red-500  text-white dark:hover:border-red-400 border-red-500 hover:shadow-md dark:hover:shadow-red-500  rounded-xl px-3 py-2 border-2 dark:bg-transparent bg-red-500 hover:bg-red-600 hover:border-red-600"
          onClick={() => setShowSerieDelete(true)}
        >
          <i className="fa-solid fa-trash me-2"></i>Eliminar Serie
        </Button>
        <Button className="w-full sm:w-auto dark:text-green-500 text-lg font-semibold dark:hover:text-green-400 dark:border-green-500  text-white dark:hover:border-green-400 border-green-500 hover:shadow-md dark:hover:shadow-green-500  rounded-xl px-3 py-2 border-2 dark:bg-transparent bg-green-500 hover:bg-green-600 hover:border-green-600">
          <i className="fa-solid fa-plus me-2"></i>Episodio
        </Button>
        <Button className="w-full sm:w-auto dark:text-red-500 text-lg font-semibold dark:hover:text-red-400 dark:border-red-500  text-white dark:hover:border-red-400 border-red-500 hover:shadow-md dark:hover:shadow-red-500  rounded-xl px-3 py-2 border-2 dark:bg-transparent bg-red-500 hover:bg-red-600 hover:border-red-600">
          <i className="fa-solid fa-trash me-2"></i>Eliminar Episodios
        </Button>
      </div>

      {showSerieDelete && <DeleteSerie serie={serie} setState={setShowSerieDelete} />}
    </>
  );
}
