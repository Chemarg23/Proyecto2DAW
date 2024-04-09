import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FollowButton from "../components/FollowButton";
import SerieToolbar from "../components/SerieToolbar";
import GuestHeader from "../Layouts/GuestHeader";
import EpisodeService from "../services/EpisodeService";
import SerieService from "../services/SerieService";
import { baseUrl } from "../services/Service";

export default function SeriePage() {
  const [serie, setSerie] = useState(false);
  const [episodes, setEpisodes] = useState(false);
  const service = new SerieService();
  const episodeService = new EpisodeService();
  const { name } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const handleToggleDescription = () =>
    setShowFullDescription(!showFullDescription);

  useEffect(() => {
    const fetchData = async () => {
      const serieResponse = await service.getByName(name);
      const episodesResponse = await episodeService.getEpisodes(
        serieResponse.data.id
      );
      document.title = `Ver - ${serieResponse.data.name}`;
      setSerie(serieResponse.data);
      setEpisodes(episodesResponse.data);
    };
    fetchData();
    location.state?.toast &&
      toast.success("Creada exitosamente!", {
        theme: document.querySelector("html").classList.contains("dark")
          ? "dark"
          : "light",
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
  }, []);

  return (
    <>
        <GuestHeader />
      <ToastContainer></ToastContainer>
      {serie && (
        <div className="w-screen grid grid-cols-2  bg-black h-[3%] py-6 md:py-0">
          <div className="bg-transparent  text-white h-full z-40  md:ms-0">
            <div className="text-start w-[110%]  mt-8 ms-10 sm:ms-20 ">
              <div className="sm:flex md:hidden w-[130%] justify-center text-center mb-5">
                <img
                  src={`${baseUrl}stream/img/${serie.imgPath}`}
                  alt=""
                  className="h-full rounded-lg w-screen"
                />
              </div>
              <h1 className="text-4xl font-semibold">
                {serie.name} <FollowButton serie={serie} />
              </h1>
              <p className="text-lg mt-3">
                <span className="font-semibold text-xl">Géneros</span>:{" "}
                {serie.categories.map((cat, index) => {
                  const hasNext = index < serie.categories.length - 1;
                  return hasNext ? (
                    <span key={cat.id}>
                      <Link
                        to={`/category/${cat.search}`}
                        className="category hover:text-purple-400"
                      >
                        {cat.name}
                      </Link>{" "}
                      {" | "}
                    </span>
                  ) : (
                    <Link
                      to={`/category/${cat.search}`}
                      key={cat.id}
                      className="category hover:text-purple-400"
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </p>
              <p className="mt-3">
                <span className="font-semibold text-xl">Fecha de estreno:</span>{" "}
                <span className="category text-lg">{serie.releaseDate}</span>{" "}
              </p>

              <p className="mt-3">
                <span className="font-semibold text-xl">
                  Fecha de finalización:
                </span>
                <span className="category text-lg">
                  {" "}
                  {serie.finishDate ? serie.finishDate : "En estreno"}
                </span>
              </p>
              <p className="mt-3 w-[130%] md:w-full">
                <span className="font-semibold text-xl">
                  Descripción:{" "}
                  <span className="category text-sm sm:w-[20vh]">
                    {showFullDescription
                      ? serie.descr
                      : `${serie.descr.slice(0, 150)}...`}
                  </span>
                  {!showFullDescription ? (
                    <button
                      className="text-purple-600 hover:underline text-sm"
                      onClick={handleToggleDescription}
                    >
                      Ver más
                    </button>
                  ) : (
                    <button
                      className="ms-3 text-purple-600 hover:underline text-sm mb-5"
                      onClick={handleToggleDescription}
                    >
                      Ver menos
                    </button>
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="serie-container bg-black h-full  hidden md:block relative inset-0  z-0">
            <img
              src={`${baseUrl}stream/img/${serie.imgPath}`}
              alt=""
              className="h-full w-full bi-image-fill"
            />
          </div>
        </div>
      )}
      <div className="sm:px-16 px-5">
        {user.rol === 1 && (
          <SerieToolbar
            serie={serie}
            setSerie={setSerie}
            setEpisodes={setEpisodes}
            episodes={episodes}
          />
        )}
        <p className="mt-5">
          <span className="font-semibold text-2xl mt-10 dark:text-white text-wrap px-10 py-10">
            Capítulos de {serie.name}
          </span>
        </p>
        <hr className="w-full  my-4 border-black dark:border-gray-500" />
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 px-16 gap-7 mt-8 mb-10">
          {episodes &&
            episodes.map((ep) => {
              return (
                <div key={ep.id}>
                  <Link
                    key={ep.id}
                    className="hover:scale-100 w-full  scale-95 dark:text-white transition-all"
                    to={`/watch/${ep.name}`}
                  >
                    <img
                      src={`${baseUrl}stream/img/${
                        ep.imgPath ? ep.imgPath : serie.imgPath
                      }`}
                      alt=""
                      className="h-[80%] w-full bi-image-fill rounded-xl dark:hover:shadow-purple-600 hover:shadow-md"
                    />
                    <p className="text-center text-lg">
                      Capítulo {ep.episodeNumber}
                    </p>
                  </Link>
                  {user.rol && (
                    <input
                      type="checkbox"
                      className="ms-[47%] w-4 h-5"
                      name=""
                      id=""
                    />
                  )}{" "}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
