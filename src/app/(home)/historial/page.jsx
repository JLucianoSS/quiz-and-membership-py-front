import { HistorialCard } from "../components";
import { Headerpage } from "@/components";
import { resultados } from "../../../data/historial";

export default function HistorialPage() {
  return (
    <div className="px-6 lg:px-20 xl:px-44">

      <Headerpage titulo="Historial" />

      <div className="flex flex-col gap-2">
        {resultados.map((resultado, index) => (
          <HistorialCard key={index} {...resultado} />
        ))}
      </div>
    </div>
  );
}
