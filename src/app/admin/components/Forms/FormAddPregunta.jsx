"use client";
import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { uploadFile } from "@/firebase/config";
import { CustomLoading } from "@/components";
import { FaBroom } from "react-icons/fa";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import toast from "react-hot-toast";
import { createOpcion, createPregunta } from "@/actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilos de React Quill

const currentYear = new Date().getFullYear();
const años = Array.from({ length: currentYear - 2005 }, (_, i) => (currentYear - i).toString());

export const FormAddPregunta = ({ subtemas, onClose }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      pregunta: "",
      subtemaId: "",
      año: currentYear.toString(),
      opciones: [{ textOpcion: "", esCorrecta: false }],
      explicacionCorrecta: "",
      explicacionIncorrecta: "",
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "opciones"
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const MAX_OPCIONES = 5;

  const onSubmit = async (data) => {
    setUploading(true);

    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mkv'];
    if (file && !validFileTypes.includes(file.type)) {
      toast.error("Solo se permiten archivos de imagen o video (JPEG, PNG, GIF, MP4, AVI, MKV)");
      setUploading(false);
      return;
    }
    try {
      const multimediaUrl = file ? await uploadFile(file, "multimedia/") : "";
      console.log("Datos del formulario:", { ...data, multimediaUrl });

      const resultcreatePregunta = await createPregunta({
        id_subtema: data.subtemaId,
        year: parseInt(data.año),
        texto_pregunta: data.pregunta,
        explicacion_correcta: data.explicacionCorrecta,
        explicacion_incorrecta: data.explicacionIncorrecta,
        imagen_video: multimediaUrl,
      });

      if (resultcreatePregunta.success) {
        for (const opcion of data.opciones) {
          const resultcreateOpcion = await createOpcion({
            id_pregunta: resultcreatePregunta.data.id_pregunta,
            texto_opcion: opcion.textOpcion,
            es_correcta: opcion.esCorrecta,
          });

          if (!resultcreateOpcion.success) {
            toast.error(`Error al agregar la opción: ${resultcreateOpcion.message}`);
            break;
          }
        }
        toast.success(resultcreatePregunta.message);
        reset();
        setFile(null);
        toggleRefreshTable();
        onClose();
      } else {
        toast.error(resultcreatePregunta.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar la pregunta");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "video/mp4", "video/quicktime"];

    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      toast.error("Solo se permiten archivos de tipo imagen (.jpeg, .png) o video (.mp4, .mov)");
    }
  };

  const handleReset = () => {
    reset();
    setFile(null);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700">Subtema</label>
          <select
            {...register("subtemaId", { required: "Este campo es obligatorio" })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Selecciona un subtema</option>
            {subtemas.map((subtema) => (
              <option key={subtema.id_subtema} value={subtema.id_subtema}>
                {subtema.nombre_subtema}
              </option>
            ))}
          </select>
          {errors.subtemaId && <span className="text-red-500 text-sm">{errors.subtemaId.message}</span>}
        </div>

        <div className="flex-1">
          <label className="block text-gray-700">Año</label>
          <select
            {...register("año", { required: "Este campo es obligatorio" })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Selecciona el año</option>
            {años.map((año) => (
              <option key={año} value={año}>
                {año}
              </option>
            ))}
          </select>
          {errors.año && <span className="text-red-500 text-sm">{errors.año.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Pregunta</label>
        <input
          type="text"
          {...register("pregunta", { required: "Este campo es obligatorio" })}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ingresa la pregunta"
        />
        {errors.pregunta && <span className="text-red-500 text-sm">{errors.pregunta.message}</span>}
      </div>

      <div>
        <label className="block text-gray-700">Opciones (Máximo {MAX_OPCIONES})</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2 mb-2">
              <input
                {...register(`opciones.${index}.textOpcion`, { required: "Este campo es obligatorio" })}
                placeholder="Texto de la opción"
                className="px-4 py-2 border rounded-md"
              />
              {errors.opciones?.[index]?.textOpcion && (
                <span className="text-red-500 text-sm">{errors.opciones[index].textOpcion.message}</span>
              )}
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  {...register(`opciones.${index}.esCorrecta`)}
                />
                Correcta
              </label>
            </div>
          ))}
        </div>
        {fields.length < MAX_OPCIONES && (
          <button type="button" onClick={() => append({ textOpcion: "", esCorrecta: false })} className="text-blue-500 mt-2">
            + Añadir opción
          </button>
        )}
      </div>

      <div className="flex flex-col gap-20 mb-16">
        <div className="flex-1">
          <label className="block text-gray-700">Explicación para opciones correctas</label>
          <Controller
            name="explicacionCorrecta"
            control={control}
            defaultValue=""
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                onChange={(content) => field.onChange(content)}
                placeholder="Ingresa la explicación para las respuestas correctas"
                style={{ height: "300px" }} // Aumenta la altura del editor
              />
            )}
          />
          {errors.explicacionCorrecta && <span className="text-red-500 text-sm">{errors.explicacionCorrecta.message}</span>}
        </div>

        <div className="flex-1">
          <label className="block text-gray-700">Explicación para opciones incorrectas</label>
          <Controller
            name="explicacionIncorrecta"
            control={control}
            defaultValue=""
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field }) => (
              <ReactQuill
                {...field}
                onChange={(content) => field.onChange(content)}
                placeholder="Ingresa la explicación para las respuestas incorrectas"
                style={{ height: "300px" }} // Aumenta la altura del editor
              />
            )}
          />
          {errors.explicacionIncorrecta && <span className="text-red-500 text-sm">{errors.explicacionIncorrecta.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Imagen Explicativa (Opcional)</label>
        <input
          type="file"
          accept="image/jpeg, image/png, image/gif, video/mp4, video/quicktime, video/avi, video/mkv"
          onChange={handleFileChange}
        />
        {file && <p className="mt-2 text-gray-600">{file.name}</p>}
      </div>

      <div className="flex gap-2 items-center w-full">
        <button
          type="submit"
          className="max-w-[600px] w-full px-4 py-2 bg-primary text-white rounded-md"
          disabled={uploading}
        >
          {uploading ? <CustomLoading color="#ffffff" height={24} width={24}/> : "Guardar"}
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
