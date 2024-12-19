import { Navbar, Sidebar, AccessRestriction, Footer2 } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { redirect } from "next/navigation";
import { getUserById } from "@/actions";

export default async function HomeLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const resp = await getUserById(session?.user?.id);
  const userData = resp?.data;

  // Verificar si el usuario está aprobado o es administrador
  const isAdmin = userData?.role === 'Administrador';
  const isUserApproved = userData?.is_approved;
  
  // Permitir acceso si es admin O si está aprobado
  const hasAccess = isAdmin || isUserApproved;

  return (
    <>
      {hasAccess ? (
        <>
          <Navbar user={userData} />
          <div className="pt-[52px]">
            {children}
          </div>
          <Footer2/>
          <Sidebar user={userData} />
        </>
      ) : (
        <AccessRestriction />
      )}
    </>
  );
}