
"use server"

export const deleteFavorito = async (idFavorito) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorito/${idFavorito}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();
  
      // Verificamos el statusCode retornado por el backend
      if (result.statusCode !== 204) {
        throw new Error(result.message || 'Error al eliminar el favorito');
      }
  
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      // Si ocurrió un error, retornamos el mensaje del backend o el mensaje capturado
      return {
        success: false,
        message: error.message,
      };
    }
  };