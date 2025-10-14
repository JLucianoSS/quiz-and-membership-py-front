"use server"

export const getUserWithPayments = async (idUser) => {
    try {
      // Intentar usar el endpoint optimizado primero
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${idUser}?optimized=true&includePagos=true&limit=5`, {
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
      console.log('🔄 Fallback: Usando endpoint original para getUserWithPayments');
      
      // Si falla, usar el endpoint original
      try {
        const fallbackResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${idUser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: "no-store",
        });
    
        const fallbackResult = await fallbackResponse.json();
    
        if (fallbackResult.statusCode !== 200) {
          throw new Error(fallbackResult.message || 'Error desconocido');
        }
    
        return {
          success: true,
          message: fallbackResult.message,
          data: fallbackResult.data,
        };
      } catch (fallbackError) {
        return {
          status: 500,
          message: fallbackError.message,
        };
      }
    }
}
