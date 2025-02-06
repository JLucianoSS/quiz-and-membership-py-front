
"use server"

export const createUser = async (userData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // Convertimos la respuesta en JSON
      const result = await response.json();

      console.log(result);
      
  
      // Verificamos el statusCode retornado por el backend
      // if (result.statusCode !== 201) {
      //   // Si no se creó el usuario correctamente, lanzamos un error con los mensajes del backend
      //   throw new Error(result.message || 'Error al crear el usuario');
      // }
  
      // Si todo salió bien, retornamos los datos del usuario creado
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
  