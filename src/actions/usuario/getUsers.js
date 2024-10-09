"use server"

// TRAE TODOS LOS USUARIOS
export const getUsers = async () => {
    try {
      // Realizamos la petición al backend externo
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();
  
      // Verificamos el statusCode que retorna el backend
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Error desconocido');
      }
  
      // Retornamos la lista de usuarios
      return new Response(JSON.stringify(result.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      // Manejo de errores y retorno del mensaje proporcionado por el backend
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  