"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { convertToSlug } from "@/utils/strings";

export const SubTemasGrid = ({ subtemas }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Función para normalizar texto (quitar tildes y convertir a minúsculas)
  const normalizeText = (text) => {
    return text
      .normalize("NFD") // Descompone caracteres con tildes
      .replace(/[\u0300-\u036f]/g, "") // Elimina los diacríticos
      .toLowerCase();
  };

  // Filtrar subtemas según el término de búsqueda
  const filteredSubTemas = subtemas.filter((subtema) =>
    normalizeText(subtema.nombre_subtema).includes(normalizeText(searchTerm))
  );

  // Cantidad de elementos por página
  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubTemas.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Redirigir al hacer clic en un subtema
  const handleClick = (id, name) => {
    router.push(`/preguntas/subtema/${convertToSlug(`${name}-${id}`)}/p/1`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar subtema..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reiniciar a la primera página al buscar
          }}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Tabla de Subtemas */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b text-start">Nombre del Subtema</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((subtema) => (
                <tr
                  key={subtema.id_subtema}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleClick(subtema.id_subtema, subtema.nombre_subtema)}
                >
                  <td className="py-2 px-4 border-b text-center">S{subtema.id_subtema}</td>
                  <td className="py-2 px-4 border-b">{subtema.nombre_subtema}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-4 text-center">
                  No se encontraron subtemas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Resumen de Paginación */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          Mostrando{" "}
          <strong>
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredSubTemas.length)}
          </strong>{" "}
          de <strong>{filteredSubTemas.length}</strong> subtemas
        </div>
        <div>
          Página <strong>{currentPage}</strong> de{" "}
          <strong>{Math.ceil(filteredSubTemas.length / itemsPerPage)}</strong>
        </div>
      </div>

      {/* Botones de Paginación */}
      <div className="flex flex-wrap justify-center mt-2 space-x-1">
        {Array.from({ length: Math.ceil(filteredSubTemas.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};