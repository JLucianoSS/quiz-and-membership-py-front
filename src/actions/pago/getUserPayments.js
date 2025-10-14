"use server"

export const getUserPayments = async (idUser, page = 1, limit = 10) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pago/user/${idUser}?page=${page}&limit=${limit}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: "no-store",
        }
      );
  
      const result = await response.json();
  
      if (result.statusCode !== 200) {
        throw new Error(result.message || 'Error desconocido');
      }
  
      return {
        success: true,
        message: result.message,
        data: result.data,
        pagination: result.pagination,
      };
    } catch (error) {
      return {
        status: 500,
        message: error.message,
      };
    }
}
