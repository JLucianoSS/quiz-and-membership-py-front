
"use server"

export const updateSubtema = async (idSubtema, subtemaData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subtema/${ idSubtema }`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subtemaData),
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();
  
      // Verificamos el statusCode retornado por el backend
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Error al actualizar el subtema');
      }
  
      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      // Si ocurrió un error, retornamos el mensaje del backend o el mensaje capturado
      return {
        success: false,
        message: error.message,
      };
    }
  };