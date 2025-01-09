import { Headerpage } from "@/components";

import { suscripciones } from "@/data/suscripciones";
import { TablePlans } from "../components/Tables/TablePlans";

export default function SuscripcionesAdminPage() {
  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Planes"/>
      <TablePlans />
    </div>
  );
}
