import { Headerpage } from "@/components";
import { extractInfoFromSlug } from "@/utils/strings";
import { SubTemasGrid } from "../../components";
import { Subtemas } from "@/data/subtemas";


export default function TemaPage({ params }) {

  const { id, name } = extractInfoFromSlug(params.slugTema);
  const filteredSubTemas = Subtemas.filter(subtema => subtema.id_Tema === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44">
      <Headerpage titulo={name + ` - Escoge un subtema`}/>
      <SubTemasGrid subtemas={filteredSubTemas}/>
    </div>
  );
}