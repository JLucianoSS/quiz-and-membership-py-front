import { Headerpage } from "@/components";
import { ViewManageQuiz } from "../components";

import { especialidades } from "@/data/especialidades";
import { subespecialidades } from "@/data/subespecialidades";
import { temas } from "@/data/temas";
import { preguntas } from "@/data/preguntas";
import { opciones } from "@/data/opciones";

export default async function PreguntasAdminPage() {
  // consultas para traer todo dlhsadhsalkd

  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Gestión de preguntas" />
      <ViewManageQuiz
        especialidades={especialidades}
        subespecialidades={subespecialidades}
        temas={temas}
        preguntas={preguntas}
        opciones={opciones}
      />
      <div className="mb-10"></div>
    </div>
  );
}
