
"use client";
import { useState, useEffect } from "react";
import { IoAddCircle, IoChevronUp, IoChevronDown } from "react-icons/io5";
import { CustomLoading, Offcanvas2 } from "@/components";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { FormAddSubTema, PaginationAdmin, TableSubTemas } from "..";
import { getSubtemas, getTemas } from "@/actions";

export const ManageSubtemas = () => {
  const itemsPerPage = 10; // Definir cuántos subtemas mostrar por página
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Estado para abrir/cerrar el Offcanvas
  const [isContentVisible, setIsContentVisible] = useState(true); // Estado para mostrar/ocultar contenido
  const [loading, setLoading] = useState(true);
  const [temas, setTemas] = useState([])
  const [subtemas, setSubtemas] = useState([])
  const { refreshTable } = useRedrawStore();

  // Calcular los elementos que se mostrarán según la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subtemas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(subtemas.length / itemsPerPage);

  // Función para alternar visibilidad del contenido
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  /* TRAER LOS TEMAS Y SUBTEMAS */
  useEffect(() => {
    const fetchThemesAndSub = async () => {
      setLoading(true);
      const responseTem = await getTemas();
      setTemas(responseTem.data);
      const responseSub = await getSubtemas();
      setSubtemas(responseSub.data);
      setLoading(false);
    };
    fetchThemesAndSub();
  }, [refreshTable]);

  return (
    <div >
      {/* Título clickeable para mostrar/ocultar el contenido */}
      <h1
        className="text-[16px] cursor-pointer font-bold flex items-center gap-2"
        onClick={toggleContentVisibility}
      >
        Subtemas ({subtemas.length})
        {isContentVisible ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </h1>

      {/* Contenido con animación */}
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isContentVisible ? "max-h-[1000px]" : "max-h-0"
        }`}
      >

        {/* Tabla de Subtemas */}
        { loading ? <CustomLoading className="h-[200px]" height={28} width={28}/> :  
        <TableSubTemas subtemas={currentItems} temas={temas} /> }

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
