"use client";
import { useState } from "react";
import { ApplyButton, FilterBy, FilterByYear } from "..";
import { Headerpage, Offcanvas } from "@/components";
import { IoAddCircleOutline } from "react-icons/io5"; // Importamos solo el ícono de agregar

export const ViewFilters = ({ modulos, temas, subtemas, preguntas }) => {
  const [selectedModulos, setSelectedModulos] = useState([]);
  const [selectedTemas, setSelectedTemas] = useState([]);
  const [selectedSubtemas, setSelectedSubtemas] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]); // Estado para controlar el año seleccionado

  // Estados para controlar el Offcanvas
  const [isTemasOpen, setIsTemasOpen] = useState(false);
  const [isSubtemasOpen, setIsSubtemasOpen] = useState(false);

  // Determinar si el botón debe estar habilitado
  const isApplyButtonDisabled = !(
    selectedModulos.length > 0 &&
    selectedTemas.length > 0 &&
    selectedSubtemas.length > 0
  );

  // Manejar selección de módulos
  const toggleModulo = (modulo) => {
    if (selectedModulos.includes(modulo)) {
      setSelectedModulos(selectedModulos.filter((m) => m !== modulo));
    } else {
      setSelectedModulos([...selectedModulos, modulo]);
    }
  };

  // Función para remover tema o subtema al hacer clic
  const toggleTema = (tema) => {
    if (selectedTemas.includes(tema)) {
      setSelectedTemas(selectedTemas.filter((t) => t !== tema));
    } else {
      setSelectedTemas([...selectedTemas, tema]);
    }
  };

  const toggleSubtema = (subtema) => {
    if (selectedSubtemas.includes(subtema)) {
      setSelectedSubtemas(selectedSubtemas.filter((s) => s !== subtema));
    } else {
      setSelectedSubtemas([...selectedSubtemas, subtema]);
    }
  };

  // Función para aplicar filtros y consolear los resultados
  const aplicarFiltros = () => {
    const filtros = {
      modulos: selectedModulos,
      temas: selectedTemas,
      subtemas: selectedSubtemas,
      year: selectedYear,
    };
    console.log(filtros); // Mostrar en consola los filtros seleccionados
  };

  return (
    <>
      <div className="bg-white max-w-[600px] mx-auto px-6 h-full pb-[4rem]">
        <Headerpage titulo="Encuentra tus preguntas" />
        
        {/* Filtro por Módulos */}
        <FilterBy
          titulo="Selecciona módulos"
          filterBy={formatModulos(modulos)} // Formateamos los módulos antes de enviarlos
          selectedItems={selectedModulos}
          toggleItem={toggleModulo}
        />
        
        {/* Filtro por Temas */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Añadir temas</h2>
          <div className="flex flex-wrap items-center gap-2">
            {selectedTemas.map((tema) => (
              <button
                key={tema}
                onClick={() => toggleTema(tema)} // Al hacer clic se remueve
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                {tema}
              </button>
            ))}
            <button onClick={() => setIsTemasOpen(true)}>
              <IoAddCircleOutline size={32} className="text-primary" />
            </button>
          </div>
        </div>

        {/* Offcanvas para Temas */}
        <Offcanvas
          isOpen={isTemasOpen}
          onClose={() => setIsTemasOpen(false)}
          title="Temas"
          items={formatTemas(temas)} // Formateamos los temas antes de enviarlos
          selectedItems={selectedTemas}
          onSelect={setSelectedTemas}
        />

        {/* Filtro por Subtemas */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Añadir subtemas</h2>
          <div className="flex flex-wrap items-center gap-2">
            {selectedSubtemas.map((subtema) => (
              <button
                key={subtema}
                onClick={() => toggleSubtema(subtema)} // Al hacer clic se remueve
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                {subtema}
              </button>
            ))}
            <button onClick={() => setIsSubtemasOpen(true)}>
              <IoAddCircleOutline size={32} className="text-primary" />
            </button>
          </div>
        </div>

        {/* Offcanvas para Subtemas */}
        <Offcanvas
          isOpen={isSubtemasOpen}
          onClose={() => setIsSubtemasOpen(false)}
          title="Subtemas"
          items={formatSubtemas(subtemas)} // Formateamos los subtemas antes de enviarlos
          selectedItems={selectedSubtemas}
          onSelect={setSelectedSubtemas}
        />
        
        {/* Filtro por Año */}
        <FilterByYear preguntas={preguntas} onYearSelect={setSelectedYear} />
      </div>

      {/* Botón Aplicar */}
      <ApplyButton
        onApply={aplicarFiltros}
        preguntas={preguntas.length}
        isDisabled={isApplyButtonDisabled} // Propiedad para controlar si está deshabilitado
      />
    </>
  );
};

// Función para formatear los módulos antes de enviarlos
const formatModulos = (modulos) => {
  return modulos.map((modulo) => ({
    id: modulo.id_Modulo,
    nombre: modulo.nombre_modulo, // Aseguramos que 'nombre' esté en el formato esperado
  }));
};

// Función para formatear los temas antes de enviarlos
const formatTemas = (temas) => {
  return temas.map((tema) => ({
    id: tema.id_tema,
    nombre: tema.nombre_tema,
  }));
};

// Función para formatear los subtemas antes de enviarlos
const formatSubtemas = (subtemas) => {
  return subtemas.map((subtema) => ({
    id: subtema.id_subtema,
    nombre: subtema.nombre_subtema,
  }));
};
