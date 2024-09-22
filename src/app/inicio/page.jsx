
import { SwiperActions, SwiperCategories, SwiperHeros } from "./components";
import { Modulos } from "@/data/modulos";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";
import { getUser } from "@/data/usuarios";

export default async function HomePage() {

  const session = await getServerSession(authOptions);
  const user = getUser(session?.user?.id);

  return (
    <div className="relative bg-gray-100">
      <SwiperHeros userRole={user.role}/>
      <div className="px-6 lg:px-20 xl:px-44">
        <SwiperCategories especialidades={Modulos}/>
        <div className="pb-32"></div>
      </div>
      <SwiperActions/>
    </div>
  );
}
