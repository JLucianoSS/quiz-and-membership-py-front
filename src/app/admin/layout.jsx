import { getServerSession } from "next-auth";
import { NavbarAdmin, SidebarAdmin } from "./components";
import { authOptions } from "../auth.config";
import { redirect } from "next/navigation";
import { getUserById } from "@/actions";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  const user = await getUserById(session?.user?.id);  

  if (!session) {
    // Si no hay sesión, redirigir al login
    redirect("/login");
  }

  // Verificar si el rol del usuario es "Administrador"
  if (user?.data?.role !== "Administrador") {
    // Si no tiene el rol de administrador, redirigir a otra página (por ejemplo, página de inicio o acceso denegado)
    redirect("/login");
  }

  return (
    <>
      <NavbarAdmin user={user.data}/>
      <SidebarAdmin />
      <div className="h-full pt-[60px] md:pl-[240px]">
        {children}
      </div>
    </>
  );
}
