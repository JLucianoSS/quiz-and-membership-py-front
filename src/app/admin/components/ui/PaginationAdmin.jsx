// components/common/Pagination.js
"use client";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

/**
 * Componente de paginación reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {number} props.currentPage - Página actual
 * @param {number} props.totalPages - Total de páginas
 * @param {number} props.totalItems - Total de items
 * @param {number} props.startIndex - Índice inicial de items mostrados
 * @param {number} props.endIndex - Índice final de items mostrados
 * @param {function} props.setCurrentPage - Función para cambiar la página
 * @param {string} props.itemName - Nombre del item para mostrar en el texto (ej: "preguntas", "temas")
 */
export const PaginationAdmin = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  setCurrentPage,
  itemName = "items"
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm text-gray-600">
        Mostrando {startIndex + 1} a {Math.min(endIndex, totalItems)} de {totalItems} {itemName}
      </span>
      <div className="flex justify-center items-center gap-2">
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
    </div>
  );
};