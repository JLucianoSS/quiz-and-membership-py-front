import { HeroTitle, HistorialGrid } from "../components";
import { Headerpage } from "@/components";
import { authOptions } from "@/app/auth.config";
import { getServerSession } from "next-auth";

export default async function HistorialPage() {

  const session = await getServerSession(authOptions);

  return (
    <>
      <HeroTitle title="Historial" imgSrc="/imgs/heroimghis.jpg" imgPositionY="70%"/>
      <div className="px-6 lg:px-20 xl:px-44 min-h-screen ">
        <Headerpage titulo="Preguntas respondidas" />
        <HistorialGrid iduser={session.user.id} />
      </div>
    </>
  );
}
