

export function obtenerOpcionesFiltradas(data) {
  return data.opciones.map((opcion) => ({
    texto_opcion: opcion.texto_opcion,
    es_correcta: opcion.es_correcta,
  }));
}
