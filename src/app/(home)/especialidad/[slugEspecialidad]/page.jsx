import { Headerpage } from "@/components";
import { extractInfoFromSlug } from "@/utils/strings";
import { SubEspecialidadesGrid } from "../../components";
import { subespecialidades } from "../../../../data/subespecialidades";



export default function EspecialidadPage({ params }) {

    const { id, name } = extractInfoFromSlug(params.slugEspecialidad);
    //TODO: EL ID ME SERVIRÁ PARA TRAER TODAS LAS SUBESPECIALIDADES DE ESTA ESPECIALIDAD
    const filteredSubespecialidades = subespecialidades.filter(subespecialidad => subespecialidad.especialidadId === id);

  return (
    <div className="px-6 lg:px-20 xl:px-44">
      <Headerpage titulo={ name }/>
      <SubEspecialidadesGrid subespecialidades={filteredSubespecialidades}/>
    </div>
  );
}