import { getUserById } from "@/actions";
import { LandingPlanes } from "@/app/(landing)/components";
import { authOptions } from "@/app/auth.config";
import { Footer2, HeaderNoAccess } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdquirirPlanPage() {
  const session = await getServerSession(authOptions);
  const resp = await getUserById(session?.user?.id);

  const pagos = resp?.data?.pagos || [];

  // Verificar si el usuario tiene algún pago pendiente o completado
  const usuarioYaPago = pagos.some(
    (pago) => pago.estado === "pendiente" || pago.estado === "completado"
  );

  if (usuarioYaPago) {
    // Tomamos el último pago realizado (más reciente)
    const ultimoPago = pagos[pagos.length - 1];
    const { fecha_inicio, fecha_fin } = ultimoPago.plan;
    const fechaActual = new Date();
    const fechaInicio = new Date(fecha_inicio);
    const fechaFin = new Date(fecha_fin);

    // Verificamos si el plan está activo (dentro del rango de fechas)
    if (fechaActual <= fechaFin) {
      // Si el plan está activo, redirigimos a la página de agradecimiento
      redirect(`/adquirir/plan/thankyou/${ultimoPago.plan.id_Plan}`);
    }
  }

  return (
    <div>
      <div className="mt-10 mb-16 px-6 lg:px-20 xl:px-44">
        <HeaderNoAccess user={resp.data}/>
        <LandingPlanes />
      </div>
      <Footer2 />
    </div>
  );
}
