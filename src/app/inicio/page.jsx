
import { SwiperActions, SwiperCategories, SwiperHeros } from "./components";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { getUser } from "@/data/usuarios";
import { getModulos } from "@/actions";

export default async function HomePage() {

  const session = await getServerSession(authOptions);
  const user = getUser(session?.user?.id);
  const modulos = await getModulos();

  return (
    <div className="relative bg-gray-100">
      <SwiperHeros userRole={user.role}/>
      <div className="px-6 lg:px-20 xl:px-44">
        <SwiperCategories modulos={modulos.data}/>
        <div className="pb-32"></div>
      </div>
      <SwiperActions/>
    </div>
  );
}
