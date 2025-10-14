import { AccessRestriction } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";
import { getUserBasic, getUserForAccess, updateUsuario } from "@/actions";
import { redirect } from "next/navigation";

export default async function PreguntasLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // 1) Datos básicos primero (role/is_approved)
  const basicResp = await getUserBasic(session.user.id);
  const basicUser = basicResp?.data || {};

  // Si es admin, acceso directo sin cargar pagos
  const isAdminBasic = basicUser?.role === 'Administrador';

  // 2) Traer datos con pagos para mostrar información del plan en Navbar (todos los usuarios)
  const accessResp = await getUserForAccess(session.user.id);
  const accessUser = accessResp?.data || {};

  // User data para la UI: combinar datos básicos con datos de acceso
  const userData = { ...basicUser, ...accessUser, pagos: accessUser?.pagos || [] };

  const pagos = accessUser?.pagos || [];
  
  // Función para verificar si hay un plan activo
  const tienePlanActivo = () => {
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

    return planActivo;
  };

  // Verificar si el usuario está aprobado o es administrador
  const isAdmin = (basicUser?.role === 'Administrador');
  const isUserApproved = !!basicUser?.is_approved;
  const isPlanActivo = tienePlanActivo();
  
  // LÓGICA DE ACCESO CORREGIDA:
  // 1. Administradores siempre tienen acceso
  // 2. Usuarios con plan activo tienen acceso
  // 3. Usuarios aprobados manualmente tienen acceso
  const hasAccess = isAdmin || isPlanActivo || isUserApproved;

  // Debug: Log para verificar el estado del usuario
  console.log('🔍 Debug Access Check (preguntas/layout):', {
    userId: session?.user?.id,
    roleBasic: basicUser?.role,
    roleAccess: accessUser?.role,
    isAdmin,
    isUserApproved,
    isPlanActivo,
    hasAccess,
    pagosCount: pagos.length,
    userDataHasPagos: !!userData?.pagos,
    userDataPagosLength: userData?.pagos?.length || 0
  });

  if (!hasAccess) {
    return <AccessRestriction isPlan={isPlanActivo} user={userData}/>;
  }

  return (
    <div>
      {children}
    </div>
  );
}