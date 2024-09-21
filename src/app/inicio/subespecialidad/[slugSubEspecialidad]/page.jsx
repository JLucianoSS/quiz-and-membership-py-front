import { Headerpage } from "@/components";
import { extractInfoFromSlug } from "@/utils/strings";
import { TemasGrid } from "../../components";
import { temas } from "@/data/temas";


export default function SubEspecialidadPage({ params }) {

  const { id, name } = extractInfoFromSlug(params.slugSubEspecialidad);
  const filteredTemas = temas.filter(tema => tema.subespecialidadId === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44">
      <Headerpage titulo={name + ` - Escoge un subtema`}/>
      <TemasGrid temas={filteredTemas}/>
    </div>
  );
}