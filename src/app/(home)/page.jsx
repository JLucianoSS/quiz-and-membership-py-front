
import { SwiperActions, SwiperCategories, SwiperHeros } from "./components";
import { especialidades } from "@/data/especialidades";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { getUser } from "@/data/usuarios";

export default async function HomePage() {

  const session = await getServerSession(authOptions);
  const user = getUser(session?.user?.id);

  return (
    <div className="relative">
      <div className="px-6 lg:px-20 xl:px-44">
        <SwiperHeros/>
        <SwiperCategories especialidades={especialidades}/>
        <div className="mb-20"></div>
      </div>
      <SwiperActions/>
    </div>
  );
}
