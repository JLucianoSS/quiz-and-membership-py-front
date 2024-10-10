"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomLoading } from "@/components";
import { createTema } from "@/actions"; // Asegúrate de tener la función que realiza la petición
import { FaBroom } from "react-icons/fa";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import toast from "react-hot-toast";

export const FormAddTema = ({ modulos, onClose }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createTema({
        nombre_tema: data.nombre,
        id_modulo: parseInt(data.moduloId) ,
      });
      if (result.success) {
        toast.success(result.message);
        reset(); // Limpiar el formulario después de una operación exitosa
        toggleRefreshTable(); // Disparar el cambio para redibujar la tabla
        onClose(); // Cerrar el Offcanvas tras enviar el formulario (opcional)
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrió un error al ingresar el tema");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset(); // Limpia los campos del formulario cuando el botón de reset es presionado
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700">Módulo</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          {...register("moduloId", { required: "Este campo es obligatorio" })}
        >
          <option value="">Selecciona un módulo</option>
          {modulos.map((modulo) => (
            <option key={modulo.id_modulo} value={modulo.id_modulo}>
              {modulo.nombre_modulo}
            </option>
          ))}
        </select>
        {errors.moduloId && (
          <span className="text-sm text-red-500">{errors.moduloId.message}</span>
        )}
      </div>

      <div>
        <label className="block text-gray-700">Nombre del tema</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ingresa el nombre del tema"
          {...register("nombre", { required: "Este campo es obligatorio" })}
        />
        {errors.nombre && (
          <span className="text-sm text-red-500">{errors.nombre.message}</span>
        )}
      </div>

      <div className="flex gap-2 items-center w-full">
        <button
          type="submit"
          className="max-w-[600px] w-full px-4 py-2 bg-primary text-white rounded-md"
          disabled={loading}
        >
          {loading ? <CustomLoading color="#ffffff" height={24} width={24}/> : "Guardar"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center p-2 bg-gray-500 text-white rounded-md"
        >
          <FaBroom className="w-6 h-6" /> {/* Icono de escoba para limpiar */}
        </button>
      </div>
    </form>
  );
};
