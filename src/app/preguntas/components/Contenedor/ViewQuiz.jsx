"use client";
import { useState } from "react";
import { ButtonsBackAndNext, PreguntaContainer } from "..";

export const ViewQuiz = ({ preguntas, page, slugTema, user }) => {
  const [isQuestionCompleted, setIsQuestionCompleted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleQuestionCompletion = () => {
    setIsQuestionCompleted(true);
  };

  const handleAnswer = (isCorrect) => {
    setIsAnswered(true);
    // Aquí puedes agregar lógica adicional si es necesario
  };

  return (
    <>
      <div className="pt-14 px-5 lg:px-20 xl:px-44">
        {preguntas.length > 0 ? (
          <PreguntaContainer
            preguntas={preguntas}
            page={page}
            onComplete={handleQuestionCompletion}
            onAnswer={handleAnswer}
            user={user}
          />
        ) : (
          <p className="flex justify-center text-sm items-center w-full h-[70vh]  text-gray-700">
            No hay preguntas establecidas para este tema.
          </p>
        )}
      </div>

      <ButtonsBackAndNext
        preguntas={preguntas}
        page={page}
        slugTema={slugTema}
        isQuestionCompleted={isQuestionCompleted}
        isAnswered={isAnswered}
        user={user}
      />
    </>
  );
};