 

import { Headerpage } from "@/components";
import { HeroTitle, ViewDesempeno, ViewEstadisticas } from "../components";

export default function DesempenoPage() {

  return (
    <>
      <HeroTitle imgSrc="/imgs/heroimgdes.jpg" title="Desempeño" imgPositionY="15%"/>
      <div className="px-6 lg:px-20 xl:px-44">
        <Headerpage titulo="Desempeño"/>
        <ViewDesempeno/>
        <ViewEstadisticas/>
      </div>
    </>
  );
}
