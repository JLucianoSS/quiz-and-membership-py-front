import { Headerpage } from "@/components";
import { FavoriteCard } from "../components";
import { favoritas } from "@/data/favroitas";


export default function FavoritosPage() {
  return (
    <div className="px-6 lg:px-20 xl:px-44">

      <Headerpage titulo="Favoritas" />

      <div className="flex flex-col gap-2 mb-10">
        {favoritas.map((favorita, index) => (
          <FavoriteCard key={index} {...favorita} />
        ))}
      </div>
    </div>
  );
}