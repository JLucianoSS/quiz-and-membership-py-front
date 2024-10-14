"use client";
import { useState, useEffect } from "react";
import { deleteTema } from "@/actions";
import { IoCreate, IoTrash, IoSearch, IoClose, IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { Offcanvas2 } from "@/components";
import { FormEditTema, FormAddTema } from "..";

export const TableTemas = ({ temas, modulos }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedTemaId, setSelectedTemaId] = useState(null);
  const [isAddingTema, setIsAddingTema] = useState(false);
  const [filteredTemas, setFilteredTemas] = useState(temas);
  const [searchTerm, setSearchTerm] = useState("");
  const [moduloFilter, setModuloFilter] = useState("");

  useEffect(() => {
    filterAndSearchTemas();
  }, [searchTerm, moduloFilter, temas]);

  const filterAndSearchTemas = () => {
    let updatedTemas = temas;

    if (moduloFilter) {
      updatedTemas = updatedTemas.filter((tema) => tema.id_modulo === parseInt(moduloFilter));
    }

    if (searchTerm) {
      updatedTemas = updatedTemas.filter(
        (tema) => tema.nombre_tema.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTemas(updatedTemas);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleDeleteTema = (idTema) => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <span>¿Estás seguro de eliminar el tema?</span>
        <p className="text-sm text-center text-gray-500">Es posible que tenga preguntas o subtemas asignados, entonces estos también se eliminarán</p>
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
    if (idTema) {
      setSelectedTemaId(idTema);
      setIsAddingTema(false);
    } else {
      setSelectedTemaId(null);
      setIsAddingTema(true);
    }
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
        <div className="relative flex-grow">
          <span className="absolute left-2 top-2 text-gray-400">
            <IoSearch size={22} />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre del tema"
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

        {/* Botón Agregar Tema */}
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

      {/* Tabla de temas */}
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
            {filteredTemas.length > 0 ? (
              filteredTemas.map((tema) => {
                const modulo = modulos.find((mod) => mod.id_modulo === tema.id_modulo);
                return (
                  <tr key={tema.id_tema} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{tema.id_tema}</td>
                    <td className="border border-gray-300 px-4 py-2">{tema.nombre_tema}</td>
                    <td className="border border-gray-300 px-4 py-2">{modulo ? modulo.nombre_modulo : "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleOpenOffcanvas(tema.id_tema)}
                        >
                          <IoCreate size={22} />
                        </span>
                        <span
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDeleteTema(tema.id_tema)}
                        >
                          <IoTrash size={22} />
                        </span>
                      </div>
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