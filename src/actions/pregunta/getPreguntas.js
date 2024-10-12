"use server"

export const getPreguntas = async () => {
    try {
      // Realizamos la petición al backend externo
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pregunta`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: "no-store",
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();
  
      // Verificamos el statusCode que retorna el backend
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Error desconocido');
      }
  
      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      // Manejo de errores y retorno del mensaje proporcionado por el backend
      return {
        status: 500,
        message: error.message,
      };
    }
  }
  