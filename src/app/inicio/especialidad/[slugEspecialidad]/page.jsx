import { Headerpage } from "@/components";
import { extractInfoFromSlug } from "@/utils/strings";
import { SubEspecialidadesGrid } from "../../components";
import { Temas } from "../../../../data/temas";



export default function EspecialidadPage({ params }) {

    const { id, name } = extractInfoFromSlug(params.slugEspecialidad);
    //TODO: EL ID ME SERVIRÁ PARA TRAER TODAS LAS SUBESPECIALIDADES DE ESTA ESPECIALIDAD
    const filteredTemas = Temas.filter(tema => tema.id_Modulo === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44">
      <Headerpage titulo={ name + ` - Escoge un tema` }/>
      <SubEspecialidadesGrid subespecialidades={filteredTemas}/>
    </div>
  );
}