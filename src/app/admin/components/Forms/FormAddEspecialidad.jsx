



"use client";

export const FormAddEspecialidad = () => {

  return (
    <form className="flex flex-col gap-4">
      <div>
        <label className="block text-gray-700">Nombre de la Especialidad</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ingresa el nombre"
        />
      </div>
      <div>
        <label className="block text-gray-700">Imagen de la Especialidad</label>
        <input
          type="file"
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md"
      >
        Guardar
      </button>
    </form>
  );
};
