"use client";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

export const HeaderQuiz = ({ titulo = "Sin Titulo", IdFavoriteQuestion }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      console.log(`Adding question ID ${IdFavoriteQuestion} to favorites`);
      // Lógica para agregar a favoritos
    } else {
      console.log(`Removing question ID ${IdFavoriteQuestion} from favorites`);
      // Lógica para quitar de favoritos
    }
  };

  return (
    <div className="fixed z-10 bg-white w-full flex gap-2 items-center py-2 border-b-2 px-4 lg:px-20 xl:px-44">
      <div className="flex gap-2 items-center">
        <span
          className="text-primary hover:underline text-sm cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <IoArrowBack size={25} />
        </span>
        <h1 className="text-lg font-semibold text-gray-700">{titulo}</h1>
      </div>
      <span
        className="text-primary cursor-pointer ml-auto"
        onClick={toggleFavorite}
      >
         {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </span>
    </div>
  );
};
