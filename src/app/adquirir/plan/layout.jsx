import { getUserById } from "@/actions";
import { authOptions } from "@/app/auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function AdquirirPlanLayout({children}) {

  const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/register");
    }
  
    const resp = await getUserById(session?.user?.id);
    const userData = resp?.data;
  
    // Verificar si el usuario está aprobado o es administrador
    const isAdmin = userData?.role === 'Administrador';
    const isUserApproved = userData?.is_approved;
    
    // Permitir acceso si es admin O si está aprobado
    const hasAccess = isAdmin || isUserApproved;

    // if (!hasAccess) {
    //   redirect("/login");
    // }

  return (
    <div>
     {children}
    </div>
  );
}