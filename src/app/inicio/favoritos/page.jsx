import { Headerpage } from "@/components";
import { FavoriteCard, HeroTitle } from "../components";
import { favoritas } from "@/data/favroitas";


export default function FavoritosPage() {
  return (
    <>
      <HeroTitle title="Favoritas" imgSrc="/imgs/heroimgfav.jpg" imgPositionY="40%"/>
      <div className="px-6 lg:px-20 xl:px-44">
        <Headerpage titulo="Preguntas favoritas" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {favoritas.map((favorita, index) => (
            <FavoriteCard key={index} {...favorita} />
          ))}
        </div>
      </div>
    </>
  );
}