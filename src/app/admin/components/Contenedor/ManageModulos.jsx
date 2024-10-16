"use client";
import { useState, useEffect } from "react";
import { IoAddCircle, IoChevronUp, IoChevronDown } from "react-icons/io5";
import { CustomLoading, Offcanvas2 } from "@/components";
import { FormAddModulo, PaginationAdmin, TableModulos } from "..";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { getModulos } from "@/actions";

export const ManageModulos = () => {
  const itemsPerPage = 10; // Definir cuántos modulos mostrar por página
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Estado para abrir/cerrar el Offcanvas
  const [isContentVisible, setIsContentVisible] = useState(true); // Estado para mostrar/ocultar contenido
  const [loading, setLoading] = useState(true);
  const [modulos, setModulos] = useState([])
  const { refreshTable } = useRedrawStore();

  // Calcular los elementos que se mostrarán según la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = modulos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(modulos.length / itemsPerPage);

  // Función para alternar visibilidad del contenido
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  /* TRAER TODOS LOS MODULOS */
  useEffect(() => {
    const fetchModulos = async () => {
      setLoading(true);
      const response = await getModulos();
      setModulos(response.data);
      setLoading(false);
    };
    fetchModulos();
  }, [refreshTable]);

  return (
    <div>
      {/* Título clickeable para mostrar/ocultar el contenido */}
      <h1 
        className="text-[16px] cursor-pointer font-bold flex items-center gap-2" 
        onClick={toggleContentVisibility}
      >
        Módulos ({modulos.length}) 
        {isContentVisible ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </h1>

      {/* Contenido con animación */}
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isContentVisible ? 'max-h-[1000px]' : 'max-h-0'}`}>
        
        {/* Tabla de modulos */}
        {loading ? <CustomLoading className="h-[200px]" height={28} width={28}/> : 
        <TableModulos modulos={currentItems} /> }
          
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
