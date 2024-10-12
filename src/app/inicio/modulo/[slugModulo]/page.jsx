import { Headerpage } from "@/components";
import { extractInfoFromSlug } from "@/utils/strings";
import { TemasGrid } from "../../components";
import { getTemas } from "@/actions";



export default async function ModuloPage({ params }) {

    const { id, name } = extractInfoFromSlug(params.slugModulo);
    const { data } = await getTemas();
    console.log(data);
    
    const filteredTemas = data.filter(tema => tema.id_modulo === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44">
      <Headerpage titulo={ name + ` - Escoge un tema` }/>
      {!filteredTemas || filteredTemas.length !== 0 ? 
      <TemasGrid temas={filteredTemas}/> :  
      <span className="text-gray-700">No hay temas establecidos</span>}
    </div>
  );
}