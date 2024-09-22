import { HeaderQuiz } from "@/components";
import { Preguntas } from "@/data/preguntas";
import { extractInfoFromSlug } from "@/utils/strings";
import {  ViewQuiz } from "../../../../components";

export default function TemaPage({ params }) {

  const { slugTema, page } = params;

  const { id, name } = extractInfoFromSlug(slugTema);
  const filteredPreguntas = Preguntas.filter((pregunta) => pregunta.subtemaId === id);

  return (
      <div className="relative">
        <HeaderQuiz titulo={name} IdFavoriteQuestion={filteredPreguntas.length > 0 ? filteredPreguntas[parseInt(page - 1)].id : null} />
        <ViewQuiz preguntas={filteredPreguntas} slugTema={slugTema} page={page}/>
      </div>

  );
}
