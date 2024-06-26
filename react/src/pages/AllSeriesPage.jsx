import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import SerieDisplay from "../components/SerieDisplay";
import GuestHeader from "../Layouts/GuestHeader";
import SerieService from "../services/SerieService";

export default function AllSeriesPage() {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? page : 1;
  document.title = `Series`;
  const [series, setSeries] = useState([]);
  const [pages, setPages] = useState(0);

  const service = new SerieService();
  const fetchSeries = () => {
    service
      .getAll(currentPage)
      .then((response) => {
        setSeries(response.data.series);
        setPages(response.data.totalPages);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const handlePageChange = ({ selected }) => {
    const pageNumber = parseInt(selected) + 1;
    navigate(`/series/${pageNumber}`);
  };
  useEffect(() => {
    fetchSeries();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div>
      <GuestHeader></GuestHeader>
      <div className="grid grid-cols-1 h-[10%] px-10 mt-10">
        <h1 className="text-5xl font-semibold dark:text-white">Nuestras series:</h1>
        {series.map((serie, index) => (
          <div key={serie.id}>
            <SerieDisplay index={index} series={series} serie={serie} />
          </div>
        ))}
      </div>
      {pages > 1 && series.length > 0 && (
        <div className="pagination-container my-10">
          <ReactPaginate
            pageCount={pages}
            pageRangeDisplayed={3}
            forcePage={currentPage - 1}
            onPageChange={handlePageChange}
            marginPagesDisplayed={3}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </div>
  );
}
