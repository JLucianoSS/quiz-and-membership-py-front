import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { redirect } from "next/navigation";


export default async function LandingLayout({ children }) {

  /* RESTRINGIR SI HAY SESION ACTIVA */
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/inicio");
  }

  return (
    <div>
      { children }
    </div>
  );
}