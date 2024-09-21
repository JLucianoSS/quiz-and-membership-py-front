import { Headerpage } from "@/components";
import { HeroTitle, ViewFilters } from "../components";
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
      <HeroTitle title="Filtrar" imgSrc="/imgs/heroimg1.jpg" imgPositionY="30%"/>

      <div className="bg-gray-200 ">
        <ViewFilters
          especialidades={especialidades}
          subespecialidades={subespecialidades}
          temas={temas}
          preguntas={preguntas}
        />
      </div>
    </>
  );
}
