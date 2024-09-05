"use client";
import { useState } from "react";
import { ButtonsBackAndNext, PreguntaContainer } from "..";

export const ViewQuiz = ({ preguntas, page, slugTema }) => {
  const [isQuestionCompleted, setIsQuestionCompleted] = useState(false); // Estado para bloquear el botón "Siguiente"

  const handleQuestionCompletion = () => {
    setIsQuestionCompleted(true); // Marcar la pregunta como completada
  };

  return (
    <>
      <div className="pt-14 px-5 lg:px-20 xl:px-44">
        {preguntas.length > 0 ? (
          <PreguntaContainer
            preguntas={preguntas}
            page={page}
            onComplete={handleQuestionCompletion} // Pasar la función de finalización
          />
        ) : (
          <p className="flex justify-center text-sm items-center w-full h-[70vh]  text-gray-700">
            No hay preguntas establecidas para este tema.
          </p>
        )}
      </div>

      {/* BOTONES SALTAR Y SIGUIENTE */}
      <ButtonsBackAndNext
        preguntas={preguntas}
        page={page}
        slugTema={slugTema}
        isQuestionCompleted={isQuestionCompleted}
      />
    </>
  );
};
