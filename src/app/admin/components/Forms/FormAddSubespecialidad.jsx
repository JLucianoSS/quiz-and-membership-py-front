"use client";

import { useState } from "react";
export const FormAddSubespecialidad = ({ especialidades, onClose }) => {
  const [newSubEspecialidad, setNewSubEspecialidad] = useState({
    nombre: "",
    especialidadId: "", // ID de la especialidad seleccionada
  });

  // Manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    setNewSubEspecialidad({
      ...newSubEspecialidad,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo tema:", newSubEspecialidad);
    onClose(); // Cerrar el Offcanvas tras enviar el formulario
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Módulo</label>
        <select
          name="especialidadId"
          className="w-full px-4 py-2 border rounded-md"
          value={newSubEspecialidad.especialidadId}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona un módulo</option>
          {especialidades.map((especialidad) => (
            <option key={especialidad.id} value={especialidad.id}>
              {especialidad.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">
          Nombre del tema
        </label>
        <input
          type="text"
          name="nombre"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ingresa el nombre"
          value={newSubEspecialidad.nombre}
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
