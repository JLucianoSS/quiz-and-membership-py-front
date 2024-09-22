"use client";
import { useState } from "react";
import { ManageEspecialidades, ManagePreguntas, ManageSubEspecialidades, ManageTemas } from "..";

export const ViewManageQuiz = ({ especialidades, subespecialidades, temas, preguntas, opciones }) => {
  const [activeSection, setActiveSection] = useState("especialidades"); // Estado para manejar qué sección está activa

  // Función para manejar el cambio de sección
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="">
      {/* Header con botones de filtro en grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
        <button
          className={`py-1 px-2 text-sm rounded ${activeSection === "especialidades" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleSectionChange("especialidades")}
        >
          {/* Especialidades */}
          Módulos
        </button>
        <button
          className={`py-1 px-2 text-sm rounded ${activeSection === "subespecialidades" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleSectionChange("subespecialidades")}
        >
          {/* Subespecialidades */}
          Temas
        </button>
        <button
          className={`py-1 px-2 text-sm rounded ${activeSection === "temas" ? "bg-primary text-white" : "bg-gray-200"}`}
          onClick={() => handleSectionChange("temas")}
        >
          {/* Temas */}
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
        {activeSection === "especialidades" && <ManageEspecialidades especialidades={especialidades} />}
        {activeSection === "subespecialidades" && (
          <ManageSubEspecialidades especialidades={especialidades} subespecialidades={subespecialidades} />
        )}
        {activeSection === "temas" && <ManageTemas subespecialidades={subespecialidades} temas={temas} />}
        {activeSection === "preguntas" && (
          <ManagePreguntas temas={temas} preguntas={preguntas} opciones={opciones} />
        )}
      </div>
    </div>
  );
};
