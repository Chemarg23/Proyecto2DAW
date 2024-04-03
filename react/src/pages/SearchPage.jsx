import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import SerieDisplay from "../components/SerieDisplay";
import GuestHeader from "../Layouts/GuestHeader";
import SerieService from "../services/SerieService";
export default function SearchPage() {
  const navigate = useNavigate();
  const { name, page } = useParams();
  const currentPage = page ? page : 1;
  document.title = `Buscar - ${name}`;
  const [series, setSeries] = useState([]);
  const [pages, setPages] = useState(0);
  const service = new SerieService();
  const fetchSeries = () => {
    service.searchByName(name, currentPage).then((response) => {
      setSeries(response.data.series);
      setPages(response.data.totalPages);
    });
  };
  const handlePageChange = ({ selected }) => {
    const pageNumber = parseInt(selected) + 1;
    navigate(`/search/${name}/${pageNumber}`);
  };
  useEffect(() => {
    fetchSeries();
  }, [page, name]);

  return (
    <div>
      <GuestHeader></GuestHeader>
      <div className="grid grid-cols-1 h-[10%] px-10 mt-10">
        {series.map((serie, index) => (
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
