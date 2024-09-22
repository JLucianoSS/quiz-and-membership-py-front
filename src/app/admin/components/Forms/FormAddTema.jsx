"use client";
import { useState } from "react";

export const FormAddTema = ({ subespecialidades, onclose }) => {
  const [newTema, setNewTema] = useState({
    nombre: "",
    subespecialidadId: "",
  });

  // Manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    setNewTema({
      ...newTema,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías el envío del formulario
    console.log("Nuevo tema:", newTema);
    onclose();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Tema</label>
        <select
          name="subespecialidadId"
          className="w-full px-4 py-2 border rounded-md"
          value={newTema.subespecialidadId}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona un tema</option>
          {subespecialidades.map((subespecialidad) => (
            <option key={subespecialidad.id} value={subespecialidad.id}>
              {subespecialidad.nombre}
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
          value={newTema.nombre}
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
