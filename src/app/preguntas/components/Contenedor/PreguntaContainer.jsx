"use client";
import { useState } from "react";
import { ExplicationSection, RespuestaCard } from "..";
import { createResultado } from "@/actions";

export const PreguntaContainer = ({ preguntas, page, onComplete, onAnswer, user }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [tachedOptions, setTachedOptions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentPregunta = preguntas[parseInt(page - 1)];

  const handleSelectOption = (index) => {
    if (!isAnswered) {
      setSelectedOption(index);
    }
  };

  const handleAnswer = async() => {
    if (selectedOption !== null && !isAnswered) {
      const isCorrect = currentPregunta.opciones[selectedOption].es_correcta;
     
      try {
        setLoading(true);
        const response = await createResultado({
          id_user: user.id_user,
          id_pregunta: currentPregunta.opciones[selectedOption].id_pregunta,
          respuesta_dada: currentPregunta.opciones[selectedOption].texto_opcion,
          es_correcta: isCorrect,
          fecha_respuesta: new Date().toISOString().slice(0, 19) 
        })

        /* Si todo salio correcto en la consulta desbloquea él paso a la siguiente pregunta */
        if(response.success){
          setShowExplanation(true);
          setIsAnswered(true);
          onComplete();
          onAnswer(isCorrect);
        }
        // console.log({
        //   id_user: user.id_user,
        //   id_pregunta: currentPregunta.opciones[selectedOption].id_pregunta,
        //   respuesta_dada: currentPregunta.opciones[selectedOption].texto_opcion,
        //   es_correcta: isCorrect,
        //   fecha_respuesta: new Date().toISOString().slice(0, 19) 
        // });
        
      } catch (error) {
        console.error("Error al crear el resulta:", error);
      }finally{
        setLoading(false);
      }

      // console.log(`Opción seleccionada: ${currentPregunta.opciones[selectedOption].texto_opcion}`);
      // console.log(`¿Es correcta?: ${isCorrect ? 'Sí' : 'No'}`);
      // console.log(`Explicación: ${currentPregunta.explicacion_correcta}`);
    }
  };

  const handleToggleStrike = (index) => {
    if (!isAnswered) {
      if (tachedOptions.includes(index)) {
        setTachedOptions(tachedOptions.filter((i) => i !== index));
      } else if (tachedOptions.length < currentPregunta.opciones.length - 1) {
        setTachedOptions([...tachedOptions, index]);
      }
    }
  };

  const selectedExplanation = selectedOption !== null && currentPregunta.opciones[selectedOption].es_correcta
    ? currentPregunta.explicacion_correcta
    : currentPregunta.explicacion_incorrecta;

  return (
    <>
      <div className="flex flex-col gap-0">
        <h2 className="text-lg sm:text-xl text-gray-700 font-semibold">
          Pregunta {page} / {preguntas.length}
        </h2>
        <h3 className="text-[12px] text-gray-400 sm:text-[15px]">
          {currentPregunta.year}
        </h3>
      </div>
      <p className="text-sm text-gray-700 mt-2 sm:text-lg">
        {currentPregunta.texto_pregunta}
      </p>

      <div className="flex flex-col gap-2 mt-6">
        {currentPregunta.opciones && currentPregunta.opciones.length > 0 ? 
          currentPregunta.opciones.map((option, index) => (
          <RespuestaCard
            key={index}
            letter={String.fromCharCode(65 + index)}
            answer={option.texto_opcion}
            isCorrect={option.es_correcta}
            onClick={() => handleSelectOption(index)}
            isSelected={selectedOption === index}
            showCorrect={isAnswered && option.es_correcta}
            disableClicks={isAnswered}
            isStriked={tachedOptions.includes(index)}
            onToggleStrike={() => handleToggleStrike(index)}
            disableStrike={tachedOptions.length === currentPregunta.opciones.length - 1 && !tachedOptions.includes(index)}
            isAnswered={isAnswered}
          />
        )) : <div className="w-full flex items-center justify-center h-[150px]"><span className="text-[13px] text-red-400">No hay opciones o alternativas establecidas</span></div>}
      </div>

      {!isAnswered && selectedOption !== null && (
        <button 
          onClick={handleAnswer}
          className="mt-4 py-2 px-4 bg-primary text-white rounded-md"
          disabled={loading}
        >
          Responder
        </button>
      )}

      {showExplanation && (
        <div className="mt-6">
          <ExplicationSection
            explication={selectedExplanation}
            videoOrImage={currentPregunta.imagen_video}
            isCorrect={currentPregunta.opciones[selectedOption].es_correcta}
          />
        </div>
      )}

      <div className="mb-[70px]"></div>
    </>
  );
};