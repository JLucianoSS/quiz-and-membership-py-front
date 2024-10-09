import { Headerpage } from "@/components";
import { ViewManageQuiz } from "../components";

// import { Modulos } from "@/data/modulos";
import { Temas } from "@/data/temas";
import { Subtemas } from "@/data/subtemas";
import { Preguntas } from "@/data/preguntas";
import { opciones } from "@/data/opciones";

import { getModulos } from "@/actions";

export default async function PreguntasAdminPage() {
  // consultas para traer todo dlhsadhsalkd

  const modulos = await getModulos();

  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Gestión de preguntas" />
      <ViewManageQuiz
        modulos={modulos.data}
        temas={Temas}
        subtemas={Subtemas}
        preguntas={Preguntas}
        opciones={opciones}
      />
      <div className="mb-10"></div>
    </div>
  );
}
