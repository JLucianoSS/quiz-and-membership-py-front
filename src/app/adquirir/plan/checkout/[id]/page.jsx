import { getUserById } from "@/actions";
import { authOptions } from "@/app/auth.config";
import { Checkout, Footer2, HeaderNoAccess } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdquirirPlanCheckoutPage({ params }) {
  const session = await getServerSession(authOptions);
  const resp = await getUserById(session?.user?.id);

  // Verificar si el usuario ya ha realizado un pago
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
      <div className="mt-10 mb-16">
        <HeaderNoAccess user={resp.data}/>
        <Checkout idPlan={params.id} user={resp?.data} />
      </div>
      <Footer2 />
    </div>
  );
}
