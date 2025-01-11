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
  const usuarioYaPago = pagos.some(pago => pago.estado === "pendiente" || pago.estado === "completado");

  // Si el usuario ya pagó, redirigir a la página de agradecimiento
  if (usuarioYaPago) {
    redirect(`/adquirir/plan/thankyou/${params.id}`);
  }

  return (
    <div>
      <div className="mt-10 mb-16">
        <HeaderNoAccess />
        <Checkout idPlan={params.id} user={resp?.data} />
      </div>
      <Footer2 />
    </div>
  );
}
