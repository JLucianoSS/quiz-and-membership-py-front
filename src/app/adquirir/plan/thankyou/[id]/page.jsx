import { getUserById } from "@/actions";
import { authOptions } from "@/app/auth.config";
import { Footer2, HeaderNoAccess, ThankYouPage } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdquiriPlanThankYouPage({ params }) {
  const session = await getServerSession(authOptions);
  const resp = await getUserById(session.user.id);

  // Verificar si el usuario ha realizado el pago
  const pagos = resp?.data?.pagos || [];
  const usuarioYaPago = pagos.some(pago => pago.estado === "pendiente" || pago.estado === "completado");

  // Redirigir si el usuario no ha pagado
  if (!usuarioYaPago) {
    redirect(`/adquirir/plan/checkout/${params.id}`);
  }

  return (
    <div>
      <div className="mt-10 mb-16">
        <HeaderNoAccess />
        <ThankYouPage idPlan={params.id} user={resp.data} />
      </div>
      <Footer2 />
    </div>
  );
}
