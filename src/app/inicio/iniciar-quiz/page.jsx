
import { Headerpage } from "@/components";
import { ModulosGrid } from "../components";
import { getModulos } from "@/actions";

export default async function IniciarQuizPage() {

  const modulos = await getModulos(); 

  return (
    <div className="px-4 lg:px-20 xl:px-44 ">
      <Headerpage titulo="Escoge un módulo"/>
      { !modulos || modulos.length !== 0 ? 
      <ModulosGrid modulos={modulos?.data}/> : 
      <span className="text-gray-700">No hay módulos establecidos</span> }
    </div>
  );
}