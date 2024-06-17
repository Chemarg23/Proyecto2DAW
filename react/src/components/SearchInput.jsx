import { debounce } from "lodash";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SerieService from "../services/SerieService";
import { baseUrl } from "../services/Service";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const service = new SerieService();
  const [foundedSeries, setFoundedSeries] = useState([]);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const research = (e) => {
    if (e.target.value === 0) return;
    e.key === "Enter" &&
      navigate(`/search/${e.target.value.replace(/ /g, "-")}`);
    e.key === "Enter" && setFoundedSeries([]);
  };
  const getSeries = (e) => {
    setSearch(e.target.value);
    setLoader(true);
    debounceSearch(e.target.value);
  };

  const debounceSearch = debounce((searchValue) => {
    if (searchValue.length < 2) return;
    setFoundedSeries([]);
    service
      .searchByName(searchValue.replace(/ /g, "-"), 1)
      .then((response) => {
        setLoader(false);
        setFoundedSeries(response.data.series.slice(0, 5));
      })
      .catch(() => {
        setLoader(false);
        setFoundedSeries([]);
      });
  }, 1250);

  return (
    <div className="search-container w-full">
      <input
        type="text"
        className="py-2 px-3 rounded-xl w-full dark:bg-gray-700 bg-gray-200 focus:ring-blue-500"
        placeholder="Search..."
        onChange={(e) => getSeries(e)}
        value={search}
        onKeyUp={research}
      />
      <i
        className="bi bi-search search-icon cursor-pointer p-3"
        onClick={() => navigate(`/search/${search.replace(/ /g, "-")}`)}
      ></i>
      {search.length >= 2 && (
        <ul className="z-50 absolute bg-white shadow-xl dark:bg-gray-950 w-full px-3 py-3 rounded-lg mt-1 dark:text-white">
          {foundedSeries.map((serie) => (
            <li key={serie.id} className="flex py-2 gap-4 px-1 justify-between hover:bg-gray-300 dark:hover:bg-gray-900 rounded-lg">
              <Link
                className="w-full flex gap-4"
                to={`/serie/${serie.search}`}
                onClick={() => {
                  setSearch("");
                  setFoundedSeries([]);
                }}
              >
                <img
                  src={`${baseUrl}stream/img/${serie.imgPath}`}
                  className="w-6/12 h-24 rounded-md"
                  alt=""
                />
                <span className="w-6/12 text-lg mt-7">{serie.name}</span>
              </Link>
            </li>
          ))}
          {foundedSeries.length === 0 && (
            <li className="py-2 text-center">
              <span className="text-xl text-center w-full">
                No se encontraron series
              </span>
            </li>
          )}
          {loader && (
            <i className="fa fa-spinner fa-spin scale-150 w-full text-center"></i>
          )}
        </ul>
      )}
    </div>
  );
}
