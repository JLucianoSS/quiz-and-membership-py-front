"use client";

import { useState } from "react";
export const FormAddTema = ({ modulos, onClose }) => {
  const [newTema, setNewTema] = useState({
    nombre: "",
    moduloId: "", // ID del modulo seleccionada
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
    console.log("Nuevo tema:", newTema);
    onClose(); // Cerrar el Offcanvas tras enviar el formulario
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Módulo</label>
        <select
          name="moduloId"
          className="w-full px-4 py-2 border rounded-md"
          value={newTema.moduloId}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona un módulo</option>
          {modulos.map((modulo) => (
            <option key={modulo.id_Modulo} value={modulo.id_Modulo}>
              {modulo.nombre_modulo}
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
