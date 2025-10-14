"use server"

export const getUserFavoritesFallback = async (idUser, page = 1, limit = 20) => {
    try {
      // Usar el endpoint original pero con parámetros de optimización
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${idUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: "no-store",
      });
  
      const result = await response.json();
  
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Error desconocido');
      }
  
      const user = result.data;
      const favoritos = user?.favoritos || [];
      
      // Aplicar paginación del lado del frontend
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedFavorites = favoritos.slice(startIndex, endIndex);
      
      // Ordenar por fecha más reciente
      const sortedFavorites = paginatedFavorites.sort((a, b) => 
        new Date(b.fecha_agregado) - new Date(a.fecha_agregado)
      );
  
      return {
        success: true,
        message: 'Favoritos obtenidos exitosamente',
        data: sortedFavorites,
        pagination: {
          totalCount: favoritos.length,
          totalPages: Math.ceil(favoritos.length / limit),
          currentPage: page,
          limit: limit
        }
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
}
