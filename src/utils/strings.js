export function extractInfoFromSlug(slug) {
  // Encuentra la posición del último guion
  const lastDashIndex = slug.lastIndexOf("-");

  // Extrae la parte del string antes del último guion y reemplaza los guiones por espacios
  let name = slug.slice(0, lastDashIndex).replace(/-/g, " ");

  // Capitaliza la primera letra de cada palabra
  name = name.replace(/\b\w/g, (char) => char.toUpperCase());

  // Aquí puedes restaurar las tildes si tienes un mapeo de las palabras original -> con tilde
  // Por ejemplo, un objeto de mapeo { "ciencias": "Ciencias", "medicina": "Medicina" }
  // Para un caso más genérico, necesitarías un diccionario o una base de datos

  // Extrae el ID, que es la parte después del último guion
  const id = parseInt(slug.slice(lastDashIndex + 1), 10);

  // Retorna un objeto con el nombre capitalizado y el ID
  return {
    name,
    id,
  };
}


export function convertToSlug(text) {
  return text
    .normalize("NFD") // Normaliza las letras con tilde
    .replace(/[\u0300-\u036f]/g, "") // Remueve los acentos
    .toLowerCase() // Convierte todo el texto a minúsculas
    .trim() // Elimina los espacios en blanco al principio y al final
    .replace(/[\s]+/g, "-") // Reemplaza los espacios por guiones
    .replace(/[^\w\-]+/g, "") // Elimina cualquier carácter que no sea alfanumérico o un guion
    .replace(/\-\-+/g, "-"); // Reemplaza múltiples guiones consecutivos por un solo guion
}
