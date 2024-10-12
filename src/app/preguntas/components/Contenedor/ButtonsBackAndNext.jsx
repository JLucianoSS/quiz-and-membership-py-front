"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";

export const ButtonsBackAndNext = ({ preguntas, slugTema, isQuestionCompleted, isAnswered, page }) => {
  const router = useRouter();
  const handleFinalizar = () => {
    router.push("/inicio");
  };

  return (
    <div className="fixed bg-white bottom-0 w-full h-[55px] flex justify-between items-center px-5 lg:px-20 xl:px-44 border-t ">
      <button className="py-1 sm:py-2 sm:text-base px-7 rounded-md text-sm text-gray-600 bg-gray-100 hover:bg-gray-200">
        Saltar
      </button>

      {parseInt(page) === preguntas.length ? (
        <button
          className={`py-1 sm:py-2 sm:text-base px-7 rounded-md text-sm text-white bg-primary ${
            !isAnswered && "pointer-events-none opacity-50"
          }`}
          onClick={handleFinalizar}
        >
          Finalizar
        </button>
      ) : (
        <Link
          href={`/preguntas/subtema/${slugTema}/p/${parseInt(page) + 1}`}
          className={`py-1 sm:py-2 sm:text-base px-7 rounded-md text-sm text-white bg-primary ${
            !isAnswered && "pointer-events-none opacity-50"
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