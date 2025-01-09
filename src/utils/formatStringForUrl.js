
export function formatStringForUrl(str) {
  return str
    .toLowerCase() // Convertir a minúsculas
    .normalize("NFD") // Eliminar acentos
    .replace(/[\u0300-\u036f]/g, "") // Eliminar caracteres diacríticos (acentos, tildes)
    .replace(/[^\w\s-]/g, "") // Eliminar caracteres no alfanuméricos excepto guiones y espacios
    .trim() // Eliminar espacios al principio y al final
    .replace(/\s+/g, "-") // Reemplazar espacios por guiones
    .replace(/-+/g, "-"); // Reemplazar múltiples guiones consecutivos por uno solo
}
