"use server"

export const getUserStats = async (idUser) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultado/user/${idUser}/stats`, {
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
