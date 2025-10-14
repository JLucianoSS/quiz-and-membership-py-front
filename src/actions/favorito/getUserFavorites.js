"use server"

import { getUserFavoritesFallback } from "./getUserFavoritesFallback";

export const getUserFavorites = async (idUser, page = 1, limit = 20) => {
    try {
      // Intentar usar el endpoint optimizado primero
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/favorito/user/${idUser}?page=${page}&limit=${limit}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: "no-store",
        }
      );
  
      const result = await response.json();
  
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Error desconocido');
      }
  
      return {
        success: true,
        message: result.message,
        data: result.data,
        pagination: result.pagination,
      };
    } catch (error) {
      console.log('🔄 Fallback: Usando getUserFavoritesFallback para favoritos');
      // Si falla, usar el método de fallback
      return await getUserFavoritesFallback(idUser, page, limit);
    }
}
