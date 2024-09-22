
import { Headerpage } from "@/components";
import { ModulosGrid } from "../components";
import { Modulos } from "@/data/modulos";

export default function IniciarQuizPage() {
  return (
    <div className="px-4 lg:px-20 xl:px-44 ">
      <Headerpage titulo="Escoge un módulo"/>
      <ModulosGrid modulos={Modulos}/>
    </div>
  );
}