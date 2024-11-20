
import { HeroTitle, ViewFilters } from "../components";
import { getModulos, getTemas, getSubtemas, getPreguntas } from "../../../actions";

export default async function FiltrosPage() {

  const modulos = await getModulos();
  const temas = await getTemas();
  const subtemas = await getSubtemas();
  const preguntas = await getPreguntas();

  return (
    <>
      {/* Header */}
      <HeroTitle title="Filtrar" imgSrc="/imgs/heroimg1.jpg" imgPositionY="30%"/>

      <div className="bg-white sm:bg-gray-200 sm:pt-6 sm:pb-[85px]">
        <ViewFilters
          modulos={modulos.data}
          temas={temas.data}
          subtemas={subtemas.data}
          preguntas={preguntas.data}
        />
      </div>
    </>
  );
}
