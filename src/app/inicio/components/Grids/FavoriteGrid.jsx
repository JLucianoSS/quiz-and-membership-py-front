"use client";

import { getPreguntaById, getUserById } from "@/actions";
import { useEffect, useState } from "react";
import { FavoriteCard } from "..";
import { CustomLoading } from "@/components";

export const FavoriteGrid = ({ iduser }) => {
  const [preguntas, setPreguntas] = useState([]); // Cambiar a array vacío
  const [loading, setLoading] = useState(true); // Se inicia con 'true' para mostrar el loading inicialmente
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchPreguntasFavoritas = async () => {
      try {
        const user = await getUserById(iduser);
        setUser(user.data);
        // Extraemos los ids de las preguntas favoritas
        const favoritos = user.data.favoritos;
        const preguntas = await Promise.all(
          favoritos.map(async (favorito) => {
            const pregunta = await getPreguntaById(favorito.id_pregunta);
            return {
              ...pregunta.data,
              fecha_agregado: favorito.fecha_agregado,
            };
          })
        );
        setPreguntas(preguntas.sort((a, b) => b.id_pregunta - a.id_pregunta));
      } catch (error) {
        console.error("Error fetching favorite questions:", error);
      } finally {
        setLoading(false); // Setear 'loading' a false después de que termina la carga
      }
    };
    fetchPreguntasFavoritas();
  }, [reload]); // Añadir 'favoritos' como dependencia

  if (loading) {
    return (
      <CustomLoading
        color="#d9b16b"
        height={24}
        width={24}
        className="pt-4 flex justify-center"
      />
    );
  }

  return (
    <>
      <div className="flex justify-end text-sm text-blue-400 hover:underline pb-2">
        <button onClick={ ()=>setReload(!reload) }>Actualizar</button>
      </div>
      {preguntas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-[120px]">
          {preguntas.map((pregunta, index) => (
            <FavoriteCard key={index} user={user} {...pregunta} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center border text-gray-400 border-gray-300 rounded-lg p-3 mb-[120px]">
          No tienes preguntas favoritas.
        </div>
      )}
    </>
  );
};
