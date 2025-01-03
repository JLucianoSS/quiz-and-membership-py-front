"use server"
/* FILTRA TEMAS POR MODULO O MODULOS (idModulos) */
export const getTemasByModulos = async (idModulos) => {
  try {
    // Aseguramos que idModulos siempre sea un array
    const moduloIdsArray = Array.isArray(idModulos) ? idModulos : [idModulos];

    // Unimos los ids con una coma para formar el parámetro de la consulta
    const moduloIds = moduloIdsArray.join(',');

    // Realizamos la petición al backend externo con los idModulos como parámetro de la query
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tema/filter?moduloIds=${moduloIds}`, {
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
};
