import { HeroTitle, HistorialCard } from "../components";
import { Headerpage } from "@/components";
import { resultados } from "../../../data/historial";

export default function HistorialPage() {
  return (
    <>
      <HeroTitle title="Historial" imgSrc="/imgs/heroimghis.jpg" imgPositionY="70%"/>
      <div className="px-6 lg:px-20 xl:px-44">
        <Headerpage titulo="Preguntas respondidas" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {resultados.map((resultado, index) => (
            <HistorialCard key={index} {...resultado} />
          ))}
        </div>
      </div>
    </>
  );
}
