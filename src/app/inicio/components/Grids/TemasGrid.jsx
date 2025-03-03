"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { convertToSlug } from "@/utils/strings";

export const TemasGrid = ({ temas }) => {
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

  // Filtrar temas según el término de búsqueda
  const filteredTemas = temas.filter((tema) =>
    normalizeText(tema.nombre_tema).includes(normalizeText(searchTerm))
  );

  // Cantidad de elementos por página
  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTemas.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (id, name) => {
    router.push(`/inicio/tema/${convertToSlug(`${name}-${id}`)}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar tema..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reiniciar a la primera página al buscar
          }}
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b text-start">Nombre del Tema</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((tema) => (
                <tr
                  key={tema.id_tema}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleClick(tema.id_tema, tema.nombre_tema)}
                >
                  <td className="py-2 px-4 border-b text-center">T{tema.id_tema}</td>
                  <td className="py-2 px-4 border-b">{tema.nombre_tema}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-4 text-center">
                  No se encontraron temas.
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
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTemas.length)}
          </strong>{" "}
          de <strong>{filteredTemas.length}</strong> temas
        </div>
        <div>
          Página <strong>{currentPage}</strong> de{" "}
          <strong>{Math.ceil(filteredTemas.length / itemsPerPage)}</strong>
        </div>
      </div>

      {/* Botones de Paginación */}
      <div className="flex flex-wrap justify-center mt-2 space-x-1">
        {Array.from({ length: Math.ceil(filteredTemas.length / itemsPerPage) }).map(
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