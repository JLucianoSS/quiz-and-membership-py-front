
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export const PaginationAdmin = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IoChevronBack size={24} />
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IoChevronForward size={24} />
      </button>
    </div>
  );
};
