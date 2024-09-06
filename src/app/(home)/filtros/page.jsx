import { Headerpage } from "@/components";
import { ViewFilters } from "../components";
import { especialidades } from "../../../data/especialidades";
import { subespecialidades } from "../../../data/subespecialidades";
import { preguntas } from "../../../data/preguntas";
import { temas } from "../../../data/temas";

export default async function FiltrosPage() {
  // const especialidades = await getEspecialidades();
  // y para traer lo demás ...

  return (
    <>
      {/* Header */}
      <div className="px-4 lg:px-20 xl:px-44 ">
        <Headerpage titulo="Filtros" />
      </div>

      <ViewFilters
        especialidades={especialidades}
        subespecialidades={subespecialidades}
        temas={temas}
        preguntas={preguntas}
      />

      <div className="mb-16"></div>
    </>
  );
}
