"use client";
import { useState, useEffect } from "react";
import { deletePregunta } from "@/actions";
import { IoTrash, IoCreate, IoSearch, IoClose, IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { Offcanvas2 } from "@/components";
import { FormEditPregunta, FormAddPregunta } from "..";

export const TablePreguntas = ({ preguntas: initialPreguntas, subtemas, opciones }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedPreguntaId, setSelectedPreguntaId] = useState(null);
  const [isAddingPregunta, setIsAddingPregunta] = useState(false);
  const [preguntas, setPreguntas] = useState(initialPreguntas);
  const [filteredPreguntas, setFilteredPreguntas] = useState(preguntas);
  const [searchTerm, setSearchTerm] = useState("");
  const [subtemaFilter, setSubtemaFilter] = useState("");

  useEffect(() => {
    filterAndSearchPreguntas();
  }, [searchTerm, subtemaFilter, preguntas]);

  const filterAndSearchPreguntas = () => {
    let updatedPreguntas = preguntas;

    if (subtemaFilter) {
      updatedPreguntas = updatedPreguntas.filter((pregunta) => pregunta.id_subtema === parseInt(subtemaFilter));
    }

    if (searchTerm) {
      updatedPreguntas = updatedPreguntas.filter(
        (pregunta) => pregunta.texto_pregunta.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPreguntas(updatedPreguntas);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleDeletePregunta = (idPregunta, e) => {
    e.stopPropagation();
    toast((t) => (
      <div className="flex flex-col items-center">
        <span>¿Estás seguro de eliminar la pregunta?</span>
        <p className="text-sm text-center text-gray-500">Esta acción eliminará la pregunta junto con sus alternativas u opciones.</p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={async () => {
              try {
                const result = await deletePregunta(idPregunta);
                if (result.success) {
                  toast.success(result.message, { id: t.id });
                  toggleRefreshTable();
                } else {
                  toast.error(result.message, { id: t.id });
                }
              } catch (error) {
                toast.error("Error al eliminar la pregunta: " + error.message, { id: t.id });
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

  const handleOpenOffcanvas = (idPregunta = null) => {
    if (idPregunta) {
      setSelectedPreguntaId(idPregunta);
      setIsAddingPregunta(false);
    } else {
      setSelectedPreguntaId(null);
      setIsAddingPregunta(true);
    }
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedPreguntaId(null);
    setIsAddingPregunta(false);
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
            placeholder="Buscar pregunta"
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

        {/* Botón Agregar Pregunta */}
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

      {/* Tabla de preguntas */}
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
            {filteredPreguntas.length > 0 ? (
              filteredPreguntas.map((pregunta) => {
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
                      <div className="flex justify-center gap-2">
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleOpenOffcanvas(pregunta.id_pregunta)}
                        >
                          <IoCreate size={22} />
                        </span>
                        <span
                          className="text-red-500 cursor-pointer"
                          onClick={(e) => handleDeletePregunta(pregunta.id_pregunta, e)}
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
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No se encontraron preguntas con los criterios seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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