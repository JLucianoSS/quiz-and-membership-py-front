import { AccessRestriction } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getUserById, updateUsuario } from "@/actions";
import { redirect } from "next/navigation";

export default async function PreguntasLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  const resp = await getUserById(session.user.id);
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

    // Si no hay plan activo, verificamos si el usuario fue aprobado manualmente
    if (!planActivo) {
      const ultimoPago = sortedPagos[0]; // Último plan registrado
      const fechaFinUltimoPlan = ultimoPago ? new Date(ultimoPago.plan.fecha_fin) : null;

      if (userData?.is_approved && fechaFinUltimoPlan) {
        // Mantener activo hasta la fecha de fin del último plan registrado
        if (currentDate <= fechaFinUltimoPlan) {
          return true; // Se mantiene activo hasta la fecha de fin
        } else {
          try {
            await updateUsuario(session.user.id, { is_approved: false });
          } catch (error) {
            console.error("Error al actualizar el estado del usuario:", error);
          }
        }
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

  if (!hasAccess) {
    return <AccessRestriction isPlan={isPlanActivo} user={resp.data}/>;
  }

  return (
    <div>
      {children}
    </div>
  );
}