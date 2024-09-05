"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";

export const ButtonsBackAndNext = ({ preguntas, slugTema, isQuestionCompleted, page }) => {
  const router = useRouter();
  const handleFinalizar = () => {
    router.push("/"); // Redirigir a una página cuando termine
  };

  return (
    <div className="fixed bg-white bottom-0 w-full h-12  flex justify-between items-center px-5 lg:px-20 xl:px-44 border-t border-gray-100">
      <button className="py-1 px-7 rounded-md text-sm text-gray-600 bg-gray-100 hover:bg-gray-200">
        Saltar
      </button>

      {parseInt(page) === preguntas.length ? (
        <button
          className="py-1 px-7 rounded-md text-sm text-white bg-primary"
          onClick={handleFinalizar}
        >
          Finalizar
        </button>
      ) : (
        <Link
          href={`/preguntas/tema/${slugTema}/p/${parseInt(page) + 1}`}
          className={`py-1 px-7 rounded-md text-sm text-white bg-primary ${
            !isQuestionCompleted && "pointer-events-none opacity-50"
          }`}
        >
          <span className="flex gap-1 items-center">
            Siguiente <IoArrowForward />
          </span>
        </Link>
      )}
    </div>
  );
};
