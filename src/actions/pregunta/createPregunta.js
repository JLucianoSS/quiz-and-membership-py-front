
"use server"

export const createPregunta = async (preguntaData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pregunta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preguntaData),
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();
  
      // Verificamos el statusCode retornado por el backend
      if (result.statusCode !== 201) {
        throw new Error(result.message || 'Error al crear una pregunta');
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