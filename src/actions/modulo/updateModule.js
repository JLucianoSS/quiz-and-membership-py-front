
"use server"

export const updateModulo = async (idModulo, moduloData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/modulo/${ idModulo }`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduloData),
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();
  
      // Verificamos el statusCode retornado por el backend
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Error al actualizar el módulo');
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