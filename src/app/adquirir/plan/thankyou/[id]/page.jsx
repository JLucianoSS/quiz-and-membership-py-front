import { getUserById } from "@/actions";
import { authOptions } from "@/app/auth.config";
import { Footer2, HeaderNoAccess, ThankYouPage } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

export default async function AdquiriPlanThankYouPage({ params }) {
  const session = await getServerSession(authOptions);
  const resp = await getUserById(session.user.id);

  const usuarioYaPago = true;

  if (!usuarioYaPago) {
    redirect(`adquirir/plan/checkout/${params.id}`);
  }

  return (
    <div>
      <div className="mt-10 mb-16 px-6 lg:px-20 xl:px-44">
        <HeaderNoAccess />
        <ThankYouPage idPlan={params.id} user={resp.data}/>
      </div>
      <Footer2 />
    </div>
  );
}
