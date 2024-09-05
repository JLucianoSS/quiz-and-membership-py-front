import { getServerSession } from "next-auth";
import { NavbarAdmin, SidebarAdmin } from "./components";
import { authOptions } from "../auth.config";
import { getUser } from "@/data/usuarios";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  const user = await getUser(session?.user?.id);  // Traer al usuario mediante una consulta (aquí simulamos la consulta)

  if (!session) {
    // Si no hay sesión, redirigir al login
    redirect("/login");
  }

  // Verificar si el rol del usuario es "Administrador"
  if (user?.role !== "Administrador") {
    // Si no tiene el rol de administrador, redirigir a otra página (por ejemplo, página de inicio o acceso denegado)
    redirect("/login");
  }

  return (
    <>
      <NavbarAdmin user={user}/>
      <SidebarAdmin />
      <div className="h-full pt-[70px] md:pl-[240px]">
        {children}
      </div>
    </>
  );
}
