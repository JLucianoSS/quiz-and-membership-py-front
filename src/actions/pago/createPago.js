
"use server"

export const createPago = async (pagoData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pago`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pagoData),
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();
  
      // Verificamos el statusCode retornado por el backend
      if (result.statusCode !== 201) {
        throw new Error(result.message || 'Error al crear el pago');
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