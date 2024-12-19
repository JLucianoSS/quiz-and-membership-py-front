"use client";
import { useState, useEffect } from "react";
import { CommentsSection, ExplicationSection, RespuestaCard } from "..";
import { createResultado } from "@/actions";
import { usePathname } from "next/navigation";

// Utility functions for localStorage
const QUIZ_STORAGE_KEY = 'quiz_progress';

const saveQuizProgress = ({
  page,
  selectedOption,
  tachedOptions,
  isAnswered,
  showExplanation,
  userId,
  totalQuestions,
  currentUrl,
}) => {
  const existingProgress = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY) || '{}');
  
  const progress = {
    ...existingProgress,
    currentPage: page,
    answers: {
      ...existingProgress.answers,
      [page]: {
        selectedOption,
        tachedOptions,
        isAnswered,
        showExplanation
      }
    },
    userId,
    totalQuestions,
    lastUpdated: new Date().toISOString(),
    completed: isAnswered && parseInt(page) === totalQuestions,
    currentUrl
  };
  
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(progress));
};

const getQuizProgress = (page, userId) => {
  try {
    const progress = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY));
    if (progress && progress.userId === userId) {
      return progress.answers?.[page] || null;
    }
    return null;
  } catch {
    return null;
  }
};

export const PreguntaContainer = ({ preguntas, page, onComplete, onAnswer, user }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [tachedOptions, setTachedOptions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const currentPregunta = preguntas[parseInt(page - 1)];

  // Cargar progreso guardado cuando el componente se monta
  useEffect(() => {
    const savedProgress = getQuizProgress(page, user.id_user);
    if (savedProgress) {
      setSelectedOption(savedProgress.selectedOption);
      setTachedOptions(savedProgress.tachedOptions || []);
      setIsAnswered(savedProgress.isAnswered);
      setShowExplanation(savedProgress.showExplanation);
    }
  }, [page, user.id_user]);

  const handleSelectOption = (index) => {
    if (!isAnswered) {
      setSelectedOption(index);
      
      // Guardar progreso al seleccionar opción
      saveQuizProgress({
        page,
        selectedOption: index,
        tachedOptions,
        isAnswered: false,
        showExplanation: false,
        userId: user.id_user,
        totalQuestions: preguntas.length,
        currentUrl:pathname
      });
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
        });

        if(response.success){
          setShowExplanation(true);
          setIsAnswered(true);
          
          // Guardar progreso después de responder
          saveQuizProgress({
            page,
            selectedOption,
            tachedOptions,
            isAnswered: true,
            showExplanation: true,
            userId: user.id_user,
            totalQuestions: preguntas.length,
            currentUrl:pathname
          });
          
          onComplete();
          onAnswer(isCorrect);
        }
        
      } catch (error) {
        console.error("Error al crear el resultado:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleStrike = (index) => {
    if (!isAnswered) {
      let newTachedOptions;
      if (tachedOptions.includes(index)) {
        newTachedOptions = tachedOptions.filter((i) => i !== index);
      } else if (tachedOptions.length < currentPregunta.opciones.length - 1) {
        newTachedOptions = [...tachedOptions, index];
      } else {
        return;
      }
      
      setTachedOptions(newTachedOptions);
      
      // Guardar progreso al tachar opciones
      saveQuizProgress({
        page,
        selectedOption,
        tachedOptions: newTachedOptions,
        isAnswered,
        showExplanation,
        userId: user.id_user,
        totalQuestions: preguntas.length,
        currentUrl:pathname
      });
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
          {loading ? "Procesando..." : "Responder"}
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

      {showExplanation && (
        <div className="mt-6 mb-[100px]">
          <CommentsSection 
            user={user} 
            idPregunta={currentPregunta.id_pregunta}
          />
        </div>
      )}

      <div className="mb-[70px]"></div>
    </>
  );
};