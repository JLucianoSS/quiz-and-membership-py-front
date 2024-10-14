"use client";
import { useState, useEffect } from "react";
import { deleteModulo } from "@/actions";
import { IoCreate, IoTrash, IoSearch, IoClose, IoAddCircle } from "react-icons/io5";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import Image from "next/image";
import toast from "react-hot-toast";
import { Offcanvas2 } from "@/components";
import { FormEditModulo, FormAddModulo } from "..";

export const TableModulos = ({ modulos }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedModuloId, setSelectedModuloId] = useState(null);
  const [isAddingModulo, setIsAddingModulo] = useState(false);
  const [filteredModulos, setFilteredModulos] = useState(modulos);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    filterAndSearchModulos();
  }, [searchTerm, modulos]);

  const filterAndSearchModulos = () => {
    let updatedModulos = modulos;

    if (searchTerm) {
      updatedModulos = updatedModulos.filter(
        (modulo) => modulo.nombre_modulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredModulos(updatedModulos);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleDeleteModulo = (idModulo) => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <span>¿Estás seguro de eliminar el módulo?</span>
        <p className="text-sm text-center text-gray-500">Es posible que tenga temas asignados, entonces estos también se eliminarán</p>
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
    if (idModulo) {
      setSelectedModuloId(idModulo);
      setIsAddingModulo(false);
    } else {
      setSelectedModuloId(null);
      setIsAddingModulo(true);
    }
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
        <div className="relative flex-grow">
          <span className="absolute left-2 top-2 text-gray-400">
            <IoSearch size={22} />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre del módulo"
            className="border p-2 rounded-md w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-2 text-gray-500"
            >
              <IoClose size={24} />
            </button>
          )}
        </div>

        {/* Botón Agregar Módulo */}
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

      {/* Tabla de módulos */}
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
            {filteredModulos.length > 0 ? (
              filteredModulos.map((modulo) => (
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
                    <div className="flex justify-center gap-2">
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleOpenOffcanvas(modulo.id_modulo)}
                      >
                        <IoCreate size={22} />
                      </span>
                      <span
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteModulo(modulo.id_modulo)}
                      >
                        <IoTrash size={22} />
                      </span>
                    </div>
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