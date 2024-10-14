"use client";
import { useState } from "react";
import { deleteModulo, getModulos } from "@/actions"; // Suponiendo que tienes una acción para obtener los módulos
import { IoCreate, IoTrash } from "react-icons/io5";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import Image from "next/image";
import toast from "react-hot-toast";
import { Offcanvas2 } from "@/components";
import { FormEditModulo } from "..";

export const TableModulos = ({ modulos }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [selectedPreguntaId, setSelectedPreguntaId] = useState(null);
  const { toggleRefreshTable } = useRedrawStore();

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
                  toggleRefreshTable()
                } else {
                  toast.error(result.message, { id: t.id });
                }
              } catch (error) {
                toast.error("Error al eliminar el módulo: " + error.message, { id: t.id });
              }
              toast.dismiss(t.id); // Cierra el toast de confirmación
            }}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(t.id)} // Cierra el toast sin eliminar
          >
            Cancelar
          </button>
        </div>
      </div>
    ), {
      duration: 5000, // Duración del toast de confirmación
      position: "top-center", // Posición del toast
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
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Imagen</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          {modulos.length > 0 ? (
            modulos.map((modulo) => (
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
                No hay módulos disponibles
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
        <FormEditModulo 
          key={selectedPreguntaId} 
          onclose={handleCloseOffcanvas}
          moduleId={selectedPreguntaId}
        />
      </Offcanvas2>

    </div>
  );
};
