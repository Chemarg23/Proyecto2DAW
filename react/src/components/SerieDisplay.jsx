import { PropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../services/Service";
import FollowButton from "./FollowButton";

export default function SerieDisplay({ index, series, serie }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 py-5">
        <div className="w-full sm:w-1/4 order-1 sm:order-1">
          <img
            onClick={() => navigate(`/serie/${serie.search}`)}
            className="h-44 cursor-pointer dark:hover:shadow-purple-500 dark:hover:shadow-md hover:shadow-2xl transition-all hover:scale-105 w-full"
            src={`${baseUrl}stream/img/${serie.imgPath}`}
          />
        </div>
        <div className="dark:text-white order-2 sm:order-2">
          <p className="text-2xl font-semibold mb-1">
            <Link to={`/serie/${serie.search}`}>{serie.name}</Link>
            <span className="ms-3">
              <FollowButton serie={serie}></FollowButton>
            </span>
          </p>
          <div className="flex flex-nowrap">
            <p className="mt-1.5 inline-flex">
              <span className="text-sm sm:text-lg text-wrap font-semibold">
                Categorías:{" "}
              </span>
              {serie.categories.map((cat, index) => {
                const hasNext = index < serie.categories.length - 1;
                return hasNext ? (
                  <Link
                    to={`/category/${cat.search}`}
                    key={cat.id}
                    className="category hover:text-purple-500 ms-1.5 mt-0.5"
                  >
                    <span>
                      {cat.name}
                      {" | "}
                    </span>
                  </Link>
                ) : (
                  <Link
                    to={`/category/${cat.search}`}
                    key={cat.id}
                    className="category hover:text-purple-500 mt-0.5 ms-1.5"
                  >
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </p>
          </div>
          <p className="mt-1.5">
            <span className="font-semibold text-lg">Fecha de estreno:</span>
            <span className="category text-lg">{" " + serie.releaseDate}</span>
          </p>
          <p className="mt-1.5">
            <span className="font-semibold text-lg">
              Fecha de finalización:
            </span>
            <span className="category text-lg">
              {serie.finishDate ? " " + serie.finishDate : " En estreno"}
            </span>
          </p>
          <p className="mt-1.5">
            <span className="font-semibold text-lg">Descripción:</span>
            <span className="category text-sm sm:text-lg">
              {" " + serie.descr.slice(0, 110) + "..."}
            </span>
          </p>
        </div>
      </div>

      {index < series.length - 1 && (
        <hr className="w-full border-black dark:border-white mt-4 mb-4 opacity-15" />
      )}
    </>
  );
}
SerieDisplay.propTypes = {
  index: PropTypes.number.isRequired,
  series: PropTypes.arrayOf(PropTypes.object).isRequired,
  serie: PropTypes.object.isRequired,
};
