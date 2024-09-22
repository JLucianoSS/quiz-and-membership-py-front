import { Headerpage } from "@/components";
import { extractInfoFromSlug } from "@/utils/strings";
import { TemasGrid } from "../../components";
import { Temas } from "../../../../data/temas";



export default function ModuloPage({ params }) {

    const { id, name } = extractInfoFromSlug(params.slugModulo);
    //TODO: EL ID ME SERVIRÁ PARA TRAER TODAS LOS TEMAS DE ESTE MODULO
    const filteredTemas = Temas.filter(tema => tema.id_Modulo === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44">
      <Headerpage titulo={ name + ` - Escoge un tema` }/>
      <TemasGrid temas={filteredTemas}/>
    </div>
  );
}