import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Pagination({ prevPage, nextPage, endingLink }) {
  return (
    <div className="w-full flex justify-end gap-3 text-lg">
      {prevPage === 1 ? null : (
        <Link
          className="border-2 py-1 px-4 rounded-lg"
          to={`?pageNum=${prevPage - 1}`}
        >
          <FaArrowLeftLong />
        </Link>
      )}
      {nextPage < endingLink ? (
        <Link
          className="border-2 py-1 px-4 rounded-lg"
          to={`?pageNum=${nextPage + 1}`}
        >
          <FaArrowRightLong />
        </Link>
      ) : null}
    </div>
  );
}

export default Pagination;
