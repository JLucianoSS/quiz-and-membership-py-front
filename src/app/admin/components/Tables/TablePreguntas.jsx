"use client";
import { useState } from "react";
import { deletePregunta } from "@/actions";
import { IoTrash, IoCreate } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { Offcanvas2 } from "@/components";
import { FormEditPregunta } from "..";

export const TablePreguntas = ({ preguntas, subtemas, opciones }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedPreguntaId, setSelectedPreguntaId] = useState(null);
  const { toggleRefreshTable } = useRedrawStore();

  const handleDeletePregunta = (idPregunta, e) => {
    e.stopPropagation(); // Previene que se abra el Offcanvas al eliminar
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

  const handleOpenOffcanvas = (idPregunta) => {
    setSelectedPreguntaId(idPregunta);
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedPreguntaId(null);
  };

  return (
    <div className="overflow-x-auto mt-4">
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
          {preguntas.length > 0 ? (
            preguntas.map((pregunta) => {
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
                No hay preguntas disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Offcanvas2
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title="Editar Pregunta"
      >
        <FormEditPregunta 
          subtemas={subtemas} 
          onClose={handleCloseOffcanvas} 
          preguntaId={selectedPreguntaId}
        />
      </Offcanvas2>
    </div>
  );
};