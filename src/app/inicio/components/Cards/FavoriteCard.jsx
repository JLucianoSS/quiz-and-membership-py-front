"use client";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoHeart, IoHeartOutline, } from "react-icons/io5";
import { useEffect, useState } from "react";
import { createFavorito, deleteFavorito } from "@/actions";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";


export const FavoriteCard = ({user, id_pregunta,texto_pregunta,explicacion_correcta, opciones}) => {
  // Estado inicial de favoritos basado en los favoritos del usuario
  const [isFavorite, setIsFavorite] = useState(
    !!user?.favoritos?.find((fav) => fav.id_pregunta === id_pregunta)
  );
  const [loading, setLoading] = useState(false);
  const [favoritos, setFavoritos] = useState(user?.favoritos || []); // Manejar favoritos en el estado local

  // Función para alternar el estado de favorito
  const toggleFavorite = async () => {
    setLoading(true);
    try {
      const existingFavorite = favoritos.find(
        (fav) => fav.id_pregunta === id_pregunta
      );

      if (!isFavorite) {
        // Si no es favorito, agregarlo solo si no existe ya en el estado
        if (!existingFavorite) {
          const newFavorito = {
            id_user: user.id_user,
            id_pregunta: id_pregunta,
            fecha_agregado: new Date().toISOString().slice(0, 19),
          };

          await createFavorito(newFavorito);
          toast.success("Se añadió a Favoritos");

          // Actualizar el estado local de favoritos
          setFavoritos([...favoritos, newFavorito]);
        }
        setIsFavorite(true);
      } else {
        // Si ya es favorito, eliminarlo del estado
        if (existingFavorite) {
          await deleteFavorito(existingFavorite.id_favorito);
          toast.success("Removida de favoritos");

          // Actualizar el estado local eliminando el favorito
          setFavoritos(favoritos.filter((fav) => fav.id_pregunta !== id_pregunta));
        }
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error al modificar favoritos:", error);
      // Revertir el estado si hay un error
      setIsFavorite(!isFavorite);
    } finally {
      setLoading(false);
    }
  };

  // Buscar la opción correcta
  const opcionCorrecta = opciones.find((opcion) => opcion.es_correcta);

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-100 shadow-md flex gap-4 items-center">
      {/* Botón de favoritos */}
      {loading ? (
        <ReactLoading type="spin" color="#d9b16b" height={15} width={15} />
      ) : (
        <button disabled={loading || !isFavorite} onClick={toggleFavorite} className="focus:outline-none">
          {isFavorite ? (
            <IoHeart className="text-primary w-6 h-6" />
          ) : (
            <IoHeartOutline className="text-primary w-6 h-6" />
          )}
        </button>
      )}

      <div>
        {/* Pregunta */}
        <div className="text-gray-500 text-sm font-semibold">{texto_pregunta}</div>

        {/* Explicación */}
        <p className="mt-2 text-gray-600 text-xs overflow-hidden text-ellipsis line-clamp-2">
          {explicacion_correcta}
        </p>

        {/* Opción correcta */}
        {opcionCorrecta && (
          <div className="flex items-center mt-4 text-sm">
            {opcionCorrecta.es_correcta ? (
              <IoCheckmarkCircleOutline className="text-green-600 w-5 h-5 mr-2" />
            ) : (
              <IoCloseCircleOutline className="text-red-600 w-5 h-5 mr-2" />
            )}
            <span className="text-xs font-semibold text-gray-600">
              {opcionCorrecta.texto_opcion}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
