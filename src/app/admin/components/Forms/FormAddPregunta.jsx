"use client";
import { useState } from "react";
import { uploadFile } from "@/firebase/config"; // Importamos la función para subir archivos a Firebase

export const FormAddPregunta = ({ temas, onClose }) => {
  const [newPregunta, setNewPregunta] = useState({
    pregunta: "",
    temaId: "",
    año: new Date().getFullYear(),
    opciones: [{ textOpcion: "", esCorrecta: false }],
    explicacionCorrecta: "",
    explicacionIncorrecta: "",
    multimediaUrl: "" // Guardar la URL del archivo subido
  });
  const [file, setFile] = useState(null); // Estado para el archivo
  const [uploading, setUploading] = useState(false); // Estado para mostrar si está subiendo el archivo

  const MAX_OPCIONES = 5;

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

  // Añadir una nueva opción si no se ha alcanzado el máximo
  const addOption = () => {
    if (newPregunta.opciones.length < MAX_OPCIONES) {
      setNewPregunta({
        ...newPregunta,
        opciones: [...newPregunta.opciones, { textOpcion: "", esCorrecta: false }],
      });
    }
  };

  // Manejar el archivo seleccionado (imagen o video)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "video/mp4", "video/quicktime"];

    // Validar que el archivo sea una imagen o video
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Solo se permiten archivos de tipo imagen (.jpeg, .png) o video (.mp4, .mov)");
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    let multimediaUrl = "";
    
    if (file) {
      try {
        setUploading(true);
        multimediaUrl = await uploadFile(file, "multimedia/"); // Subir archivo a Firebase
        console.log("Archivo subido correctamente:", multimediaUrl);
      } catch (error) {
        console.error("Error al subir archivo:", error);
        return; // Si falla la subida, no continuar
      } finally {
        setUploading(false);
      }
    }

    // Simulación del envío del formulario completo, incluyendo la URL multimedia
    const formData = {
      ...newPregunta,
      multimediaUrl, // Añadir la URL del archivo subido
    };

    console.log("Datos del formulario:", formData);
    
    // Aquí cerrarías el formulario u otras acciones
    onClose(); // Cerrar el Offcanvas tras enviar el formulario
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      
      {/* Tema/Subtema y Año en una fila en pantallas grandes y en columna en pantallas pequeñas */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Tema/subtema */}
        <div className="flex-1">
          <label className="block text-gray-700">Tema/subtema</label>
          <select
            name="temaId"
            className="w-full px-4 py-2 border rounded-md"
            value={newPregunta.temaId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona</option>
            {temas.map((tema) => (
              <option key={tema.id_Subtema} value={tema.id_Subtema}>
                {tema.Subtema}
              </option>
            ))}
          </select>
        </div>

        {/* Año */}
        <div className="flex-1">
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
      </div>

      {/* Pregunta: ocupa todo el ancho */}
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

      {/* Opciones - Mostrarlas en una grid */}
      <div>
        <label className="block text-gray-700">Opciones (Máximo {MAX_OPCIONES})</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  checked={opcion.esCorrecta}
                  onChange={(e) => handleOptionChange(index, "esCorrecta", e.target.checked)}
                />
                Correcta
              </label>
            </div>
          ))}
        </div>
        {/* Deshabilitar botón si se ha alcanzado el máximo de opciones */}
        {newPregunta.opciones.length < MAX_OPCIONES && (
          <button type="button" onClick={addOption} className="text-blue-500 mt-2">
            + Añadir opción
          </button>
        )}
      </div>

      {/* Explicaciones para correctas e incorrectas - Mostrar en fila en pantallas grandes */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Explicación Correcta */}
        <div className="flex-1">
          <label className="block text-gray-700">Explicación para opciones correctas</label>
          <textarea
            name="explicacionCorrecta"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Ingresa la explicación para las respuestas correctas"
            value={newPregunta.explicacionCorrecta}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Explicación Incorrecta */}
        <div className="flex-1">
          <label className="block text-gray-700">Explicación para opciones incorrectas</label>
          <textarea
            name="explicacionIncorrecta"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Ingresa la explicación para las respuestas incorrectas"
            value={newPregunta.explicacionIncorrecta}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
      </div>

      {/* Botón para subir archivo multimedia */}
      <div>
        <label className="block text-gray-700">Video/imagen Explicativa (Opcional)</label>
        <input
          type="file"
          accept="image/jpeg, image/png, video/mp4, video/quicktime"
          onChange={handleFileChange}
        />
        {file && <p className="mt-2 text-gray-600">{file.name}</p>}
      </div>

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md"
        disabled={uploading} // Deshabilitar el botón mientras se sube el archivo
      >
        {uploading ? "Subiendo archivo..." : "Guardar"}
      </button>
    </form>
  );
};
