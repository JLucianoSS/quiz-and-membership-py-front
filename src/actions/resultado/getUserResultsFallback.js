"use server"

export const getUserResultsFallback = async (idUser, page = 1, limit = 20, includeDetails = false) => {
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
      const resultados = user?.resultados || [];
      
      // Aplicar paginación del lado del frontend
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResults = resultados.slice(startIndex, endIndex);
      
      // Ordenar por fecha más reciente
      const sortedResults = paginatedResults.sort((a, b) => 
        new Date(b.fecha_respuesta) - new Date(a.fecha_respuesta)
      );
  
      return {
        success: true,
        message: 'Resultados obtenidos exitosamente',
        data: sortedResults,
        pagination: {
          totalCount: resultados.length,
          totalPages: Math.ceil(resultados.length / limit),
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
