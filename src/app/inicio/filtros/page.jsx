
import { HeroTitle, ViewFilters } from "../components";
import { Modulos } from "../../../data/modulos";
import { Temas } from "../../../data/temas";
import { Subtemas } from "../../../data/subtemas";
import { Preguntas } from "../../../data/preguntas";

export default async function FiltrosPage() {
  // const especialidades = await getEspecialidades();
  // y para traer lo demás ...

  return (
    <>
      {/* Header */}
      <HeroTitle title="Filtrar" imgSrc="/imgs/heroimg1.jpg" imgPositionY="30%"/>

      <div className="bg-white sm:bg-gray-200 sm:pt-6 sm:pb-[85px]">
        <ViewFilters
          modulos={Modulos}
          temas={Temas}
          subtemas={Subtemas}
          preguntas={Preguntas}
        />
      </div>
    </>
  );
}
