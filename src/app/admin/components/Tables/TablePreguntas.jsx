// components/preguntas/TablePreguntas.js
"use client";
import { useState, useEffect } from "react";
import { deletePregunta } from "@/actions";
import { IoAddCircle } from "react-icons/io5";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { Offcanvas2 } from "@/components";
import { FormEditPregunta, FormAddPregunta, PaginationAdmin, TableActionsAdmin, SearchInputAdmin } from "..";
import toast from "react-hot-toast";

// Constante para items por página
const ITEMS_PER_PAGE = 10;
/*Componente principal de la tabla de preguntas*/

export const TablePreguntas = ({ preguntas: initialPreguntas, subtemas, opciones }) => {
  // Estados para el manejo de datos
  const { toggleRefreshTable } = useRedrawStore();
  const [preguntas, setPreguntas] = useState([]);
  const [filteredPreguntas, setFilteredPreguntas] = useState([]);

  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [subtemaFilter, setSubtemaFilter] = useState("");

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Estados para el modal/offcanvas
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedPreguntaId, setSelectedPreguntaId] = useState(null);
  const [isAddingPregunta, setIsAddingPregunta] = useState(false);

  // Efecto para ordenar preguntas por ID de mayor a menor
  useEffect(() => {
    if (initialPreguntas?.length > 0) {
      const sortedPreguntas = [...initialPreguntas].sort((a, b) => b.id_pregunta - a.id_pregunta);
      setPreguntas(sortedPreguntas);
    } else {
      setPreguntas([]);
    }
  }, [initialPreguntas]);

  // Efecto para filtrado de preguntas
  useEffect(() => {
    filterAndSearchPreguntas();
  }, [searchTerm, subtemaFilter, preguntas]);

  // Efecto para resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, subtemaFilter]);

  /**
   * Función para filtrar y buscar preguntas
   * Aplica filtros de subtema y término de búsqueda
   */
  const filterAndSearchPreguntas = () => {
    let updatedPreguntas = [...preguntas];

    if (subtemaFilter) {
      updatedPreguntas = updatedPreguntas.filter((pregunta) => 
        pregunta.id_subtema === parseInt(subtemaFilter)
      );
    }

    if (searchTerm) {
      updatedPreguntas = updatedPreguntas.filter((pregunta) =>
        pregunta.texto_pregunta.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPreguntas(updatedPreguntas);
  };

  // Cálculos para paginación
  const totalItems = filteredPreguntas.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = ((currentPage - 1) * ITEMS_PER_PAGE);
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentPreguntas = filteredPreguntas.slice(startIndex, endIndex);

  /**
   * Limpia el término de búsqueda y resetea la página
   */
  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  /**
   * Maneja la eliminación de una pregunta
   * @param {number} idPregunta - ID de la pregunta a eliminar
   */
  const handleDeletePregunta = async (idPregunta) => {
    try {
      const result = await deletePregunta(idPregunta);
      if (result.success) {
        const updatedPreguntas = preguntas
          .filter(p => p.id_pregunta !== idPregunta)
          .sort((a, b) => b.id_pregunta - a.id_pregunta);
        setPreguntas(updatedPreguntas);
        toast.success(result.message);
        toggleRefreshTable();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error al eliminar la pregunta: " + error.message);
    }
  };

  /**
   * Abre el offcanvas para editar o añadir una pregunta
   * @param {number|null} idPregunta - ID de la pregunta a editar, null si es nueva
   */
  const handleOpenOffcanvas = (idPregunta = null) => {
    setSelectedPreguntaId(idPregunta);
    setIsAddingPregunta(!idPregunta);
    setIsOffcanvasOpen(true);
  };

  /**
   * Cierra el offcanvas y resetea sus estados
   */
  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedPreguntaId(null);
    setIsAddingPregunta(false);
  };

  return (
    <div className="mt-4">
      {/* Barra de herramientas */}
      <div className="mb-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        {/* Componente de búsqueda */}
        <SearchInputAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Buscar pregunta"
          onClear={clearSearch}
        />

        {/* Filtro por subtema */}
        <div className="md:w-1/4">
          <select
            className="border p-2 rounded-md w-full"
            value={subtemaFilter}
            onChange={(e) => setSubtemaFilter(e.target.value)}
          >
            <option value="">Todos los subtemas</option>
            {subtemas.map((subtema) => (
              <option key={subtema.id_subtema} value={subtema.id_subtema}>
                {subtema.nombre_subtema}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Agregar */}
        <div className="flex justify-start items-center my-2">
          <button
            className="flex items-center text-sm gap-1 text-white bg-primary px-2 py-1 rounded-md"
            onClick={() => handleOpenOffcanvas()}
          >
            <IoAddCircle size={24} />
            <span>Agregar Pregunta</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Pregunta</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tema/Subtema</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Año</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentPreguntas.length > 0 ? (
              currentPreguntas.map((pregunta) => {
                const subtema = subtemas.find((t) => t.id_subtema === pregunta.id_subtema);
                return (
                  <tr key={pregunta.id_pregunta} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{pregunta.id_pregunta}</td>
                    <td className="border border-gray-300 px-4 py-2">{pregunta.texto_pregunta}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {subtema ? subtema.nombre_subtema : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{pregunta.year}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <TableActionsAdmin
                        id={pregunta.id_pregunta}
                        onEdit={handleOpenOffcanvas}
                        onDelete={handleDeletePregunta}
                        itemName="la pregunta"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No se encontraron preguntas con los criterios seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredPreguntas.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          setCurrentPage={setCurrentPage}
          itemName="preguntas"
        />
      )}

      {/* Modal/Offcanvas para editar o añadir */}
      <Offcanvas2
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title={isAddingPregunta ? "Añadir Nueva Pregunta" : "Editar Pregunta"}
      >
        {isAddingPregunta ? (
          <FormAddPregunta 
            subtemas={subtemas}
            onClose={handleCloseOffcanvas}
          />
        ) : (
          <FormEditPregunta 
            subtemas={subtemas} 
            onClose={handleCloseOffcanvas} 
            preguntaId={selectedPreguntaId}
          />
        )}
      </Offcanvas2>
    </div>
  );
};