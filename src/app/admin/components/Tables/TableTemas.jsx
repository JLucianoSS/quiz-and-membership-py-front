"use client";
import { useState } from "react";
import { deleteTema } from "@/actions";
import { IoCreate, IoTrash } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { Offcanvas2 } from "@/components";
import { FormEditTema } from "..";

export const TableTemas = ({ temas, modulos }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedTemaId, setSelectedTemaId] = useState(null);

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

  const handleOpenOffcanvas = (idTema) => {
    setSelectedTemaId(idTema);
    setIsOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedTemaId(null);
  };

  return (
    <div className="overflow-x-auto mt-4">
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
          {temas.length > 0 ? (
            temas.map((tema) => {
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
                No hay temas disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Offcanvas2
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title="Editar Tema"
      >
        <FormEditTema
          key={selectedTemaId}
          temaId={selectedTemaId}
          modulos={modulos}
          onClose={handleCloseOffcanvas}
        />
      </Offcanvas2>
    </div>
  );
};