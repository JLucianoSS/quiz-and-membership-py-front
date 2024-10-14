"use client";
import { useState, useEffect } from "react";
import { IoAddCircle, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CustomLoading, Offcanvas2 } from "@/components";
import { FormAddTema, PaginationAdmin, TableTemas } from "..";
import { getModulos, getTemas } from "@/actions";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";

export const ManageTemas = () => {
  const itemsPerPage = 10; // Definir cuántos temas mostrar por página
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Estado para abrir/cerrar el Offcanvas
  const [isContentVisible, setIsContentVisible] = useState(true); // Estado para mostrar/ocultar contenido
  const [loading, setLoading] = useState(true);
  const [modulos, setModulos] = useState([])
  const [temas, setTemas] = useState([])
  const { refreshTable } = useRedrawStore();
  

  // Calcular los elementos que se mostrarán según la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = temas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(temas.length / itemsPerPage);

  // Función para alternar visibilidad del contenido
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  /* TRAER LOS MODULOS Y TEMAS */
  useEffect(() => {
    const fetchModAndThemes = async () => {
      setLoading(true);
      const responseMod = await getModulos();
      setModulos(responseMod.data);
      const responseTem = await getTemas();
      setTemas(responseTem.data);
      setLoading(false);
    };
    fetchModAndThemes();
  }, [refreshTable]);

  return (
    <div>
      {/* Título clickeable para mostrar/ocultar el contenido */}
      <h1
        className="text-[16px] cursor-pointer font-bold flex items-center gap-2"
        onClick={toggleContentVisibility}
      >
        Temas ({temas.length}){" "}
        {isContentVisible ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </h1>

      {/* Contenido con animación */}
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isContentVisible ? "max-h-[1000px]" : "max-h-0"
        }`}
      >

        {/* Tabla de temas */}
         {loading ? <CustomLoading className="h-[200px]" height={28} width={28}/> : 
         <TableTemas
          temas={currentItems}
          modulos={modulos}
        />}

        {/* Paginación */}
        <PaginationAdmin
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

    </div>
  );
};
