"use client";
import { useState } from "react";
import { ApplyButton, FilterBy, FilterByYear } from "..";
import { Offcanvas } from "@/components";
import { IoAddCircleOutline } from "react-icons/io5"; // Importamos solo el ícono de agregar

export const ViewFilters = ({ especialidades, subespecialidades, temas, preguntas }) => {
  const [selectedEspecialidades, setSelectedEspecialidades] = useState([]);
  const [selectedSubespecialidades, setSelectedSubespecialidades] = useState([]);
  const [selectedTemas, setSelectedTemas] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);

  // Estados para controlar el Offcanvas
  const [isSubespecialidadesOpen, setIsSubespecialidadesOpen] = useState(false);
  const [isTemasOpen, setIsTemasOpen] = useState(false);

  // Manejar selección de especialidades
  const toggleEspecialidad = (especialidad) => {
    if (selectedEspecialidades.includes(especialidad)) {
      setSelectedEspecialidades(selectedEspecialidades.filter((e) => e !== especialidad));
    } else {
      setSelectedEspecialidades([...selectedEspecialidades, especialidad]);
    }
  };

  // Función para remover subespecialidad o tema al hacer clic
  const toggleSubespecialidad = (subespecialidad) => {
    if (selectedSubespecialidades.includes(subespecialidad)) {
      setSelectedSubespecialidades(selectedSubespecialidades.filter((sub) => sub !== subespecialidad));
    } else {
      setSelectedSubespecialidades([...selectedSubespecialidades, subespecialidad]);
    }
  };

  const toggleTema = (tema) => {
    if (selectedTemas.includes(tema)) {
      setSelectedTemas(selectedTemas.filter((t) => t !== tema));
    } else {
      setSelectedTemas([...selectedTemas, tema]);
    }
  };

  // Función para aplicar filtros y consolear los resultados
  const aplicarFiltros = () => {
    const filtros = {
      especialidades: selectedEspecialidades,
      subespecialidades: selectedSubespecialidades,
      temas: selectedTemas,
      year: selectedYear,
    };
    console.log(filtros);
  };

  return (
    <>
      <div className="px-4 lg:px-20 xl:px-44 ">
        {/* Especialidades */}
        <FilterBy
          titulo="Especialidades"
          filterBy={especialidades}
          selectedItems={selectedEspecialidades}
          toggleItem={toggleEspecialidad}
        />
        
        {/* Subespecialidades */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Subespecialidades</h2>
          <div className="flex flex-wrap items-center gap-2">
            {selectedSubespecialidades.map((sub) => (
              <button
                key={sub}
                onClick={() => toggleSubespecialidad(sub)} // Al hacer clic se remueve
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                {sub}
              </button>
            ))}
            <button onClick={() => setIsSubespecialidadesOpen(true)}>
              <IoAddCircleOutline size={32} className="text-primary" />
            </button>
          </div>
        </div>
        {/* Offcanvas para Subespecialidades */}
        <Offcanvas
          isOpen={isSubespecialidadesOpen}
          onClose={() => setIsSubespecialidadesOpen(false)}
          title="Subespecialidades"
          items={subespecialidades}
          selectedItems={selectedSubespecialidades}
          onSelect={setSelectedSubespecialidades}
        />

        {/* Temas */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Temas</h2>
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
          items={temas}
          selectedItems={selectedTemas}
          onSelect={setSelectedTemas}
        />
        
        {/* Año */}
        <FilterByYear preguntas={preguntas} onYearSelect={setSelectedYear} />
      </div>

      {/* Botón Aplicar */}
      <ApplyButton onApply={aplicarFiltros} preguntas={preguntas.length} />
    </>
  );
};
