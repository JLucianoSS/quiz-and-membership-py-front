"use server"

/* FILTRA PREGUNTAS POR VARIOS CRITERIOS (MODULOS, TEMAS, SUBTEMAS, AÑO) */
export const getFilterPreguntas = async (filters = {}) => {
  try {
    // Construimos los parámetros de la consulta dinámicamente
    const queryParams = new URLSearchParams();

    // Verificamos y agregamos cada parámetro solo si está definido
    if (filters.modulos) queryParams.append('modulos', filters.modulos);
    if (filters.temas) queryParams.append('temas', filters.temas);
    if (filters.subtemas) queryParams.append('subtemas', filters.subtemas);
    if (filters.anio) queryParams.append('anio', filters.anio);

    // Construimos la URL con los parámetros dinámicos
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pregunta/filter?${queryParams.toString()}`;

    // Realizamos la petición al backend externo
    const response = await fetch(url, {
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
