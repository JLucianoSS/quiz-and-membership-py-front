"use client";
import { useState } from "react";
import { getOpcionesPorPregunta } from "@/data/preguntas";
import { ExplicationSection, RespuestaCard } from "..";

export const PreguntaContainer = ({ preguntas, page, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Opción seleccionada
  const [showExplanation, setShowExplanation] = useState(false); // Mostrar explicación
  const [disableClicks, setDisableClicks] = useState(false); // Desactivar clics después de la selección
  const [tachedOptions, setTachedOptions] = useState([]); // Opciones tachadas
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null); // Estado para capturar si es correcta

  const currentPregunta = preguntas[parseInt(page - 1)];
  const { opciones, explicacionCorrecta, explicacionIncorrecta,videoURL } = getOpcionesPorPregunta(currentPregunta.id);

  const handleSelectOption = (index, isCorrect) => {
    if (disableClicks) return; // No permitir más clics si ya se ha seleccionado una opción
    setSelectedOption(index); // Guardar la opción seleccionada
    setIsCorrectAnswer(isCorrect); // Guardar si la opción seleccionada es correcta
    setShowExplanation(true); // Mostrar la explicación después de seleccionar
    onComplete();
    setDisableClicks(true); // Desactivar los clics después de la selección

    // Consologuear la opción seleccionada y su estado de corrección
    console.log(`Opción seleccionada: ${opciones[index].textOpcion}`);
    console.log(`¿Es correcta?: ${isCorrect ? 'Sí' : 'No'}`);
    console.log(`Explicación: ${opciones[index].explicacionCorrecta}`);
  };

  // Manejar el tachado o destachado de una opción
  const handleToggleStrike = (index) => {
    // Si la opción ya está tachada, destacharla
    if (tachedOptions.includes(index)) {
      setTachedOptions(tachedOptions.filter((i) => i !== index));
    } else if (tachedOptions.length < opciones.length - 1) {
      // Solo permitir tachar si hay más de una opción sin tachar
      setTachedOptions([...tachedOptions, index]);
    }
  };

  const selectedExplanation = selectedOption !== null && opciones[selectedOption].esCorrecta
    ? explicacionCorrecta
    : explicacionIncorrecta;


  return (
    <>
      {/* CUERPO DE LA PREGUNTA */}
      <div className="flex flex-col gap-0">
        <h2 className="text-lg sm:text-xl text-gray-700 font-semibold">
          Pregunta {page} / {preguntas.length}
        </h2>
        <h3 className="text-[12px] text-gray-400 sm:text-[15px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam nam perspiciatis quis ad delectus.
        </h3>
      </div>
      <p className="text-sm text-gray-700 mt-2 sm:text-lg">
        {currentPregunta.pregunta}
      </p>

      {/* OPCIONES, RESPUESTAS O ALTERNATIVAS */}
      <div className="flex flex-col gap-2 mt-6">
        {opciones && opciones.length > 0 ? opciones.map((option, index) => (
          <RespuestaCard
            key={index}
            letter={String.fromCharCode(65 + index)} // Convertir index en letras A, B, C, D
            answer={option.textOpcion}
            isCorrect={option.esCorrecta}
            onClick={() => handleSelectOption(index, option.esCorrecta)} // Manejar la selección
            isSelected={selectedOption === index} // Respuesta seleccionada
            showCorrect={selectedOption !== null && option.esCorrecta} // Mostrar correcta después de selección
            disableClicks={disableClicks} // Desactivar los clics después de la selección
            isStriked={tachedOptions.includes(index)} // Ver si la opción está tachada
            onToggleStrike={() => handleToggleStrike(index)} // Manejar el tachado
            disableStrike={tachedOptions.length === opciones.length - 1 && !tachedOptions.includes(index)} // Deshabilitar el tachado si ya solo queda una opción sin tachar
          />
        )) : <div className="w-full flex items-center justify-center h-[150px]"><span className="text-[13px] text-red-400">No hay opciones o alternativas establecidas</span></div>}
      </div>

      {/* EXPLICACIÓN */}
      {showExplanation && (
        <div className="mt-6">
          <ExplicationSection
            explication={selectedExplanation} // Mostrar explicación correcta o incorrecta
            videoURL={videoURL} // Pasar el video URL
            isCorrect={isCorrectAnswer} // Pasar si la respuesta fue correcta o incorrecta
          />
        </div>
      )}

      <div className="mb-[70px]"></div>
    </>
  );
};
