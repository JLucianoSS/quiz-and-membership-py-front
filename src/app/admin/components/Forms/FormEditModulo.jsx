"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uploadFile } from "../../../../firebase/config";
import { getModuloById, updateModulo } from "@/actions";
import { CustomLoading } from "@/components";
import { FaBroom, FaTimes } from "react-icons/fa";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import Link from "next/link";
import toast from "react-hot-toast";

export const FormEditModulo = ({ onclose, moduleId }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const watchFile = watch("file");

  const onSubmit = async (data) => {
    setUploading(true);
    const file = data.file[0];

    try {
      let imageUrl = currentImage;
      if (file) {
        if (!file.type.startsWith("image/")) {
          toast.error("Imagen inválida");
          setUploading(false);
          return;
        }
        imageUrl = await uploadFile(file, "/categories-modulos/");
      }

      const result = await updateModulo(moduleId, {
        nombre_modulo: data.nombre,
        imagen: imageUrl,
      });

      if (result.success) {
        toast.success(result.message);
        reset();
        toggleRefreshTable();
        onclose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrió un error al actualizar el módulo");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchModuleData = async () => {
      setLoading(true);
      try {
        const { data } = await getModuloById(moduleId);
        reset({
          nombre: data.nombre_modulo,
        });
        setCurrentImage(data.imagen || "");
      } catch (error) {
        console.error("Error al cargar los datos del módulo:", error);
        toast.error("No se pudieron cargar los datos del módulo");
      } finally {
        setLoading(false);
      }
    };

    if (moduleId) {
      fetchModuleData();
    }
  }, [moduleId, reset]);

  const handleReset = () => {
    reset();
    setCurrentImage("");
  };

  const handleRemoveImage = () => {
    setCurrentImage("");
    setValue("file", null);
  };

  if (loading) {
    return <CustomLoading />;
  }

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
        {errors.nombre && (
          <span className="text-sm text-red-500">{errors.nombre.message}</span>
        )}
      </div>

      <div>
        <label className="block text-gray-700">Imagen</label>
        {currentImage ? (
          <div className="flex items-center gap-2 mb-2">
            <Link href={currentImage} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Ver imagen actual
            </Link>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="p-1 bg-red-500 text-white rounded-full"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-2">No hay imagen establecida</p>
        )}
        <input
          type="file"
          accept="image/*"
          className="w-full px-4 py-2 border rounded-md"
          {...register("file")}
        />
        {errors.file && (<span className="text-sm text-red-500">{errors.file.message}</span>)}
      </div>

      <div className="flex gap-2 items-center w-full">
        <button
          type="submit"
          className="max-w-[600px] w-full px-4 py-2 bg-primary text-white rounded-md"
          disabled={uploading}
        >
          {uploading ? <CustomLoading color="#ffffff" height={24} width={24} /> : "Guardar"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center p-2 bg-gray-500 text-white rounded-md"
        >
          <FaBroom className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};