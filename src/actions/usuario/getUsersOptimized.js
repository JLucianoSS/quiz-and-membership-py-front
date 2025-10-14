"use server"

// TRAE TODOS LOS USUARIOS CON DATOS BÁSICOS Y PAGOS
export const getUsersOptimized = async () => {
    try {
      // Realizamos la petición al backend externo con optimización
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?optimized=true&includePagos=true&limit=5`, {
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
