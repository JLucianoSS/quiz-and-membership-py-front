import { LandingPlanes } from "@/app/(landing)/components";
import { Footer2, HeaderNoAccess } from "@/components";
import { redirect } from "next/navigation";

export default async function AdquirirPlanPage() {

  const usuarioYaPago = true;
  const idPlanByUsuario = 1
  
  if(usuarioYaPago){
    redirect(`/adquirir/plan/thankyou/${idPlanByUsuario}`)
  }

  return (
    <div>
      <div className="mt-10 mb-16 px-6 lg:px-20 xl:px-44">
        <HeaderNoAccess />
        <LandingPlanes/>
      </div>
        <Footer2/>
    </div>
  );
}