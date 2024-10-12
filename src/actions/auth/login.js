"use server"

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    // Convertimos la respuesta en JSON
    const result = await response.json();

    // Verificamos si la respuesta es exitosa
    if (response.ok && result.message === "Login exitoso") {
      // Si el login fue exitoso, retornamos los datos del usuario
      return {
        success: true,
        message: result.message,
        user: result.user,
      };
    } else {
      // Si no fue exitoso, lanzamos un error con el mensaje recibido
      throw new Error(result.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    // Manejamos el error, que puede ser por una respuesta no exitosa o por un error de red
    let errorMessage = 'Error al iniciar sesión';
    let statusCode = 500;

    if (error.message === "Email o contraseña incorrecta") {
      errorMessage = error.message;
      statusCode = 401;
    }

    return {
      success: false,
      message: errorMessage,
      statusCode: statusCode,
      error: error.message === "Email o contraseña incorrecta" ? "Unauthorized" : "Error desconocido"
    };
  }
};