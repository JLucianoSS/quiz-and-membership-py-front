"use client";
import { useRef, useState, useEffect } from "react";

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const Offcanvas = ({ isOpen, onClose, title, items, selectedItems, onSelect }) => {
  const offcanvasRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) => 
    removeAccents(item.nombre.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase()))
  );

  const toggleItem = (item) => {
    const currentSelectedNames = selectedItems;
    
    if (currentSelectedNames.includes(item.nombre)) {
      // Si el item ya está seleccionado, lo removemos
      const filteredNames = currentSelectedNames.filter((name) => name !== item.nombre);
      const filteredItems = items.filter(i => filteredNames.includes(i.nombre));
      
      // Actualizamos tanto nombres como IDs
      onSelect(filteredItems);
    } else {
      // Si el item no está seleccionado, lo agregamos
      const newSelectedNames = [...currentSelectedNames, item.nombre];
      const selectedFullItems = items.filter(i => newSelectedNames.includes(i.nombre));
      
      // Actualizamos tanto nombres como IDs
      onSelect(selectedFullItems);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (offcanvasRef.current && !offcanvasRef.current.contains(event.target)) {
        onClose();
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

  const clearSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-50 flex items-end bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div
        ref={offcanvasRef}
        className={`bg-white w-full rounded-t-lg p-4 transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 h-[35px] pr-8"
              />
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
            <p className="text-gray-500">No se encontró ningún resultado.</p>
          )}
        </div>
      </div>
    </div>
  );
};