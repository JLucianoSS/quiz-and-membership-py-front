
"use server"

export const createResultado = async (resultadoData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultadoData),
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();
  
      // Verificamos el statusCode retornado por el backend
      if (result.statusCode !== 201) {
        throw new Error(result.message || 'Error al crear al crear resultado');
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