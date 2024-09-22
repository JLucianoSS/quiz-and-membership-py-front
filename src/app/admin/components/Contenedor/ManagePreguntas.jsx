"use client";
import { useState } from "react";
import { IoAddCircle, IoChevronUp, IoChevronDown } from "react-icons/io5";
import { Offcanvas2 } from "@/components";
import { FormAddPregunta, PaginationAdmin, TablePreguntas } from "..";


export const ManagePreguntas = ({ subtemas, preguntas, opciones }) => {
  const itemsPerPage = 5; // Definir cuántas preguntas mostrar por página
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Estado para abrir/cerrar el Offcanvas
  const [isContentVisible, setIsContentVisible] = useState(true); // Estado para mostrar/ocultar contenido

  // Calcular los elementos que se mostrarán según la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = preguntas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(preguntas.length / itemsPerPage);

  // Función para abrir el Offcanvas
  const handleOpenOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };

  // Función para cerrar el Offcanvas
  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  // Función para alternar visibilidad del contenido
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div>
      {/* Título clickeable para mostrar/ocultar el contenido */}
      <h1
        className="text-[16px] cursor-pointer font-bold flex items-center gap-2"
        onClick={toggleContentVisibility}
      >
        Preguntas ({preguntas.length})
        {isContentVisible ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </h1>

      {/* Contenido con animación */}
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isContentVisible ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        {/* Botón de Agregar */}
        <div className="flex justify-start items-center my-2">
          <button
            className="flex items-center text-sm gap-1 text-white bg-primary px-2 py-1 rounded-md"
            onClick={handleOpenOffcanvas}
          >
            <IoAddCircle size={24} />
            <span>Agregar Pregunta</span>
          </button>
        </div>

        {/* Tabla de Preguntas */}
        <TablePreguntas preguntas={currentItems} temas={subtemas} />

        {/* Paginación */}
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Offcanvas para añadir preguntas */}
      <Offcanvas2
        isOpen={isOffcanvasOpen}
        onClose={handleCloseOffcanvas}
        title="Añadir Nueva Pregunta"
      >
        <FormAddPregunta temas={subtemas} onClose={handleCloseOffcanvas} />
      </Offcanvas2>
    </div>
  );
};
