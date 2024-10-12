import { HeaderQuiz } from "@/components";
import { Preguntas } from "@/data/preguntas";
import { extractInfoFromSlug } from "@/utils/strings";
import {  ViewQuiz } from "../../../../components";
import { getPreguntas } from "@/actions";

export default async function PreguntasSubTemaPage({ params }) {

  const { slugSubtema, page } = params;

  const { id, name } = extractInfoFromSlug(slugSubtema);
  const { data } = await getPreguntas();
  const filteredPreguntas = data.filter((pregunta) => pregunta.id_subtema === id);

  return (
      <div className="relative">
        <HeaderQuiz titulo={name} IdFavoriteQuestion={filteredPreguntas.length > 0 ? filteredPreguntas[parseInt(page - 1)].id_pregunta : null} />
        <ViewQuiz preguntas={filteredPreguntas} slugTema={slugSubtema} page={page}/>
      </div>

  );
}
