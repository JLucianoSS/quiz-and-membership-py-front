
"use client"
import { useState } from "react";
import { getOpcionesPorPregunta } from "@/data/preguntas";
import { ExplicationSection, RespuestaCard } from "..";

export const PreguntaContainer = ({ preguntas, page }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Almacenar la opción seleccionada
  const [showExplanation, setShowExplanation] = useState(false); // Mostrar la explicación
  const [disableClicks, setDisableClicks] = useState(false); // Desactivar clics después de la selección

  const options = getOpcionesPorPregunta(preguntas[parseInt(page - 1)].id);

  const handleSelectOption = (index, isCorrect) => {
    if (disableClicks) return; // No permitir más clics si ya se ha seleccionado una opción

    setSelectedOption(index); // Guardar la opción seleccionada
    setShowExplanation(true); // Mostrar la explicación después de seleccionar

    if (isCorrect) {
      setDisableClicks(true); // Si es correcta, desactivar los clics
    } else {
      // Si es incorrecta, mostrar la correcta y desactivar los clics
      setDisableClicks(true);
    }
  };

  return (
    <>
      {/* CUERPO DE LA PREGUNTA */}
      <div className="flex flex-col gap-0">
        <h2 className="text-lg text-gray-700 font-semibold">
          Pregunta {page} / {preguntas.length}
        </h2>
        <h3 className="text-[12px] text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam nam perspiciatis quis ad delectus.
        </h3>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {preguntas[parseInt(page - 1)].pregunta}
      </p>

      {/* OPCIONES, RESPUESTAS O ALTERNATIVAS */}
      <div className="flex flex-col gap-2 mt-6">
        {options.map((option, index) => (
          <RespuestaCard
            key={index}
            letter={String.fromCharCode(65 + index)} // Convertir index en letras A, B, C, D
            answer={option.textOpcion}
            isCorrect={option.esCorrecta}
            onClick={() => handleSelectOption(index, option.esCorrecta)} // Manejar la selección
            isSelected={selectedOption === index} // Respuesta seleccionada
            showCorrect={selectedOption !== null && option.esCorrecta} // Mostrar correcta después de selección
            disableClicks={disableClicks} // Desactivar los clics después de la selección
          />
        ))}
      </div>

      {/* EXPLICACIÓN */}
      {showExplanation && (
        <div className="mt-6">
          <ExplicationSection
            explication="Tempor reprehenderit eu fugiat consequat deserunt aute veniam magna adipisicing anim nulla adipisicing proident. Aute labore do consequat aliquip esse cupidatat reprehenderit ipsum laboris. Ad sunt qui labore nulla voluptate proident esse Lorem."
          />
        </div>
      )}

      <div className="mb-[70px]"></div>
    </>
  );
};
