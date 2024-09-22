
"use client"
import { useEffect } from "react";

export const Offcanvas2 = ({ isOpen, onClose, title, children }) => {
  // Manejador de clic para cerrar el Offcanvas cuando se haga clic fuera
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("offcanvas-background")) {
      onClose();
    }
  };

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
    <div
      className={`fixed inset-0 z-50 flex items-end bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} offcanvas-background`}
      onClick={handleClickOutside} // Manejador para detectar clics fuera del contenido
    >
      <div
        className={`bg-white w-full rounded-t-lg p-4 transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()} // Prevenir que el clic dentro del contenido cierre el offcanvas
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600">Cerrar</button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">
          {children} {/* Contenido flexible */}
        </div>
      </div>
    </div>
  );
};
