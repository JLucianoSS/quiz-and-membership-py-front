"use client";
import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { uploadFile } from "@/firebase/config";
import { CustomLoading } from "@/components";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { obtenerOpcionesFiltradas } from "@/utils/filterOptions";
import { getPreguntaById, updateOpcion, updatePregunta } from "@/actions";
import { IoCloseCircle } from "react-icons/io5";
import Link from "next/link";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const currentYear = new Date().getFullYear();
const años = Array.from({ length: currentYear - 2005 }, (_, i) => (currentYear - i).toString());

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
  const [pregunta, setPregunta] = useState({});

  const MAX_OPCIONES = 5;

  useEffect(() => {
    const fetchPreguntaData = async () => {
      setIsLoading(true);
      try {
        const { data } = await getPreguntaById(preguntaId);
        setPregunta(data);
        
        // Ordenar las opciones por id_opcion de menor a mayor
        const opcionesOrdenadas = [...data.opciones].sort((a, b) => a.id_opcion - b.id_opcion);
        
        // Transformar las opciones ordenadas al formato esperado por el formulario
        const opcionesFormateadas = opcionesOrdenadas.map(opcion => ({
          id_opcion: opcion.id_opcion,
          textOpcion: opcion.texto_opcion,
          esCorrecta: opcion.es_correcta
        }));

        reset({
          pregunta: data.texto_pregunta,
          subtemaId: data.id_subtema,
          año: data.year.toString(),
          opciones: opcionesFormateadas,
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

      const resultUpdatePregunta = await updatePregunta(preguntaId, {
        id_subtema: data.subtemaId,
        year: parseInt(data.año),
        texto_pregunta: data.pregunta,
        explicacion_correcta: data.explicacionCorrecta,
        explicacion_incorrecta: data.explicacionIncorrecta,
        imagen_video: multimediaUrl,
      });

      if (resultUpdatePregunta.success) {
        // Ordenar las opciones por id_opcion antes de actualizarlas
        const opcionesOrdenadas = [...data.opciones].sort((a, b) => a.id_opcion - b.id_opcion);
        
        // Actualizar cada opción en orden
        for (const opcion of opcionesOrdenadas) {
          const opcionData = {
            texto_opcion: opcion.textOpcion,
            es_correcta: opcion.esCorrecta
          };

          const resultUpdateOpcion = await updateOpcion(opcion.id_opcion, opcionData);

          if (!resultUpdateOpcion.success) {
            toast.error(`Error al actualizar la opción: ${resultUpdateOpcion.message}`);
            throw new Error("Error al actualizar una opción");
          }
        }

        toast.success("Pregunta actualizada exitosamente");
        toggleRefreshTable();
        onClose();
      } else {
        toast.error(resultUpdatePregunta.message);
      }
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

  const handleRemoveExistingFile = async () => {
    try {
      setIsLoading(true);
      const result = await updatePregunta(preguntaId, {
        imagen_video: "",
      });
      if (result.success) {
        setExistingFile(null);
        toast.success("Imagen eliminada exitosamente");
      } else {
        toast.error("Error al eliminar la imagen");
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      toast.error("Error al eliminar la imagen");
    } finally {
      setIsLoading(false);
    }
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

      {/* Sección de Opciones */}
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
              <input
                type="hidden"
                {...register(`opciones.${index}.id_opcion`)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-20 mb-16">
        <div className="flex-1">
          <label className="block text-gray-700">Explicación para opciones correctas</label>
          <Controller
            name="explicacionCorrecta"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ReactQuill
                {...field}
                value={field.value || ""}
                onChange={(content) => field.onChange(content)}
                placeholder="Ingresa la explicación para las respuestas correctas"
                style={{ height: "150px" }}
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
            render={({ field }) => (
              <ReactQuill
                {...field}
                value={field.value || ""}
                onChange={(content) => field.onChange(content)}
                placeholder="Ingresa la explicación para las respuestas incorrectas"
                style={{ height: "150px" }}
              />
            )}
          />
          {errors.explicacionIncorrecta && <span className="text-red-500 text-sm">{errors.explicacionIncorrecta.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Imagen Explicativa</label>
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
              disabled={isLoading}
            >
              {isLoading ? <CustomLoading color="#ff0000" height={24} width={24}/> : <IoCloseCircle size={24} />}
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