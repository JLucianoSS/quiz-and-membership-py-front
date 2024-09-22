"use client";
import { useState } from "react";

export const FormAddSubTema = ({ temas, onclose }) => {
  const [newSubTema, setNewSubTema] = useState({
    nombre: "",
    subtemaId: "",
  });

  // Manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    setNewSubTema({
      ...newSubTema,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías el envío del formulario
    console.log("Nuevo Subtema:", newSubTema);
    onclose();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Tema</label>
        <select
          name="subtemaId"
          className="w-full px-4 py-2 border rounded-md"
          value={newSubTema.subtemaId}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona un tema</option>
          {temas.map((tema) => (
            <option key={tema.id_Tema} value={tema.id_Tema}>
              {tema.Nombre_Tema}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Nombre del Subtema</label>
        <input
          type="text"
          name="nombre"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ingresa el nombre del tema"
          value={newSubTema.nombre}
          onChange={handleInputChange}
          required
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
