"use client";

import { getPreguntaById, getUserFavorites } from "@/actions";
import { useEffect, useState } from "react";
import { FavoriteCard } from "..";
import { CustomLoading } from "@/components";

export const FavoriteGrid = ({ iduser }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchPreguntasFavoritas = async () => {
      try {
        setLoading(true);
        const response = await getUserFavorites(iduser, currentPage, itemsPerPage);
        
        console.log('🔍 Debug FavoriteGrid - getUserFavorites response:', {
          success: response.success,
          hasData: !!response.data,
          dataLength: response.data?.length || 0,
          pagination: response.pagination,
          error: response.message
        });
        
        if (response.success) {
          const favoritos = response.data;
          
          // Obtener los detalles de cada pregunta favorita
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
          setTotalPages(response.pagination.totalPages);
          setUser({ id_user: iduser });
        }
      } catch (error) {
        console.error("Error fetching favorite questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPreguntasFavoritas();
  }, [reload, currentPage, iduser]);

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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {preguntas.map((pregunta, index) => (
              <FavoriteCard key={index} user={user} {...pregunta} />
            ))}
          </div>
          
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-[120px]">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
              >
                Anterior
              </button>
              
              <div className="flex items-center px-4 bg-gray-100 rounded-lg">
                <span className="font-medium mx-1">{currentPage}</span>
                <span className="mx-1">de</span>
                <span className="font-medium mx-1">{totalPages}</span>
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center border text-gray-400 border-gray-300 rounded-lg p-3 mb-[120px]">
          No tienes preguntas favoritas.
        </div>
      )}
    </>
  );
};
