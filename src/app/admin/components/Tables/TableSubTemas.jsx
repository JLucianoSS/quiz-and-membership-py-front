"use client";
import { useState, useEffect } from "react";
import { deleteSubTema } from "@/actions";
import { IoCreate, IoTrash, IoSearch, IoClose, IoAddCircle } from "react-icons/io5";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { Offcanvas2 } from "@/components";
import { FormEditSubTema, FormAddSubTema } from "..";
import toast from "react-hot-toast";

export const TableSubTemas = ({ subtemas, temas }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedSubTemaId, setSelectedSubTemaId] = useState(null);
  const [isAddingSubTema, setIsAddingSubTema] = useState(false);
  const [filteredSubtemas, setFilteredSubtemas] = useState(subtemas);
  const [searchTerm, setSearchTerm] = useState("");
  const [temaFilter, setTemaFilter] = useState("");

  useEffect(() => {
    filterAndSearchSubtemas();
  }, [searchTerm, temaFilter, subtemas]);

  const filterAndSearchSubtemas = () => {
    let updatedSubtemas = subtemas;

    if (temaFilter) {
      updatedSubtemas = updatedSubtemas.filter((subtema) => subtema.id_tema === parseInt(temaFilter));
    }

    if (searchTerm) {
      updatedSubtemas = updatedSubtemas.filter(
        (subtema) => subtema.nombre_subtema.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubtemas(updatedSubtemas);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleDeleteSubTema = (idSubTema) => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <span>¿Estás seguro de eliminar el subtema?</span>
        <p className="text-sm text-center text-gray-500">Es posible que tenga preguntas asignadas, entonces estas también se eliminarán</p>
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
    if (idSubTema) {
      setSelectedSubTemaId(idSubTema);
      setIsAddingSubTema(false);
    } else {
      setSelectedSubTemaId(null);
      setIsAddingSubTema(true);
    }
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
        <div className="relative flex-grow">
          <span className="absolute left-2 top-2 text-gray-400">
            <IoSearch size={22} />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre del subtema"
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
            {filteredSubtemas.length > 0 ? (
              filteredSubtemas.map((subtema) => {
                const tema = temas.find((tem) => tem.id_tema === subtema.id_tema);
                return (
                  <tr key={subtema.id_subtema} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{subtema.id_subtema}</td>
                    <td className="border border-gray-300 px-4 py-2">{subtema.nombre_subtema}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {tema ? tema.nombre_tema : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleOpenOffcanvas(subtema.id_subtema)}
                        >
                          <IoCreate size={22} />
                        </span>
                        <span
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDeleteSubTema(subtema.id_subtema)}
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
                  No se encontraron subtemas con los criterios seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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