// Función para extraer solo la descripción sin los guiones y el contenido entre guiones
export const extractDescriptionWithoutFeatures = (description) => {
  const featureRegex = /-.*?-/g; // Expresión regular para encontrar el contenido entre guiones
  return description.replace(featureRegex, "").trim(); // Reemplazar ese contenido con una cadena vacía y eliminar espacios extra
};

// Función para extraer características de la descripción
export const extractFeaturesFromDescription = (description) => {
  const featureRegex = /-(.*?)-/;
  const match = description.match(featureRegex);
  return match ? match[1].split(",").map((feature) => feature.trim()) : [];
};
