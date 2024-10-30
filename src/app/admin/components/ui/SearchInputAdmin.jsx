
"use client";
import { IoSearch, IoClose } from "react-icons/io5";

/**
 * Componente de búsqueda reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {string} props.searchTerm - Término de búsqueda
 * @param {function} props.setSearchTerm - Función para actualizar el término de búsqueda
 * @param {string} props.placeholder - Texto placeholder del input
 * @param {function} props.onClear - Función para limpiar la búsqueda
 */
export const SearchInputAdmin = ({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Buscar...",
  onClear 
}) => {
  return (
    <div className="relative flex-grow">
      <span className="absolute left-2 top-2 text-gray-400">
        <IoSearch size={22} />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="border p-2 rounded-md w-full pl-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute right-2 top-2 text-gray-500"
        >
          <IoClose size={24} />
        </button>
      )}
    </div>
  );
};