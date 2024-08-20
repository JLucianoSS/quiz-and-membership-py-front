import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../auth.config";


export default async function AuthLayout({ children }) {

  /* RESTRINGIR SI HAY SESION ACTIVA */
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div>
      { children }
    </div>
  );
}