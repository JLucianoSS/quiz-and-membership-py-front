import { Headerpage } from "@/components";
import { extractInfoFromSlug } from "@/utils/strings";
import { TemasGrid } from "../../components";
import { Subtemas } from "@/data/subtemas";


export default function SubEspecialidadPage({ params }) {

  const { id, name } = extractInfoFromSlug(params.slugSubEspecialidad);
  const filteredSubTemas = Subtemas.filter(subtema => subtema.id_Tema === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44">
      <Headerpage titulo={name + ` - Escoge un subtema`}/>
      <TemasGrid temas={filteredSubTemas}/>
    </div>
  );
}