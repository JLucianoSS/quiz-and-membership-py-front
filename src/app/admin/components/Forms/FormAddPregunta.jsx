

"use client";
import { useState } from "react";

export const FormAddPregunta = ({ temas, onClose }) => {
  const [newPregunta, setNewPregunta] = useState({
    pregunta: "",
    temaId: "",
    año: new Date().getFullYear(),
    opciones: [{ textOpcion: "", esCorrecta: false, explicacion: "" }],
  });

  // Manejar el cambio en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPregunta({ ...newPregunta, [name]: value });
  };

  // Manejar el cambio en las opciones
  const handleOptionChange = (index, field, value) => {
    const updatedOpciones = [...newPregunta.opciones];
    updatedOpciones[index][field] = value;
    setNewPregunta({ ...newPregunta, opciones: updatedOpciones });
  };

  // Añadir una nueva opción
  const addOption = () => {
    setNewPregunta({
      ...newPregunta,
      opciones: [...newPregunta.opciones, { textOpcion: "", esCorrecta: false, explicacion: "" }],
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías el envío del formulario
    console.log("Nueva pregunta:", newPregunta);
    onClose(); // Cerrar el Offcanvas tras enviar el formulario
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700">Tema</label>
        <select
          name="temaId"
          className="w-full px-4 py-2 border rounded-md"
          value={newPregunta.temaId}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecciona un tema</option>
          {temas.map((tema) => (
            <option key={tema.id} value={tema.id}>
              {tema.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700">Pregunta</label>
        <input
          type="text"
          name="pregunta"
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Ingresa la pregunta"
          value={newPregunta.pregunta}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Año</label>
        <input
          type="number"
          name="año"
          className="w-full px-4 py-2 border rounded-md"
          value={newPregunta.año}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Opciones</label>
        {newPregunta.opciones.map((opcion, index) => (
          <div key={index} className="flex flex-col gap-2 mb-2">
            <input
              type="text"
              placeholder="Texto de la opción"
              className="px-4 py-2 border rounded-md"
              value={opcion.textOpcion}
              onChange={(e) => handleOptionChange(index, "textOpcion", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Explicación"
              className="px-4 py-2 border rounded-md"
              value={opcion.explicacion}
              onChange={(e) => handleOptionChange(index, "explicacion", e.target.value)}
              required
            />
            <label>
              <input
                type="checkbox"
                checked={opcion.esCorrecta}
                onChange={(e) => handleOptionChange(index, "esCorrecta", e.target.checked)}
              />
              Correcta
            </label>
          </div>
        ))}
        <button type="button" onClick={addOption} className="text-blue-500">
          + Añadir opción
        </button>
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
