import { Headerpage } from "@/components";
import { TablePayments } from "../components";
import { pagos } from "@/data/pagos";


export default function PagosAdminPage() {
  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Pagos"/>
      <TablePayments payments={pagos}/>
    </div>
  );
}