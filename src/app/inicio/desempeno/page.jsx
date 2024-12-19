 

import { Headerpage } from "@/components";
import { HeroTitle, ViewDesempeno, ViewEstadisticas } from "../components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth.config";

export default async function DesempenoPage() {

  const session = await getServerSession(authOptions);

  return (
    <>
      <HeroTitle imgSrc="/imgs/heroimgdes.jpg" title="Desempeño" imgPositionY="15%"/>
      <div className="px-6 lg:px-20 xl:px-44">
        <Headerpage titulo="Mi desempeño"/>
        <ViewDesempeno userid={session.user.id}/>
        {/* <ViewEstadisticas/> */}
      </div>
    </>
  );
}
