"use client"
import { useForm } from "react-hook-form";
import { uploadFile } from "../../../../firebase/config";

export const FormAddEspecialidad = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async(data) => {
    if (data.file[0]) {
      try {
        const resultUploadFile = await uploadFile(data.file[0], "/categories-modulos/"); // guarda en esa carpeta de firestorage
        console.log(resultUploadFile);
      } catch (error) {
        console.log(error);
      }
      
    }
    // Add any other logic to handle form data here
    console.log("Form Data:", data);
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
          className="w-full px-4 py-2 border rounded-md"
          {...register("file", { required: "Por favor, sube una imagen" })}
        />
        {errors.file && <span className="text-sm text-red-500">{errors.file.message}</span>}
      </div>

      <button
        type="submit"
        className="max-w-[400px] px-4 py-2 bg-primary text-white rounded-md"
      >
        Guardar
      </button>
    </form>
  );
};
