"use client";
import { deleteSubTema } from "@/actions"; // Asume que tienes una acción para eliminar subtemas
import { IoTrash } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";

export const TableSubTemas = ({ subtemas, temas }) => {
  const { toggleRefreshTable } = useRedrawStore();

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
                  toggleRefreshTable(); // Refrescar la tabla
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

  return (
    <div className="overflow-x-auto mt-4">
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
          {subtemas.length > 0 ? (
            subtemas.map((subtema) => {
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
                No hay subtemas disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};