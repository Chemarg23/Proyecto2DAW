import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { baseUrl } from "../services/Service";
import FollowButton from "./FollowButton";
const Carousel = ({ series }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const navigate = useNavigate();
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {series.map((serie) => (
          <div key={serie.id} className="slide relative">
            <img
              src={`${baseUrl}stream/img/${serie.imgPath}`}
              alt={serie.name}
              className="h-[22rem] w-full cursor-pointer opacity-60"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-3 text-white text-center"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))'
            }}
            >
              <h3 className="text-xl font-semibold p-3 capitalize">
                {serie.name}
              </h3>
              <div className="flex mb-5 gap-3 center text-center justify-center">
                <Button
                  className="dark:text-white text-lg dark:bg-purple-600 font-semibold  dark:hover:border-purple-600 dark:border-purple-500 text-blue-500 border-blue-500 hover:shadow-md dark:hover:shadow-purple-500 hover:shadow-blue-500  rounded-xl px-3 py-2 border-2 bg-transparent"
                  onClick={() => navigate(`/serie/${serie.search}`)}
                >
                  Ver Ahora
                </Button>
                <FollowButton serie={serie} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
