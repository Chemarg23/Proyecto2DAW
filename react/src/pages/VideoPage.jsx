import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatRoom from "../components/ChatRoom";
import DeleteEpisode from "../components/Modals/DeleteEpisode";
import UpdateEpisodeModal from "../components/Modals/UpdateEpisodeModal";
import VideoPlayer from "../components/VideoPlayer";
import GuestHeader from "../Layouts/GuestHeader";
import EpisodeService from "../services/EpisodeService";
import { baseUrl } from "../services/Service";
export default function VideoPage() {
  const [episode, setEpisode] = useState(false);
  const [serie, setSerie] = useState([]);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const user = useSelector((state) => state.user);
  const { name } = useParams();
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [error, setError] = useState(false);
  const episodeService = new EpisodeService();
  const [showChatRoom, setShowChatRoom] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recommendedEps, setRecommendedEps] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    setShowChatRoom(false);
    const fetchData = async () => {
      try {
        const episodeResponse = await episodeService.getByName(name);
        const episodesResponse = await episodeService.getEpisodes(
          episodeResponse.data.serie.id
        );
        const recommended = await episodeService.getRecommendedEpisodes(
          user.id
        );
        setEpisode(episodeResponse.data);
        setSerie(episodeResponse.data.serie);
        setAllEpisodes(episodesResponse.data);
        setRecommendedEps(recommended.data);
        document.title = `Ver - ${episodeResponse.data.serie.name} ${episodeResponse.data.episodeNumber}`;
      } catch (error) {
        if (error.response.status == 404) {
          setError("No existe este capítulo");
          document.title = "Error 404 - Not Founded";
        }
      }
    };
    fetchData();
    return () => setShowChatRoom(false);
  }, [name]);

  useEffect(() => {
    if (allEpisodes.length > 0 && episode.episodeNumber > 0) {
      setNext(
        allEpisodes.find(
          (ep) =>
            parseInt(ep.episodeNumber) === parseInt(episode.episodeNumber) + 1
        )
      );
      setPrev(
        allEpisodes.find(
          (ep) =>
            parseInt(ep.episodeNumber) === parseInt(episode.episodeNumber) - 1
        )
      );
    }
  }, [allEpisodes, episode, name]);

  useEffect(() => {
    setShowChatRoom(true);
  }, [episode, name]);
  return (
    <>
      <GuestHeader />
      {episode && (
        <div>
          <div className="mt-10 flex ps-10 ">
            <div className="md:w-8/12 mr-7 w-12/12">
              <h1 className="font-bold text-5xl dark:text-white mb-5">
                {serie.name} - {episode.episodeNumber}
              </h1>
              <div className="flex items-center justify-between">
                <p className="font-bold text-3xl dark:text-white mb-5">
                  <span className="relative left-0">{episode.name}</span>
                </p>

                <div className="flex gap-x-4">
                  <Button
                    className="w-full sm:w-auto dark:text-yellow-500 text-lg font-semibold dark:hover:text-yellow-400 dark:border-yellow-500 text-white border-yellow-400 hover:shadow-md dark:hover:shadow-yellow-500 rounded-xl px-3 py-2 border-2 dark:bg-transparent bg-yellow-400 hover:bg-yellow-500 hover:border-yellow-500"
                    onClick={() => setShowUpdateModal(true)}
                  >
                    <i className="bi bi-pencil-square me-2"></i>Modificar
                    Episodio
                  </Button>

                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full sm:w-auto dark:text-red-500 text-lg font-semibold dark:hover:text-red-400 dark:border-red-500 text-white dark:hover:border-red-400 border-red-500 hover:shadow-md dark:hover:shadow-red-500 rounded-xl px-3 py-2 border-2 dark:bg-transparent bg-red-500 hover:bg-red-600 hover:border-red-600"
                  >
                    <i className="fa-solid fa-trash me-2"></i>Eliminar Episodio
                  </Button>
                </div>
              </div>

              <VideoPlayer episode={episode} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 mt-5 w-full mb-10 text-center dark:text-white">
                <div className="text-white">
                  {episode.episodeNumber > 1 && (
                    <Link
                      to={`/watch/${prev?.fullname}`}
                      className="bg-blue-500 dark:bg-purple-700 hover:bg-blue-600 dark:hover:bg-purple-800 rounded-lg px-3 py-2 dark:text-white mb-3 md:mb-0"
                    >
                      <i className="bi bi-arrow-left mr-2 mb-2"></i>
                      Anterior
                    </Link>
                  )}
                </div>

                <div>
                  <Link
                    to={`/serie/${serie.search}`}
                    className="bg-blue-500 dark:bg-purple-700 hover:bg-blue-600 dark:hover:bg-purple-800 rounded-lg px-3 py-2 dark:text-white w-full text-white"
                  >
                    <i className="bi bi-list mr-2 text-white"></i>
                    Lista de Episodios
                  </Link>
                </div>

                <div className="text-white">
                  {episode.episodeNumber < allEpisodes.length && (
                    <Link
                      to={`/watch/${next?.fullname}`}
                      className="bg-blue-500 dark:bg-purple-700 hover:bg-blue-600 dark:hover:bg-purple-800 rounded-lg px-3 py-2 dark:text-white mt-3 md:mt-0"
                    >
                      Siguiente
                      <i className="bi bi-arrow-right ml-2 mb-2"></i>
                    </Link>
                  )}
                </div>
              </div>
              <h1 className="text-5xl dark:text-white font-bold mt-12 mb-5">Episodios que te podrían interesar</h1>
              <hr className="w-full dark:border-white mb-12" />

              <div className="grid grid-cols-4 mb-5">
                {recommendedEps.map((ep) => (
                  <div key={ep.id} className="text-center transition-all dark:text-white font-semibold hover:scale-110" onClick={()=>{
                    navigate(`/watch/${ep.fullname}`)
                    window.scrollTo(0, 0);
                    }}>
                    <img
                      className="rounded-lg w-52 h-24 dark:hover:opacity-85 cursor-pointer  shadow-gray-600 shadow-lg  dark:hover:shadow-purple-500 transition-all"
                      src={ep.imgPath != null ? `${baseUrl}stream/img/${ep.imgPath}` : `${baseUrl}stream/img/${ep.serie.imgPath}`}
                      alt=""
                    />
                    <p>{ep.serie.name} - {ep.episodeNumber}</p>
                  </div>
                ))}
              </div>
              {showChatRoom && <ChatRoom room={episode.id}></ChatRoom>}
            </div>
            <div className="md:w-3/12 md:block hidden mt-16 dark:text-white episode-list">
              <p className="ml-4 text-xl font-sans mb-2">
                Episodios de {serie.name}
              </p>
              <hr className="" />
              {allEpisodes &&
                allEpisodes.map((ep) => (
                  <Link
                    to={`/watch/${ep.fullname}`}
                    className={
                      ep.episodeNumber === episode.episodeNumber
                        ? "dark:bg-gray-700 bg-gray-200 cursor-default p-2 rounded-xl scale-[90%] grid grid-cols-3 gap-1 mt-2 "
                        : " episode-list  p-1 rounded-xl scale-[90%] grid grid-cols-3 gap-1 mt-2 cursor-pointer hover:scale-[95%]"
                    }
                    key={ep.id}
                  >
                    <div className="col-span-2">
                      <img
                        className="rounded-xl"
                        src={`${baseUrl}stream/img/${
                          ep.imgPath ? ep.imgPath : serie.imgPath
                        }`}
                        alt=""
                      />
                    </div>
                    <div className="text-lg font-semibold dark:text-white">
                      <br />
                      {serie.fullname}
                      <p>Capítulo {ep.episodeNumber}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      <div>
        {error && (
          <div className="text-center mt-[10%]">
            <h1 className="text-5xl font-bold dark:text-white">
              Error 404: Not Founded
            </h1>
            <h1 className="text-5xl font-bold dark:text-white">{error}</h1>
          </div>
        )}
      </div>

      {showUpdateModal && (
        <UpdateEpisodeModal
          setEpisode={setEpisode}
          setState={setShowUpdateModal}
          episode={episode}
        />
      )}
      {showDeleteModal && (
        <DeleteEpisode
          episode={episode}
          serie={serie}
          setState={setShowDeleteModal}
        />
      )}
    </>
  );
}
