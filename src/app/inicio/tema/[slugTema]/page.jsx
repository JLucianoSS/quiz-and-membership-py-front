import { Headerpage } from "@/components";
import { extractInfoFromSlug } from "@/utils/strings";
import { SubTemasGrid } from "../../components";
import { getSubtemas } from "@/actions";


export default async function TemaPage({ params }) {

  const { id, name } = extractInfoFromSlug(params.slugTema);
  const { data } = await getSubtemas()
  const filteredSubTemas = data.filter(subtema => subtema.id_tema === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44 min-h-screen pb-[100px]">
      <Headerpage titulo={name + ` - Escoge un subtema`}/>
      { !filteredSubTemas || filteredSubTemas.length !== 0 ? 
        <SubTemasGrid subtemas={filteredSubTemas}/> :
        <span className="text-gray-700">No hay temas establecidos</span>
      }
    </div>
  );
}