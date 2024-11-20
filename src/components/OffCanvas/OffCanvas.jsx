"use client"; // Asegurarse de que este componente solo se ejecute en el lado del cliente
import { useRef, useState, useEffect } from "react";

// Función para eliminar las tildes de las palabras
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const Offcanvas = ({ isOpen, onClose, title, items, selectedItems, onSelect }) => {
  const offcanvasRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar los items basados en el término de búsqueda
  const filteredItems = items.filter((item) => 
    removeAccents(item.nombre.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase()))
  );

  const toggleItem = (item) => {
    if (selectedItems.includes(item.nombre)) {
      onSelect(selectedItems.filter((i) => i !== item.nombre));
    } else {
      onSelect([...selectedItems, item.nombre]);
    }
  };

  // Cerrar el Offcanvas si se hace clic fuera de su contenido
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (offcanvasRef.current && !offcanvasRef.current.contains(event.target)) {
        onClose(); // Cerrar el Offcanvas
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Función para limpiar el campo de búsqueda
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Desactivar el scroll en el body CUANDO SE ABRA EL OFFCANVA
  useEffect(() => {
    if (isOpen) {
      // Desactivar el scroll en el body
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar el scroll cuando se cierra el offcanvas
      document.body.style.overflow = "";
    }

    // Limpiar efecto cuando se desmonta el componente
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-50 flex items-end bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div
        ref={offcanvasRef} // Referencia al área del Offcanvas
        className={`bg-white w-full rounded-t-lg p-4 transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            
            {/* Buscador colocado al lado del título */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 h-[35px] pr-8" // Espacio para la "X"
              />
              {/* Botón de "X" para limpiar el input */}
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <button onClick={onClose} className="text-gray-600">Cerrar</button>
        </div>

        <div className="flex flex-wrap gap-2 max-h-[80vh] overflow-y-auto">
          {/* Mostrar solo los elementos filtrados */}
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item)}
                className={`px-4 py-2 rounded-md ${selectedItems.includes(item.nombre) ? 'bg-primary text-white' : 'bg-gray-200'}`}
              >
                {item.nombre}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No se encontró ningún resultado.</p> // Mensaje si no hay resultados
          )}
        </div>
      </div>
    </div>
  );
};
