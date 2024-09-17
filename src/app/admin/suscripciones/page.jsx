import { Headerpage } from "@/components";
import { TableSubscriptions } from "../components";
import { suscripciones } from "@/data/suscripciones";

export default function SuscripcionesAdminPage() {
  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Suscripciones"/>
      <TableSubscriptions subscriptions={suscripciones}/>
    </div>
  );
}
