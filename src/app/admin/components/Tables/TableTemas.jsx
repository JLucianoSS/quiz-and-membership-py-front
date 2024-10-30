"use client";
import { useState, useEffect } from "react";
import { deleteTema } from "@/actions";
import { IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { Offcanvas2 } from "@/components";
import { FormEditTema, FormAddTema, PaginationAdmin, TableActionsAdmin, SearchInputAdmin } from "..";


const ITEMS_PER_PAGE = 10;

/** Componente de tabla para mostrar y gestionar temas*/
export const TableTemas = ({ temas, modulos }) => {
  const { toggleRefreshTable } = useRedrawStore();
  
  // Estados para el modal/offcanvas
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedTemaId, setSelectedTemaId] = useState(null);
  const [isAddingTema, setIsAddingTema] = useState(false);
  
  // Estados para filtros y búsqueda
  const [filteredTemas, setFilteredTemas] = useState(temas);
  const [searchTerm, setSearchTerm] = useState("");
  const [moduloFilter, setModuloFilter] = useState("");

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Efectos para filtrado y paginación
  useEffect(() => {
    filterAndSearchTemas();
  }, [searchTerm, moduloFilter, temas]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, moduloFilter]);

  /**
   * Filtra temas basado en búsqueda y filtro de módulo
   */
  const filterAndSearchTemas = () => {
    let updatedTemas = [...temas];

    if (moduloFilter) {
      updatedTemas = updatedTemas.filter((tema) => 
        tema.id_modulo === parseInt(moduloFilter)
      );
    }

    if (searchTerm) {
      updatedTemas = updatedTemas.filter((tema) =>
        tema.nombre_tema.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por ID de mayor a menor
    updatedTemas.sort((a, b) => b.id_tema - a.id_tema);
    setFilteredTemas(updatedTemas);
  };

  // Cálculos para paginación
  const totalItems = filteredTemas.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentTemas = filteredTemas.slice(startIndex, endIndex);

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  /**
   * Maneja la eliminación de un tema
   */
  const handleDeleteTema = (idTema) => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <span>¿Estás seguro de eliminar el tema?</span>
        <p className="text-sm text-center text-gray-500">
          Es posible que tenga preguntas o subtemas asignados, entonces estos también se eliminarán
        </p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={async () => {
              try {
                const result = await deleteTema(idTema);
                if (result.success) {
                  toast.success(result.message, { id: t.id });
                  toggleRefreshTable();
                } else {
                  toast.error(result.message, { id: t.id });
                }
              } catch (error) {
                toast.error("Error al eliminar el tema: " + error.message, { id: t.id });
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

  const handleOpenOffcanvas = (idTema = null) => {
    setSelectedTemaId(idTema);
    setIsAddingTema(!idTema);
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedTemaId(null);
    setIsAddingTema(false);
  };

  return (
    <div className="mt-4">
      <div className="mb-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        {/* Buscador */}
        <SearchInputAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Buscar por nombre del tema"
          onClear={clearSearch}
        />

        {/* Filtro por módulo */}
        <div className="md:w-1/4">
          <select
            className="border p-2 rounded-md w-full"
            value={moduloFilter}
            onChange={(e) => setModuloFilter(e.target.value)}
          >
            <option value="">Todos los módulos</option>
            {modulos.map((modulo) => (
              <option key={modulo.id_modulo} value={modulo.id_modulo}>
                {modulo.nombre_modulo}
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
            <span>Agregar Tema</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tema</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Del Módulo</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentTemas.length > 0 ? (
              currentTemas.map((tema) => {
                const modulo = modulos.find((mod) => mod.id_modulo === tema.id_modulo);
                return (
                  <tr key={tema.id_tema} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{tema.id_tema}</td>
                    <td className="border border-gray-300 px-4 py-2">{tema.nombre_tema}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {modulo ? modulo.nombre_modulo : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <TableActionsAdmin
                        id={tema.id_tema}
                        onEdit={handleOpenOffcanvas}
                        onDelete={handleDeleteTema}
                        itemName="el tema"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No se encontraron temas con los criterios seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredTemas.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          setCurrentPage={setCurrentPage}
          itemName="temas"
        />
      )}

      {/* Modal/Offcanvas */}
      <Offcanvas2
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title={isAddingTema ? "Añadir Nuevo Tema" : "Editar Tema"}
      >
        {isAddingTema ? (
          <FormAddTema 
            modulos={modulos}
            onClose={handleCloseOffcanvas}
          />
        ) : (
          <FormEditTema
            key={selectedTemaId}
            temaId={selectedTemaId}
            modulos={modulos}
            onClose={handleCloseOffcanvas}
          />
        )}
      </Offcanvas2>
    </div>
  );
};