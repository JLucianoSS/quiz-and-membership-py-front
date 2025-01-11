import { getUserById } from "@/actions";
import { authOptions } from "@/app/auth.config";
import { Headerpage, MyPlan, PlansGrid } from "@/components";
import { getServerSession } from "next-auth";

export default async function PlanesPage() {
  const session = await getServerSession(authOptions);
  const user = await getUserById(session?.user?.id);

  return (
    <div className="px-6 lg:px-20 xl:px-44 mb-10 min-h-screen">
      <Headerpage titulo="Planes" />
      <MyPlan user={user.data}/>
    </div>
  );
}
