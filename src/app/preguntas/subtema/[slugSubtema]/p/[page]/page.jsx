import { HeaderQuiz } from "@/components";
import {  ViewQuiz } from "../../../../components";
import { extractInfoFromSlug } from "@/utils/strings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getPreguntas, getUserById } from "@/actions";

export default async function PreguntasSubTemaPage({ params }) {

  const session = await getServerSession(authOptions);
  const user = await getUserById(session.user.id);

  const { slugSubtema, page } = params;

  const { id, name } = extractInfoFromSlug(slugSubtema);
  const { data } = await getPreguntas();
  const filteredPreguntas = data.filter((pregunta) => pregunta.id_subtema === id);

  return (
      <div className="relative">
        <HeaderQuiz 
          titulo={name} 
          IdFavoriteQuestion={filteredPreguntas.length > 0 ? filteredPreguntas[parseInt(page - 1)].id_pregunta : null} 
          user={user}
        />
        <ViewQuiz preguntas={filteredPreguntas} slugTema={slugSubtema} page={page}/>
      </div>

  );
}
