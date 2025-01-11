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
  const usuarioYaPago = pagos.some(pago => pago.estado === "pendiente" || pago.estado === "completado");

  // Si el usuario ya pagó, redirigir a la página de agradecimiento
  if (usuarioYaPago) {
    const idPlanByUsuario = pagos[0]?.id_Plan;  // Tomamos el primer plan, puedes ajustar la lógica si hay varios
    redirect(`/adquirir/plan/thankyou/${idPlanByUsuario}`);
  }

  return (
    <div>
      <div className="mt-10 mb-16 px-6 lg:px-20 xl:px-44">
        <HeaderNoAccess />
        <LandingPlanes />
      </div>
      <Footer2 />
    </div>
  );
}
