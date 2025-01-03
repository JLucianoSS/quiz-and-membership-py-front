
import { HeroTitle, ViewFilters } from "../components";
import { getModulos } from "../../../actions";

export default async function FiltrosPage() {

  const modulos = await getModulos();


  return (
    <>
      {/* Header */}
      <HeroTitle title="Filtrar" imgSrc="/imgs/heroimg1.jpg" imgPositionY="30%"/>

      <div className="bg-white sm:bg-gray-200 sm:pt-6 sm:pb-[85px]">
        <ViewFilters
          modulos={modulos.data}
        />
      </div>
    </>
  );
}
