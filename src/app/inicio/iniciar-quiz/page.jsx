
import { Headerpage } from "@/components";
import { EspecialidadesGrid } from "../components";
import { especialidades } from "@/data/especialidades";

export default function IniciarQuizPage() {
  return (
    <div className="px-4 lg:px-20 xl:px-44 ">
      <Headerpage titulo="Escoge un módulo"/>
      <EspecialidadesGrid especialidades={especialidades}/>
    </div>
  );
}