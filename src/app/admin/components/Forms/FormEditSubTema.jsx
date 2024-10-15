"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomLoading } from "@/components";
import { getSubtemaById, updateSubtema } from "@/actions";
import { FaBroom } from "react-icons/fa";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import toast from "react-hot-toast";

export const FormEditSubTema = ({ subTemaId, temas, onClose }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubTemaData = async () => {
      setLoading(true);
      try {
        const { data } = await getSubtemaById(subTemaId);
        reset({
          nombre: data.nombre_subtema,
          temaId: data.id_tema.toString(),
        });
      } catch (error) {
        console.error("Error al cargar los datos del subtema:", error);
        toast.error("No se pudieron cargar los datos del subtema");
      } finally {
        setLoading(false);
      }
    };
    if (subTemaId) {
      fetchSubTemaData();
    }
  }, [subTemaId, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await updateSubtema(subTemaId, {
        nombre_subtema: data.nombre,
        id_tema: parseInt(data.temaId),
      });
      if (result.success) {
        toast.success(result.message);
        reset();
        toggleRefreshTable();
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al actualizar el subtema");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700">Tema al que pertenece</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          {...register("temaId", { required: "Este campo es obligatorio" })}
        >
          <option value="">Selecciona un tema</option>
          {temas.map((tema) => (
            <option key={tema.id_tema} value={tema.id_tema}>
              {tema.nombre_tema}
            </option>
          ))}
        </select>
        {errors.temaId && (
          <span className="text-sm text-red-500">{errors.temaId.message}</span>
        )}
      </div>

      <div>
        <label className="block text-gray-700">Nombre del Subtema</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ingresa el nombre del subtema"
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
          <FaBroom className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};