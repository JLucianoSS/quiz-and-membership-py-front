import { Headerpage } from "@/components";
import { preguntas } from "@/data/preguntas";
import { extractInfoFromSlug } from "@/utils/strings";




export default function TemaPage({params}) {

  const { id, name } = extractInfoFromSlug(params.slugTema);
  const filteredPreguntas = preguntas.filter(pregunta => pregunta.temaId === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44">
      <Headerpage titulo={name}/>

      <div>
        <h2 className="text-lg text-gray-700 font-semibold">Pregunta 1 / {filteredPreguntas.length}</h2>
        <p className="text-sm text-gray-500">
          {filteredPreguntas[0].pregunta}
        </p>
      </div>

    </div>
  );
}