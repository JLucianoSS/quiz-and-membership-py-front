"use client";
import { useState, useEffect } from "react";
import { deleteModulo } from "@/actions";
import { IoAddCircle } from "react-icons/io5";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import Image from "next/image";
import toast from "react-hot-toast";
import { Offcanvas2 } from "@/components";
import { FormEditModulo, FormAddModulo, PaginationAdmin, TableActionsAdmin, SearchInputAdmin } from "..";


const ITEMS_PER_PAGE = 10;

/* Componente de tabla para mostrar y gestionar módulos*/
export const TableModulos = ({ modulos }) => {
  const { toggleRefreshTable } = useRedrawStore();
  
  // Estados para el modal/offcanvas
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedModuloId, setSelectedModuloId] = useState(null);
  const [isAddingModulo, setIsAddingModulo] = useState(false);
  
  // Estados para filtros y búsqueda
  const [filteredModulos, setFilteredModulos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Efecto para filtrado y ordenamiento
  useEffect(() => {
    filterAndSearchModulos();
  }, [searchTerm, modulos]);

  // Efecto para resetear página cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  /**
   * Filtra y ordena módulos basado en búsqueda
   */
  const filterAndSearchModulos = () => {
    let updatedModulos = [...modulos];

    if (searchTerm) {
      updatedModulos = updatedModulos.filter((modulo) =>
        modulo.nombre_modulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por ID de mayor a menor
    updatedModulos.sort((a, b) => b.id_modulo - a.id_modulo);
    setFilteredModulos(updatedModulos);
  };

  // Cálculos para paginación
  const totalItems = filteredModulos.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentModulos = filteredModulos.slice(startIndex, endIndex);

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  /**
   * Maneja la eliminación de un módulo
   */
  const handleDeleteModulo = (idModulo) => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <span>¿Estás seguro de eliminar el módulo?</span>
        <p className="text-sm text-center text-gray-500">
          Es posible que tenga temas asignados, entonces estos también se eliminarán
        </p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={async () => {
              try {
                const result = await deleteModulo(idModulo);
                if (result.success) {
                  toast.success(result.message, { id: t.id });
                  toggleRefreshTable();
                } else {
                  toast.error(result.message, { id: t.id });
                }
              } catch (error) {
                toast.error("Error al eliminar el módulo: " + error.message, { id: t.id });
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

  const handleOpenOffcanvas = (idModulo = null) => {
    setSelectedModuloId(idModulo);
    setIsAddingModulo(!idModulo);
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedModuloId(null);
    setIsAddingModulo(false);
  };

  return (
    <div className="mt-4">
      <div className="mb-4 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        {/* Buscador */}
        <SearchInputAdmin
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Buscar por nombre del módulo"
          onClear={clearSearch}
        />

        {/* Botón Agregar */}
        <div className="flex justify-start items-center my-2">
          <button
            className="flex items-center text-sm gap-1 text-white bg-primary px-2 py-1 rounded-md"
            onClick={() => handleOpenOffcanvas()}
          >
            <IoAddCircle size={24} />
            <span>Agregar Módulo</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Imagen</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentModulos.length > 0 ? (
              currentModulos.map((modulo) => (
                <tr key={modulo.id_modulo} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{modulo.id_modulo}</td>
                  <td className="border border-gray-300 px-4 py-2">{modulo.nombre_modulo}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="h-16 w-16">
                      {modulo.imagen ? (
                        <Image
                          className="h-full w-full object-cover"
                          src={modulo.imagen}
                          alt={modulo.nombre_modulo}
                          width={300}
                          height={300}
                        />
                      ) : (
                        <span className="text-xs flex items-center h-full text-gray-400">
                          Sin imagen
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <TableActionsAdmin
                      id={modulo.id_modulo}
                      onEdit={handleOpenOffcanvas}
                      onDelete={handleDeleteModulo}
                      itemName="el módulo"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No se encontraron módulos con los criterios seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredModulos.length > 0 && (
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
          setCurrentPage={setCurrentPage}
          itemName="módulos"
        />
      )}

      {/* Modal/Offcanvas */}
      <Offcanvas2
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title={isAddingModulo ? "Añadir Nuevo Módulo" : "Editar Módulo"}
      >
        {isAddingModulo ? (
          <FormAddModulo 
            onClose={handleCloseOffcanvas}
          />
        ) : (
          <FormEditModulo
            key={selectedModuloId}
            onclose={handleCloseOffcanvas}
            moduleId={selectedModuloId}
          />
        )}
      </Offcanvas2>
    </div>
  );
};