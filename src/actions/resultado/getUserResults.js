"use server"

import { getUserResultsFallback } from "./getUserResultsFallback";

export const getUserResults = async (idUser, page = 1, limit = 20, includeDetails = false) => {
    try {
      // Intentar usar el endpoint optimizado primero
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resultado/user/${idUser}?page=${page}&limit=${limit}&includeDetails=${includeDetails}`, 
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
      console.log('🔄 Fallback: Usando getUserResultsFallback para resultados');
      // Si falla, usar el método de fallback
      return await getUserResultsFallback(idUser, page, limit, includeDetails);
    }
}
