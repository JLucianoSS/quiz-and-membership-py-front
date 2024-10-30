

// components/preguntas/TableActions.js
"use client";
import { IoTrash, IoCreate } from "react-icons/io5";
import toast from "react-hot-toast";

/**
 * Componente para las acciones de la tabla (editar, eliminar)
 * @param {Object} props - Propiedades del componente
 * @param {number} props.id - ID del item
 * @param {function} props.onEdit - Función para editar
 * @param {function} props.onDelete - Función para eliminar
 * @param {string} props.itemName - Nombre del item para el mensaje de confirmación
 */
export const TableActionsAdmin = ({ id, onEdit, onDelete, itemName = "pregunta" }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    toast((t) => (
      <div className="flex flex-col items-center">
        <span>¿Estás seguro de eliminar {itemName}?</span>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={() => {
              onDelete(id);
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
    <div className="flex justify-center gap-2">
      <span
        className="text-blue-500 cursor-pointer"
        onClick={() => onEdit(id)}
      >
        <IoCreate size={22} />
      </span>
      <span
        className="text-red-500 cursor-pointer"
        onClick={handleDelete}
      >
        <IoTrash size={22} />
      </span>
    </div>
  );
};