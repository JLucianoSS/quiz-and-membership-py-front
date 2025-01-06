"use client";
import { useEffect, useState } from "react";
import { HistorialCard } from "..";
import { getUserById } from "@/actions";
import { CustomLoading } from "@/components";
import { IoChevronBackOutline, IoChevronForwardOutline, IoPlayBackOutline, IoPlayForwardOutline } from "react-icons/io5";

export const HistorialGrid = ({ iduser }) => {
  const [user, setUser] = useState(null);
  const [preguntasConResultados, setPreguntasConResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const user = await getUserById(iduser);
        setUser(user.data);
        const resultados = user.data.resultados;
        setPreguntasConResultados(
          resultados.sort((a, b) => b.id_resultado - a.id_resultado)
        );
      } catch (error) {
        console.error("Error fetching resultados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, [reload]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Función mejorada para normalizar texto
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
      .replace(/[¿?¡!.,]/g, "") // Elimina signos de puntuación comunes
      .trim();
  };

  // Función para verificar si una cadena contiene todas las palabras de búsqueda
  const containsAllSearchTerms = (text, searchTerms) => {
    const normalizedText = normalizeText(text);
    return searchTerms.every(term => normalizedText.includes(term));
  };

  const filteredResults = preguntasConResultados.filter((resultado) => {
    // Si no hay término de búsqueda, solo aplicamos el filtro de estado
    if (!searchTerm.trim()) {
      if (filterStatus === "todas") return true;
      if (filterStatus === "correctas") return resultado.es_correcta;
      if (filterStatus === "incorrectas") return !resultado.es_correcta;
      return true;
    }

    // Normalizamos y dividimos el término de búsqueda en palabras
    const searchTerms = normalizeText(searchTerm).split(" ").filter(term => term.length > 0);
    
    // Verificamos si el texto de la pregunta contiene todas las palabras de búsqueda
    const searchMatch = containsAllSearchTerms(
      resultado.pregunta.texto_pregunta,
      searchTerms
    );
    
    // Aplicamos el filtro de estado
    if (filterStatus === "todas") return searchMatch;
    if (filterStatus === "correctas") return searchMatch && resultado.es_correcta;
    if (filterStatus === "incorrectas") return searchMatch && !resultado.es_correcta;
    
    return searchMatch;
  });

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <CustomLoading
        color="#d9b16b"
        height={24}
        width={24}
        className="flex justify-center items-center h-[50vh]"
      />
    );
  }

  return (
    <div className="space-y-4 mb-[150px]">
      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar pregunta..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset page when search changes
          }}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <span className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterStatus("todas")}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            filterStatus === "todas"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilterStatus("correctas")}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            filterStatus === "correctas"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Correctas
        </button>
        <button
          onClick={() => setFilterStatus("incorrectas")}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            filterStatus === "incorrectas"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Incorrectas
        </button>
      </div>

      {/* Grid de resultados */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-3" style={{ gridAutoRows: "minmax(100px, auto)" }}>
          {currentItems.map((resultado, index) => (
            <div key={index} className="w-full">
              <HistorialCard user={user} {...resultado} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center border text-gray-400 border-gray-300 rounded-lg p-3">
          No se encontraron resultados.
        </div>
      )}

       {/* Paginación con navegación completa */}
       {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {/* Botón Primera Página */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
            title="Primera página"
          >
            <IoPlayBackOutline className="w-5 h-5" />
          </button>

          {/* Botón Anterior */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
          >
            <IoChevronBackOutline className="w-5 h-5" />
          </button>

          {/* Indicador de Página */}
          <div className="flex items-center px-4 bg-gray-100 rounded-lg">
            <span className="hidden sm:inline">Pag</span>{" "}
            <span className="font-medium mx-1">{currentPage}</span>{" "}
            <span className=" sm:hidden">/</span>{" "}
            <span className="hidden sm:inline">de</span>{" "}
            <span className="font-medium mx-1">{totalPages}</span>
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
          >
            <IoChevronForwardOutline className="w-5 h-5" />
          </button>

          {/* Botón Última Página */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
            title="Última página"
          >
            <IoPlayForwardOutline className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
