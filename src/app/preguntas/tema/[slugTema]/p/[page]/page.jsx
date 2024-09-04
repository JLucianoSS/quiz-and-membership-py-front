import { HeaderQuiz } from "@/components";
import { preguntas } from "@/data/preguntas";
import { extractInfoFromSlug } from "@/utils/strings";
import { PreguntaContainer } from "../../../../components";
import { IoArrowForward  } from "react-icons/io5"
import Link from "next/link";

export default function TemaPage({ params }) {

  const { slugTema, page } = params;

  const { id, name } = extractInfoFromSlug(slugTema);
  const filteredPreguntas = preguntas.filter((pregunta) => pregunta.temaId === id);

  return (
    <>
      {<div className="relative">
        <HeaderQuiz titulo={name} IdFavoriteQuestion={filteredPreguntas.length > 0 ? filteredPreguntas[parseInt(page - 1)].id : null} />
        <div className="pt-14 px-5 lg:px-20 xl:px-44">
          {filteredPreguntas.length > 0 ? (
            <PreguntaContainer preguntas={filteredPreguntas} page={page}/>
          ) : (
            <p className="flex justify-center text-sm items-center w-full h-[70vh]  text-gray-700">No hay preguntas establecidas para este tema.</p>
          )}
        </div>
        <div className="fixed bg-white bottom-0 w-full h-12  flex justify-between items-center px-5 lg:px-20 xl:px-44 border-t border-gray-100">
          <button className="py-1 px-7 rounded-md text-sm text-gray-600 bg-gray-100 hover:bg-gray-200">Saltar</button>
          <Link href={`/preguntas/tema/${slugTema}/p/${parseInt(page) + 1}`} className="py-1 px-7 rounded-md text-sm text-white bg-primary">
            { parseInt(page) === filteredPreguntas.length ? "Finalizar" :  <span className="flex gap-1 items-center">Siguiente <IoArrowForward/></span>}
          </Link>
        </div>
      </div>}
    </>
  );
}
