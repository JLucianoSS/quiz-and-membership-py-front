import { getUserById } from "@/actions";
import { authOptions } from "@/app/auth.config";
import { Checkout, Footer2, HeaderNoAccess } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdquirirPlanCheckoutPage({params}) {

  const session = await getServerSession(authOptions);
  const resp = await getUserById(session.user.id);

  //simulando pago de un usuario
  const usuarioYaPago = true;
  if(usuarioYaPago){
    redirect(`/adquirir/plan/thankyou/${params.id}`)
  }

  return (
    <div>
      <div className="mt-10 mb-16 px-6 lg:px-20 xl:px-44">
        <HeaderNoAccess />
        <Checkout idPlan={params.id} user={resp.data}/>
      </div>
      <Footer2 />
    </div>
  );
}
