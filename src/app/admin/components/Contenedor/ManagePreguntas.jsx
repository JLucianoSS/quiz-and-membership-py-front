"use client";
import { useState, useEffect } from "react";
import { IoAddCircle, IoChevronUp, IoChevronDown } from "react-icons/io5";
import { CustomLoading, Offcanvas2 } from "@/components";
import { FormAddPregunta, PaginationAdmin, TablePreguntas } from "..";
import { getOpciones, getPreguntas, getSubtemas } from "@/actions";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";


export const ManagePreguntas = () => {
  const itemsPerPage = 15; // Definir cuántas preguntas mostrar por página
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // Estado para abrir/cerrar el Offcanvas
  const [isContentVisible, setIsContentVisible] = useState(true); // Estado para mostrar/ocultar contenido
  const [loading, setLoading] = useState(true);
  const [subtemas, setSubtemas] = useState([])
  const [preguntas, setPreguntas] = useState([])
  const [opciones, setOpciones] = useState([])
  const { refreshTable } = useRedrawStore();

  // Calcular los elementos que se mostrarán según la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = preguntas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(preguntas.length / itemsPerPage);


  // Función para alternar visibilidad del contenido
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  /* TRAER LOS SUBTEMAS Y/0 PREGUNTAS Y OPCIONES */
  useEffect(() => {
    const fetchSubAndQuesAndOpt = async () => {
      setLoading(true);
      const responseSub = await getSubtemas();
      setSubtemas(responseSub.data);
      const responsePregun = await getPreguntas();
      setPreguntas(responsePregun.data);
      const responseOpcio = await getOpciones();
      setOpciones(responseOpcio.data);
      setLoading(false);
    };
    fetchSubAndQuesAndOpt();
  }, [refreshTable]);

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

        {/* Tabla de Preguntas */}
        {loading ? <CustomLoading className="h-[200px]" height={28} width={28}/> : 
        <TablePreguntas preguntas={currentItems} subtemas={subtemas} opciones={opciones}/>}

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
