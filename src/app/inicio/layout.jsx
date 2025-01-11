import { Navbar, Sidebar, AccessRestriction, Footer2 } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { redirect } from "next/navigation";
import { getUserById, updateUsuario } from "@/actions";

export default async function HomeLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const resp = await getUserById(session?.user?.id);
  const userData = resp?.data;

  const pagos = resp?.data?.pagos || [];
  
  // Función para verificar si hay un plan activo y actualizar el estado del usuario si es necesario
  const tienePlanActivo = async () => {
    const currentDate = new Date();
    
    // Ordenar pagos por fecha de fin del plan (más reciente primero)
    const sortedPagos = [...pagos].sort((a, b) => 
      new Date(b.plan.fecha_fin) - new Date(a.plan.fecha_fin)
    );

    // Verificar si existe algún pago con plan no vencido
    const planActivo = sortedPagos.some(pago => {
      const planEndDate = new Date(pago.plan.fecha_fin);
      return currentDate <= planEndDate;
    });

    // Si no hay plan activo y el usuario está activo, actualizamos su estado
    if (!planActivo && userData?.is_user_active) {
      try {
        await updateUsuario(session?.user?.id, { is_user_active: false });
      } catch (error) {
        console.error("Error al actualizar el estado del usuario:", error);
      }
    }

    return planActivo;
  };

  // Ejecutar la verificación y obtener el resultado
  const isPlanActivo = await tienePlanActivo();

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
        <AccessRestriction isPlan={isPlanActivo} user={resp.data}/>
      )}
    </>
  );
}