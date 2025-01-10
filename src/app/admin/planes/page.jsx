import { Headerpage } from "@/components";

import { TablePlans } from "../components/Tables/TablePlans";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getUserById } from "@/actions";

export default async function SuscripcionesAdminPage() {

  const session = await getServerSession(authOptions);
    const user = await getUserById(session?.user?.id); 

  return (
    <div className="px-4 lg:px-10">
      <Headerpage titulo="Planes"/>
      <TablePlans user={user.data} />
    </div>
  );
}
