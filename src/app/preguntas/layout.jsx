import { AccessRestriction } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getUserById } from "@/actions";
import { redirect } from "next/navigation";

export default async function PreguntasLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  const resp = await getUserById(session.user.id);
  const userData = resp?.data;

  // Verificar si el usuario está aprobado o es administrador
  const isAdmin = userData?.role === 'Administrador';
  const isUserApproved = userData?.is_approved;
  
  // Permitir acceso si es admin O si está aprobado
  const hasAccess = isAdmin || isUserApproved;

  if (!hasAccess) {
    return <AccessRestriction />;
  }

  return (
    <div>
      {children}
    </div>
  );
}