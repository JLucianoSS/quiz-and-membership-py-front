"use server"

export const getUserBasic = async (idUser) => {
    try {
      // Usar el endpoint optimizado del backend para obtener solo datos básicos
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${idUser}?optimized=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: "no-store",
      });
  
      const result = await response.json();
  
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Error desconocido');
      }
  
      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
}
