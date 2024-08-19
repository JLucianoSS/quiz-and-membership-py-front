export const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  
  export const getFirstLetterCapitalize = (string) => {
    if (!string) return ''; // Maneja los casos en que string es null, undefined o cadena vacía
    return string.charAt(0).toUpperCase();
  };