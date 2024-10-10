"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../../../firebase/config";
import { createModulo } from "@/actions";
import { CustomLoading } from "@/components";
import { FaBroom } from "react-icons/fa";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import toast from "react-hot-toast";

export const FormAddModulo = () => {
  const { toggleRefreshTable } = useRedrawStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data) => {
    setLoading(true);
    const file = data.file[0];

    // Validar si el archivo es una imagen
    if (file && !file.type.startsWith("image/")) {
      toast.error("Imagen inválida");
      setLoading(false);
      return; // Detener la ejecución si el archivo no es una imagen
    }

    try {
      const resultUploadFile = file ? await uploadFile(file, "/categories-modulos/") : ""; // guarda en esa carpeta de firestorage
      const result = await createModulo({
        nombre_modulo: data.nombre,
        imagen: resultUploadFile || ""
      });
      if (result.success) {
        toast.success(result.message);
        reset(); // Limpiar el formulario después de una operación exitosa
        toggleRefreshTable(); // Disparar el cambio para redibujar la tabla
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrió un error al ingresar el módulo");
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
        <label className="block text-gray-700">Nombre del módulo</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ingresa el nombre"
          {...register("nombre", { required: "Este campo es obligatorio" })}
        />
        {errors.nombre && <span className="text-sm text-red-500">{errors.nombre.message}</span>}
      </div>

      <div>
        <label className="block text-gray-700">Imagen</label>
        <input
          type="file"
          accept="image/*"  // Solo acepta archivos de imagen
          className="w-full px-4 py-2 border rounded-md"
          {...register("file")}
        />
        {errors.file && <span className="text-sm text-red-500">{errors.file.message}</span>}
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
