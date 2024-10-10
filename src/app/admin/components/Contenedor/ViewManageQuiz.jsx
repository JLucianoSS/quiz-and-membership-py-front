"use client";
import { useState } from "react";
import { ManageModulos, ManagePreguntas, ManageTemas, ManageSubtemas } from "..";

export const ViewManageQuiz = ({ modulos, temas, subtemas, preguntas, opciones }) => {
  const [activeSection, setActiveSection] = useState("modulos"); // Estado para manejar qué sección está activa

  // Función para manejar el cambio de sección
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="">
      {/* Header con botones de filtro en grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
        <button
          className={`py-1 px-2 text-sm rounded ${activeSection === "modulos" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleSectionChange("modulos")}
        >
          Módulos
        </button>
        <button
          className={`py-1 px-2 text-sm rounded ${activeSection === "temas" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleSectionChange("temas")}
        >
          Temas
        </button>
        <button
          className={`py-1 px-2 text-sm rounded ${activeSection === "subtemas" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleSectionChange("subtemas")}
        >
          Subtemas
        </button>
        <button
          className={`py-1 px-2 text-sm rounded ${activeSection === "preguntas" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleSectionChange("preguntas")}
        >
          Preguntas
        </button>
      </div>

      {/* Renderizar la sección activa */}
      <div>
        {activeSection === "modulos" && <ManageModulos />}
        {activeSection === "temas" && <ManageTemas />}
        {activeSection === "subtemas" && <ManageSubtemas />}
        {activeSection === "preguntas" && <ManagePreguntas subtemas={subtemas} preguntas={preguntas} opciones={opciones} />}
      </div>
    </div>
  );
};
