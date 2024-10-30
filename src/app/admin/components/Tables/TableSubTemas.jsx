"use client";
import { useState, useEffect } from "react";
import { deleteSubTema } from "@/actions";
import { IoAddCircle } from "react-icons/io5";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { Offcanvas2 } from "@/components";
import { FormEditSubTema, FormAddSubTema, PaginationAdmin, TableActionsAdmin, SearchInputAdmin } from "..";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

/* Componente de tabla para mostrar y gestionar subtemas*/
export const TableSubTemas = ({ subtemas, temas }) => {
  const { toggleRefreshTable } = useRedrawStore();
  
  // Estados para el modal/offcanvas
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedSubTemaId, setSelectedSubTemaId] = useState(null);
  const [isAddingSubTema, setIsAddingSubTema] = useState(false);
  
  // Estados para filtros y búsqueda
  const [filteredSubtemas, setFilteredSubtemas] = useState(subtemas);
  const [searchTerm, setSearchTerm] = useState("");
  const [temaFilter, setTemaFilter] = useState("");

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Efectos para filtrado y paginación
  useEffect(() => {
    filterAndSearchSubtemas();
  }, [searchTerm, temaFilter, subtemas]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, temaFilter]);

  /**
   * Filtra subtemas basado en búsqueda y filtro de tema
   */
  const filterAndSearchSubtemas = () => {
    let updatedSubtemas = [...subtemas];

    if (temaFilter) {
      updatedSubtemas = updatedSubtemas.filter((subtema) => 
        subtema.id_tema === parseInt(temaFilter)
      );
    }

    if (searchTerm) {
      updatedSubtemas = updatedSubtemas.filter((subtema) =>
        subtema.nombre_subtema.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por ID de mayor a menor
    updatedSubtemas.sort((a, b) => b.id_subtema - a.id_subtema);
    setFilteredSubtemas(updatedSubtemas);
  };

  // Cálculos para paginación
  const totalItems = filteredSubtemas.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentSubtemas = filteredSubtemas.slice(startIndex, endIndex);

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  /**
   * Maneja la eliminación de un subtema
   */
  const handleDeleteSubTema = (idSubTema) => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <span>¿Estás seguro de eliminar el subtema?</span>
        <p className="text-sm text-center text-gray-500">
          Es posible que tenga preguntas asignadas, entonces estas también se eliminarán
        </p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={async () => {
              try {
                const result = await deleteSubTema(idSubTema);
                if (result.success) {
                  toast.success(result.message, { id: t.id });
                  toggleRefreshTable();
                } else {
                  toast.error(result.message, { id: t.id });
                }
              } catch (error) {
                toast.error("Error al eliminar el subtema: " + error.message, { id: t.id });
              }
              toast.dismiss(t.id);
            }}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: "top-center",
    });
  };

  const handleOpenOffcanvas = (idSubTema = null) => {
    setSelectedSubTemaId(idSubTema);
    setIsAddingSubTema(!idSubTema);
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedSubTemaId(null);
    setIsAddingSubTema(false);
  };

  return (
    <div className="mt-4">
      <div className="mb-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        {/* Buscador */}
        <SearchInputAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Buscar por nombre del subtema"
          onClear={clearSearch}
        />

        {/* Filtro por tema */}
        <div className="md:w-1/4">
          <select
            className="border p-2 rounded-md w-full"
            value={temaFilter}
            onChange={(e) => setTemaFilter(e.target.value)}
          >
            <option value="">Todos los temas</option>
            {temas.map((tema) => (
              <option key={tema.id_tema} value={tema.id_tema}>
                {tema.nombre_tema}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Agregar Subtema */}
        <div className="flex justify-start items-center my-2">
          <button
            className="flex items-center text-sm gap-1 text-white bg-primary px-2 py-1 rounded-md"
            onClick={() => handleOpenOffcanvas()}
          >
            <IoAddCircle size={24} />
            <span>Agregar Subtema</span>
          </button>
        </div>
      </div>

      {/* Tabla de subtemas */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Subtema</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Del Tema</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentSubtemas.length > 0 ? (
              currentSubtemas.map((subtema) => {
                const tema = temas.find((tem) => tem.id_tema === subtema.id_tema);
                return (
                  <tr key={subtema.id_subtema} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{subtema.id_subtema}</td>
                    <td className="border border-gray-300 px-4 py-2">{subtema.nombre_subtema}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {tema ? tema.nombre_tema : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <TableActionsAdmin
                        id={subtema.id_subtema}
                        onEdit={handleOpenOffcanvas}
                        onDelete={handleDeleteSubTema}
                        itemName="el subtema"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No se encontraron subtemas con los criterios seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredSubtemas.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          setCurrentPage={setCurrentPage}
          itemName="subtemas"
        />
      )}

      {/* Modal/Offcanvas */}
      <Offcanvas2
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title={isAddingSubTema ? "Añadir Nuevo Subtema" : "Editar Subtema"}
      >
        {isAddingSubTema ? (
          <FormAddSubTema 
            temas={temas} 
            onClose={handleCloseOffcanvas}
          />
        ) : (
          <FormEditSubTema
            key={selectedSubTemaId}
            subTemaId={selectedSubTemaId}
            temas={temas}
            onClose={handleCloseOffcanvas}
          />
        )}
      </Offcanvas2>
    </div>
  );
};