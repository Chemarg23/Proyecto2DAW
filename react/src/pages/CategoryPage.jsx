import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useParams } from "react-router-dom";
import SerieDisplay from "../components/SerieDisplay";
import GuestHeader from "../Layouts/GuestHeader";
import SerieService from "../services/SerieService";


export default function SearchPage() {
  const navigate = useNavigate();
  const { name, page } = useParams();
  document.title = `Buscar - ${name}`;
  const [series, setSeries] = useState([]);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState();
  const service = new SerieService();
  
  const fetchSeries = () => {
    service
      .searchByCategory(name, page ? page : 1)
      .then((response) => {
        setSeries(response.data.series);
        setPages(response.data.totalPages);
        setError('')
      })
      .catch((err) => {
        const status = err.response.status;
        setSeries([])
        status === 404 &&
          setError("No se encontraron series con un nombre como " + name);
      });
  };
  const handlePageChange = ({ selected }) => {
    const pageNumber = parseInt(selected) + 1;
    navigate(`/category/${name}/${pageNumber}`);
  };
  useEffect(() => {
    fetchSeries();
  }, [page, name]);



  return (
    <div>
      <GuestHeader></GuestHeader>
      <div className="grid grid-cols-1 h-[10%] px-10 mt-10 dark:text-white">
        <h1 className="capitalize text-5xl font-semibold mb-10">Series de {name}:</h1>
        {series.length > 0 && series.map((serie, index) => (
          <div key={serie.id}>
            <SerieDisplay index={index} series={series} serie={serie} />
          </div>
        ))}
      </div>
      {pages > 1 && series.length > 0 && (
        <div className="pagination-container mt-16">
          <ReactPaginate
            pageCount={pages}
            pageRangeDisplayed={3}
            forcePage={page ? page-1 : 0}
            onPageChange={handlePageChange}
            marginPagesDisplayed={3}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
      <div>
        {error && (
          <p className="font-bold text-4xl w-screen text-center mt-[6%]  dark:text-white">
            No se ha encontrado ninguna serie <br />
            con un nombre similar a &quot;{name}&quot;
            {page > pages && (
              <span>
                {" "}
                para la página {page}
                <br /> Haz click{" "}
                <Link
                  className="text-purple-500 hover:text-purple-400"
                  to={`/search/${name}`}
                >
                  aquí
                </Link>
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
