"use client"
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";

export const FavoriteCard = ({ pregunta, descripcion, fechaRespuesta, esCorresta }) => {
  const [isFavorite, setIsFavorite] = useState(true); // Estado inicial como favorita

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`${pregunta} ha sido ${isFavorite ? "removida de" : "agregada a"} favoritos.`);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-100 shadow-md flex gap-4 items-center">

      {/* Botón de favoritos */}
      <button 
        onClick={toggleFavorite}
        className="focus:outline-none"
      >
        {isFavorite ? (
          <IoHeart className="text-primary w-6 h-6" /> // Icono sólido (relleno) para cuando es favorito
        ) : (
          <IoHeartOutline className="text-primary w-6 h-6" /> // Icono outline (no relleno) para cuando no es favorito
        )}
      </button>

      
      <div >
        <div className="text-gray-500 text-sm font-semibold">
          {pregunta}
        </div>
        <p className="mt-2 text-gray-600 text-xs overflow-hidden text-ellipsis line-clamp-2">
          {descripcion}
        </p>
        <div className="flex items-center mt-4 text-sm">
          {esCorresta ? (
            <IoCheckmarkCircleOutline className="text-green-600 font w-5 h-5 mr-2" />
          ) : (
            <IoCloseCircleOutline className="text-red-600 w-5 h-5 mr-2" />
          )}
          <span className="text-xs font-semibold text-gray-600">
            Respondida el {fechaRespuesta}
          </span>
        </div>
      
      
      </div>
    </div>
  );
};
