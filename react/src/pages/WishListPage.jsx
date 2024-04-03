import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GuestHeader from "../Layouts/GuestHeader";
import SerieDisplay from "../components/SerieDisplay";

export default function WishListPage() {
  const user = useSelector((state) => state.user);
  const { page } = useParams();
  const seriesPerPage = 10;
  const currentPage = page ? page - 1 : 0;
  const navigate = useNavigate();
  const [series, setSeries] = useState([...user.series]);
  const [seriesToShow, setSeriesToShow] = useState([])
  const [totalPages, setPages] = useState(Math.ceil(series.length / seriesPerPage));

  useEffect(() => {
    setSeries([...user.series])
    setPages(Math.ceil(series.length / seriesPerPage))
    const startIdx = currentPage * seriesPerPage;
    const endIdx = startIdx + seriesPerPage;
    const currentSeries = series.slice(startIdx, endIdx);
    setSeriesToShow(currentSeries);
  }, [page]);

  const handlePageChange = ({ selected }) => {
    const pageNumber = parseInt(selected)+1;
    navigate(`/list/${pageNumber}`);
  };
  return (
    <>
      <GuestHeader />
      <div className="p-10">
        <h1 className="text-5xl dark:text-white font-semibold mb-7">
          Mis series:
        </h1>
        {series &&
          seriesToShow.map((serie, index) => (
            <div key={serie.id} className="">
              <SerieDisplay series={series} serie={serie} index={index} />
            </div>
          ))}
      </div>
      {totalPages > 1 && series.length > 0 && (
        <div className="pagination-container">
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={3}
            activeLinkClassName="bg-purple-950"
            forcePage={currentPage}
            onPageChange={handlePageChange}
            marginPagesDisplayed={3}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
}
