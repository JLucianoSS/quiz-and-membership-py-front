"use client";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { uploadFile } from "@/firebase/config";
import { CustomLoading } from "@/components";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import toast from "react-hot-toast";
import { createOpcion, createPregunta, getPreguntaById } from "@/actions";
import { IoCloseCircle } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const años = Array.from({length: currentYear - 2005}, (_, i) => (currentYear - i).toString());

export const FormEditPregunta = ({ subtemas = [], onClose, preguntaId }) => {
  const { toggleRefreshTable } = useRedrawStore();
  const [isLoading, setIsLoading] = useState(true);
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "opciones"
  });

  const [file, setFile] = useState(null);
  const [existingFile, setExistingFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const MAX_OPCIONES = 5;

  useEffect(() => {
    const fetchPreguntaData = async () => {
      setIsLoading(true);
      try {
        // Simular la obtención de datos
        // const data = await getPreguntaById(preguntaId);
        const data = {
          id_subtema: 1,
          texto_pregunta: "¿cual es el wey?",
          year: 2008,
          opciones: [
            {texto_opcion:"opcion1",es_correcta:false},
            {texto_opcion:"opcion2",es_correcta:true},
            {texto_opcion:"opcion3",es_correcta:false},
            {texto_opcion:"opcion4",es_correcta:false},
            {texto_opcion:"opcion5",es_correcta:false},
          ],
          explicacion_correcta: "esta es una explicaion para respuesta correcta",
          explicacion_incorrecta: "esta es una explicaion para respuesta incorrecta",
          imagen_video: "https://firebasestorage.googleapis.com/v0/b/anato-plus-c8829.appspot.com/o/multimedia%2F09fafb16-3a33-4a1c-aa88-4980ef768bcb?alt=media&token=ad4f59d8-c591-4f93-9656-7f2b7083a0c8"
        };

        reset({
          pregunta: data.texto_pregunta,
          subtemaId: data.id_subtema,
          año: data.year.toString(),
          opciones: data.opciones,
          explicacionCorrecta: data.explicacion_correcta,
          explicacionIncorrecta: data.explicacion_incorrecta,
        });

        if (data.imagen_video) {
          setExistingFile(data.imagen_video);
        }
      } catch (error) {
        console.error("Error al cargar los datos de la pregunta:", error);
        toast.error("No se pudieron cargar los datos de la pregunta");
      } finally {
        setIsLoading(false);
      }
    };

    if (preguntaId) {
      fetchPreguntaData();
    }
  }, [preguntaId, reset]);

  const onSubmit = async (data) => {
    setUploading(true);

    try {
      let multimediaUrl = existingFile;

      if (file) {
        const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mkv'];
        if (!validFileTypes.includes(file.type)) {
          toast.error("Tipo de archivo no válido");
          setUploading(false);
          return;
        }
        multimediaUrl = await uploadFile(file, "multimedia/");
      }

      // Aquí iría la lógica para actualizar la pregunta
      console.log("Datos actualizados:", { ...data, multimediaUrl });
      toast.success("Pregunta actualizada exitosamente (simulado)");
      toggleRefreshTable();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la pregunta");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setExistingFile(null);
    }
  };

  const handleRemoveExistingFile = () => {
    setExistingFile(null);
  };

  if (isLoading) {
    return <CustomLoading />;
  }

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
                {...register(`opciones.${index}.texto_opcion`, { required: "Este campo es obligatorio" })}
                placeholder="Texto de la opción"
                className="px-4 py-2 border rounded-md"
              />
              {errors.opciones?.[index]?.texto_opcion && (
                <span className="text-red-500 text-sm">{errors.opciones[index].texto_opcion.message}</span>
              )}
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  {...register(`opciones.${index}.es_correcta`)}
                />
                Correcta
              </label>
            </div>
          ))}
        </div>
        {fields.length < MAX_OPCIONES && (
          <button type="button" onClick={() => append({ texto_opcion: "", es_correcta: false })} className="text-blue-500 mt-2">
            + Añadir opción
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700">Explicación para opciones correctas</label>
          <textarea
            {...register("explicacionCorrecta", { required: "Este campo es obligatorio" })}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Ingresa la explicación para las respuestas correctas"
          ></textarea>
          {errors.explicacionCorrecta && <span className="text-red-500 text-sm">{errors.explicacionCorrecta.message}</span>}
        </div>

        <div className="flex-1">
          <label className="block text-gray-700">Explicación para opciones incorrectas</label>
          <textarea
            {...register("explicacionIncorrecta", { required: "Este campo es obligatorio" })}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Ingresa la explicación para las respuestas incorrectas"
          ></textarea>
          {errors.explicacionIncorrecta && <span className="text-red-500 text-sm">{errors.explicacionIncorrecta.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Video/imagen Explicativa</label>
        {existingFile ? (
          <div className="flex items-center mt-2 p-2 border rounded">
            <span className="mr-2">Multimedia:</span>
            <Link
              href={existingFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mr-2"
            >
              VER
            </Link>
            <button
              type="button"
              onClick={handleRemoveExistingFile}
              className="text-red-500"
            >
              <IoCloseCircle size={24} />
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif, video/mp4, video/quicktime, video/avi, video/mkv"
            onChange={handleFileChange}
            className="mt-1"
          />
        )}
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
      </div>
    </form>
  );
};