
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import ChatRoom from "../components/ChatRoom";
import GuestHeader from "../Layouts/GuestHeader";
import EpisodeService from "../services/EpisodeService";
import SerieService from "../services/SerieService";
import { baseUrl } from "../services/Service";
export default function MainPage() {
  const [episodes, setEpisodes] = useState([]);
  const [latestSeries, setLatestSeries] = useState([]);
  const service = new EpisodeService();
  const serieService = new SerieService();

  useEffect(() => {
    document.title = "Página principal";
    const fetchEpisodes = async () => {
      serieService
        .getAll(1)
        .then((response) => setLatestSeries(response.data.series));
      service.getAll().then((response) => {
        setEpisodes(response.data);
      });
    };
    fetchEpisodes();
  }, []);

  return (
    <div className="transition-all h-screen">
      <GuestHeader />
      <div>
        <p className="text-5xl font-semibold main-title mt-6 ml-6 md:ml-28  ">
          Últimas Series
        </p>
        <div className="w-[90%] justify-center text-center ml-[4%] p-10">
          <Carousel series={latestSeries}></Carousel>
        </div>
      </div>
      <p className="text-5xl font-semibold main-title mt-6 ml-6 md:ml-28  ">
        Últimos capítulos
      </p>
      <div className="grid xl:grid-cols-5 gap-5 w-[85%] ml-10 md:ml-28 mt-8 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {episodes.map((epi) => {
          return (
            <Link
              to={`/watch/${epi.fullname}`}
              key={epi.id}
              className="w-full transition-all rounded-lg dark:text-white hover:scale-105  cursor-pointer"
            >
              <img
                src={`${baseUrl}stream/img/${
                  epi.imgPath ? epi.imgPath : epi.serie.imgPath
                }`}
                className="rounded-2xl dark:hover:shadow-purple-600 hover:shadow-lg"
                alt=""
              />
              <p className="text-lg text-center  dark:text-white">
                {epi.name}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="w-[60%] align-middle ms-[20%] grid mt-16">
        <ChatRoom room={0}></ChatRoom>
      </div>
    </div>
  );
}
