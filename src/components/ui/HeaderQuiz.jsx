"use client";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { createFavorito, deleteFavorito } from "../../actions";
import toast from "react-hot-toast";

export const HeaderQuiz = ({ titulo = "Sin Titulo", IdFavoriteQuestion, user }) => {
  const router = useRouter();
  
  // Encuentra el favorito específico para esta pregunta 
  const existingFavorite = user?.favoritos?.find(
    fav => fav.id_pregunta === IdFavoriteQuestion
  );

  // console.log({existingFavorite, IdFavoriteQuestion});
  
  // Inicializa el estado basado en si existe un favorito para esta pregunta
  const [isFavorite, setIsFavorite] = useState(!!existingFavorite);

  // console.log({isFavorite});

  
  const toggleFavorite = async () => {
    try {
      if (!isFavorite) {
        // Agregar a favoritos
        console.log(`Agregando pregunta ID ${IdFavoriteQuestion} a favoritos`);
        await createFavorito({ 
          id_user: user.id_user, 
          id_pregunta: IdFavoriteQuestion, 
          fecha_agregado: new Date().toISOString().slice(0, 19) 
        });
        toast.success("Pregunta añadida a Favoritos");
        setIsFavorite(true);
      } else {
        // Remover de favoritos
        // Utilizamos el ID del favorito existente para eliminarlo
        if (existingFavorite) {
          console.log(`Eliminando favorito con ID ${existingFavorite.id_favorito}`);
          await deleteFavorito(existingFavorite.id_favorito);
          setIsFavorite(false);
        }
      }
    } catch (error) {
      console.error("Error al modificar favoritos:", error);
      // Revertir el estado si hay un error
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div className="fixed z-10 bg-white w-full flex gap-2 items-center py-2 border-b-2 px-4 lg:px-20 xl:px-44">
      <div className="flex gap-2 items-center">
        <button 
          className="text-primary hover:underline text-sm" 
          onClick={() => { router.back(); }}
        >
          <IoArrowBack size={25} />
        </button>
        <h1 className="text-lg font-semibold text-gray-700">{titulo}</h1>
      </div>
      <button 
        className="text-primary ml-auto" 
        onClick={toggleFavorite}
        disabled={isFavorite}
      >
        {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>
    </div>
  );
};