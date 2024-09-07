"use client"; // Asegurarse de que este componente solo se ejecute en el lado del cliente
import { useRef, useEffect } from "react";

export const Offcanvas = ({ isOpen, onClose, title, items, selectedItems, onSelect }) => {
  const offcanvasRef = useRef(null);

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

  return (
    <div className={`fixed inset-0 z-50 flex items-end bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div
        ref={offcanvasRef} // Referencia al área del Offcanvas
        className={`bg-white w-full rounded-t-lg p-4 transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600">Cerrar</button>
        </div>
        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item)}
              className={`px-4 py-2 rounded-md ${selectedItems.includes(item.nombre) ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              {item.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
