"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";
import { useEffect, useState } from "react";

// Función para obtener el progreso de una pregunta específica
const getQuestionProgress = (page, userId) => {
  try {
    const progress = JSON.parse(localStorage.getItem("quiz_progress"));
    if (progress && progress.userId === userId) {
      return progress.answers?.[page] || null;
    }
    return null;
  } catch {
    return null;
  }
};

export const ButtonsBackAndNext = ({
  preguntas,
  slugTema,
  page,
  user,
  isQuestionCompleted,
}) => {
  const router = useRouter();
  const [canNavigateNext, setCanNavigateNext] = useState(false);

  // Efecto para verificar si la pregunta actual está respondida
  useEffect(() => {
    const checkProgress = () => {
      const questionProgress = getQuestionProgress(page, user.id_user);
      setCanNavigateNext(questionProgress?.isAnswered || false);
    };

    // Verificar inicialmente
    checkProgress();

    // Configurar un observer para detectar cambios en localStorage
    const handleStorageChange = () => {
      checkProgress();
    };

    window.addEventListener("storage", handleStorageChange);
    // También verificamos cada segundo por si hay cambios internos
    const interval = setInterval(checkProgress, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [page, user.id_user]);

  const handleFinalizar = () => {
    router.push("/preguntas/final");
  };

  const handleSkip = () => {
    const nextPage = parseInt(page) + 1;
    if (nextPage <= preguntas.length) {
      router.push(`/preguntas/subtema/${slugTema}/p/${nextPage}`);
    }
  };

  return (
    <div className="fixed bg-white bottom-0 w-full h-[55px] flex items-center px-5 lg:px-20 xl:px-44 border-t">
      <div className="w-full flex justify-between">
        {/* Botón Saltar - si no existe, no ocupa espacio */}
        <div>
          {!isQuestionCompleted && parseInt(page) !== preguntas.length && (
            <button
              onClick={handleSkip}
              className="py-1 sm:py-2 sm:text-base px-7 rounded-md text-sm text-gray-600 bg-gray-100 hover:bg-gray-200"
            >
              Saltar
            </button>
          )}
        </div>

        {/* Botón Finalizar/Siguiente - siempre pegado a la derecha */}

          {parseInt(page) === preguntas.length ? (
            <button
              className={`py-1 sm:py-2 sm:text-base px-7 rounded-md text-sm text-white bg-primary ${
                !canNavigateNext && "pointer-events-none opacity-50"
              }`}
              onClick={handleFinalizar}
            >
              Finalizar
            </button>
          ) : (
            <Link
              href={`/preguntas/subtema/${slugTema}/p/${parseInt(page) + 1}`}
              className={`py-1 sm:py-2 sm:text-base px-7 rounded-md text-sm text-white bg-primary ${
                !canNavigateNext && "pointer-events-none opacity-50"
              }`}
            >
              <span className="flex gap-1 items-center">
                Siguiente <IoArrowForward />
              </span>
            </Link>
          )}

      </div>
    </div>
  );
};
