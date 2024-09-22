import { HeaderQuiz } from "@/components";
import { Preguntas } from "@/data/preguntas";
import { extractInfoFromSlug } from "@/utils/strings";
import {  ViewQuiz } from "../../../../components";

export default function PreguntasSubTemaPage({ params }) {

  const { slugSubtema, page } = params;

  const { id, name } = extractInfoFromSlug(slugSubtema);
  const filteredPreguntas = Preguntas.filter((pregunta) => pregunta.subtemaId === id);

  return (
      <div className="relative">
        <HeaderQuiz titulo={name} IdFavoriteQuestion={filteredPreguntas.length > 0 ? filteredPreguntas[parseInt(page - 1)].id : null} />
        <ViewQuiz preguntas={filteredPreguntas} slugTema={slugSubtema} page={page}/>
      </div>

  );
}
