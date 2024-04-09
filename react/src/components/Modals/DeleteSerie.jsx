import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SerieService from "../../services/SerieService";
import { removeFromList } from "../../store/userSlice";

export default function DeleteSerie({ serie, setState }) {
  const service = new SerieService();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const deleteSerie = () => {
    service
      .delete(serie.id)
      .then(() =>{
        dispatch(removeFromList(serie))
        navigate("/main")})
      .catch((err) => console.log(err));
  };

  return (
    <>
    <div className="w-[500%] h-[530%] z-50 fixed bg-white opacity-25  -translate-x-[4%] -translate-y-[90%]" style={{ zIndex: 900 }}></div>
      <div className="z-50 fixed top-[35%] left-[50%]  transform translate-x-[-50%] bg-white dark:bg-gray-950 dark:text-white px-10 py-10 rounded-xl shadow-md sm:w-[500px]  xl:w-[600px]" style={{ zIndex:1000 }}>
        <p
          onClick={() => setState(false)}
          className="absolute top-3 right-5 dark:text-white dark:hover:bg-gray-700 rounded-full py-1 px-3 cursor-pointer"
        >
          X
        </p>
        <h1 className="text-3xl font-semibold">Eliminar serie</h1>
        <h2 className="mt-3">
          ¿Estás seguro de que quieres eliminar la serie {serie.name}? Se
          eliminarán todos sus capítulos
        </h2>
        <div className="flex justify-end mt-5 gap-5">
          <Button
            onClick={() => setState(false)}
            variant="outlined"
            className="w-[100px] md:w-auto shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl border border-gray-600 text-white hover:bg-gray-700 focus:outline-none dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-500 dark:bg-transparent bg-gray-600"
          >
            Cancelar
          </Button>
          <Button
            onClick={deleteSerie}
            className="w-[100px] md:w-auto shadow-xl py-2.5 px-4 text-sm font-semibold rounded-xl border border-red-600 text-white hover:bg-red-700 focus:outline-none dark:text-red-500 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:bg-transparent bg-red-600"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </>
  );
}

DeleteSerie.propTypes = {
  serie: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
};
