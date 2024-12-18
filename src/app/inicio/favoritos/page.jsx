import { Headerpage } from "@/components";
import { FavoriteGrid, HeroTitle } from "../components";
import { authOptions } from "@/app/auth.config";
import { getServerSession } from "next-auth";


export default async function FavoritosPage() {
  const session = await getServerSession(authOptions);


  return (
    <>
      <HeroTitle title="Favoritas" imgSrc="/imgs/heroimgfav.jpg" imgPositionY="40%" />
      <div className="px-6 lg:px-20 xl:px-44 bg-red">
        <Headerpage titulo="Preguntas favoritas" />
        <FavoriteGrid iduser={session.user.id}/>
      </div>
    </>
  );
}
