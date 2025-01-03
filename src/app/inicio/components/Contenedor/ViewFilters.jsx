"use client";
import { useEffect, useState } from "react";
import { ApplyButton, FilterBy, FilterByYear } from "..";
import { Headerpage, Offcanvas } from "@/components";
import { IoAddCircleOutline } from "react-icons/io5";
import { getFilterPreguntas, getTemasByModulos } from "@/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const ViewFilters = ({ modulos }) => {
  // Estados para nombres (UI)
  const [selectedModulos, setSelectedModulos] = useState([]);
  const [selectedTemas, setSelectedTemas] = useState([]);
  const [selectedSubtemas, setSelectedSubtemas] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  // Estados para IDs
  const [modulosIds, setModulosIds] = useState([]);
  const [temasIds, setTemasIds] = useState([]);
  const [subtemasIds, setSubtemasIds] = useState([]);

  // Estado para temas filtrados
  const [availableTemas, setAvailableTemas] = useState([]);
  const [availableSubtemas, setAvailableSubtemas] = useState([]);

  const [isTemasOpen, setIsTemasOpen] = useState(false);
  const [isSubtemasOpen, setIsSubtemasOpen] = useState(false);

   // Nuevo estado para el conteo de preguntas filtradas
   const [filteredQuestionsCount, setFilteredQuestionsCount] = useState(0);
   const [questions, setQuestions] = useState([])

   const router = useRouter();

  const isApplyButtonDisabled = !(
    selectedModulos.length > 0 &&
    selectedTemas.length > 0 &&
    selectedSubtemas.length > 0
  );
  

  // Efecto para contar preguntas filtradas
  useEffect(() => {
    const fetchFilteredQuestions = async () => {
      // Solo hacer la consulta si tenemos al menos un filtro seleccionado
      if (modulosIds.length > 0) {
        try {
          const response = await getFilterPreguntas({
            modulos: modulosIds,
            temas: temasIds,
            subtemas: subtemasIds,
            anio: selectedYear ? selectedYear : undefined
          });


          if (response.success) {
            // console.log('Preguntas filtradas:', response.data);
            // console.log('Número de preguntas:', response.data.length);
            setQuestions(response.data)
            setFilteredQuestionsCount(response.data.length);
          }
        } catch (error) {
          console.error("Error al obtener preguntas filtradas:", error);
        }
      } else {
        setFilteredQuestionsCount(0);
      }
    };

    fetchFilteredQuestions();
  }, [modulosIds, temasIds, subtemasIds, selectedYear]);

  // Efecto para actualizar subtemas cuando cambian los temas seleccionados
  useEffect(() => {
    const updateSubtemas = () => {
      if (temasIds.length > 0) {
        // Filtrar subtemas basados en los temas seleccionados
        const filteredSubtemas = availableTemas
          .filter(tema => temasIds.includes(tema.id_tema))
          .flatMap(tema => tema.subtemas);
        
        setAvailableSubtemas(filteredSubtemas);

        // Limpiar subtemas seleccionados que ya no corresponden a los temas actuales
        const validSubtemasIds = filteredSubtemas.map(subtema => subtema.id_subtema);
        const newSubtemasIds = subtemasIds.filter(id => 
          validSubtemasIds.includes(id)
        );
        const newSelectedSubtemas = selectedSubtemas.filter((_, index) =>
          validSubtemasIds.includes(subtemasIds[index])
        );

        setSubtemasIds(newSubtemasIds);
        setSelectedSubtemas(newSelectedSubtemas);
      } else {
        // Si no hay temas seleccionados, limpiar subtemas
        setAvailableSubtemas([]);
        setSelectedSubtemas([]);
        setSubtemasIds([]);
      }
    };

    updateSubtemas();
  }, [temasIds, availableTemas]);

  // Efecto para actualizar temas cuando cambian los módulos seleccionados
  useEffect(() => {
    const updateTemas = async () => {
      if (modulosIds.length > 0) {
        try {
          const response = await getTemasByModulos(modulosIds);
          
          if (response.success) {
            setAvailableTemas(response.data);

            // Filtrar temas seleccionados que ya no están disponibles
            const validTemasIds = response.data.map(tema => tema.id_tema);
            const newTemasIds = temasIds.filter(id => validTemasIds.includes(id));
            const newSelectedTemas = selectedTemas.filter((_, index) => 
              validTemasIds.includes(temasIds[index])
            );
            
            setTemasIds(newTemasIds);
            setSelectedTemas(newSelectedTemas);

            // Los subtemas se actualizarán automáticamente por el otro useEffect
          }
        } catch (error) {
          console.error("Error fetching temas:", error);
        }
      } else {
        // Si no hay módulos seleccionados, limpiar todo
        setAvailableTemas([]);
        setSelectedTemas([]);
        setTemasIds([]);
        // Los subtemas se limpiarán automáticamente por el otro useEffect
      }
    };

    updateTemas();
  }, [modulosIds]);

  const toggleModulo = (modulo, id) => {
    if (selectedModulos.includes(modulo)) {
      setSelectedModulos(selectedModulos.filter((m) => m !== modulo));
      setModulosIds(modulosIds.filter((currentId) => currentId !== id));
    } else {
      setSelectedModulos([...selectedModulos, modulo]);
      setModulosIds([...modulosIds, id]);
    }
  };

  const toggleTema = (tema, id) => {
    if (selectedTemas.includes(tema)) {
      setSelectedTemas(selectedTemas.filter((t) => t !== tema));
      setTemasIds(temasIds.filter((currentId) => currentId !== id));
    } else {
      setSelectedTemas([...selectedTemas, tema]);
      setTemasIds([...temasIds, id]);
    }
  };

  const toggleSubtema = (subtema, id) => {
    if (selectedSubtemas.includes(subtema)) {
      setSelectedSubtemas(selectedSubtemas.filter((s) => s !== subtema));
      setSubtemasIds(subtemasIds.filter((currentId) => currentId !== id));
    } else {
      setSelectedSubtemas([...selectedSubtemas, subtema]);
      setSubtemasIds([...subtemasIds, id]);
    }
  };

  const aplicarFiltros = () => {
    if (questions.length > 0) {
      // Guardar las preguntas en localStorage
      localStorage.setItem("questions", JSON.stringify(questions));
      
      // Crear la query string con los subtemas seleccionados
      const subtemasQuery = selectedSubtemas.join(",");
      const queryString = `values=${subtemasQuery.toString()}`;

      localStorage.setItem("queryString", subtemasQuery);
      
      // Redirigir a la nueva URL con los subtemas seleccionados
      router.push(`/preguntas/subtema/p/1/?${queryString}`);
   
    } else {
      toast.error("No se han encontrado preguntas");
    }
  };
  

  return (
    <>
      <div className="bg-white max-w-[600px] mx-auto px-6 h-full pb-[4rem]">
        <Headerpage titulo="Encuentra tus preguntas" />
        
        <FilterBy
          titulo="Selecciona módulos"
          filterBy={formatModulos(modulos)}
          selectedItems={selectedModulos}
          toggleItem={(modulo, id) => {
            console.log(modulo,id);
            toggleModulo(modulo, id)
          }}
        />
        
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Añadir temas</h2>
          <div className="flex flex-wrap items-center gap-2">
            {selectedTemas.map((tema, index) => (
              <button
                key={temasIds[index]}
                onClick={() => toggleTema(tema, temasIds[index])}
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                {tema}
              </button>
            ))}
            <button 
              onClick={() => setIsTemasOpen(true)}
              disabled={modulosIds.length === 0}
              className={`${modulosIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <IoAddCircleOutline size={32} className="text-primary" />
            </button>
          </div>
        </div>

        <Offcanvas
          isOpen={isTemasOpen}
          onClose={() => setIsTemasOpen(false)}
          title="Temas"
          items={formatTemas(availableTemas)}
          selectedItems={selectedTemas}
          onSelect={(items) => {
            const nombres = items.map(item => item.nombre);
            const ids = items.map(item => item.id);
            setSelectedTemas(nombres);
            setTemasIds(ids);
          }}
        />

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Añadir subtemas</h2>
          <div className="flex flex-wrap items-center gap-2">
            {selectedSubtemas.map((subtema, index) => (
              <button
                key={subtemasIds[index]}
                onClick={() => toggleSubtema(subtema, subtemasIds[index])}
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                {subtema}
              </button>
            ))}
            <button 
              onClick={() => setIsSubtemasOpen(true)}
              disabled={temasIds.length === 0}
              className={`${temasIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <IoAddCircleOutline size={32} className="text-primary" />
            </button>
          </div>
        </div>

        <Offcanvas
          isOpen={isSubtemasOpen}
          onClose={() => setIsSubtemasOpen(false)}
          title="Subtemas"
          items={formatSubtemas(availableSubtemas)}
          selectedItems={selectedSubtemas}
          onSelect={(items) => {
            const nombres = items.map(item => item.nombre);
            const ids = items.map(item => item.id);
            setSelectedSubtemas(nombres);
            setSubtemasIds(ids);
          }}
        />
        
        <FilterByYear onYearSelect={setSelectedYear} />
      </div>

      <ApplyButton
        onApply={aplicarFiltros}
        preguntas={filteredQuestionsCount}
        isDisabled={isApplyButtonDisabled}
      />
    </>
  );
};

const formatModulos = (modulos) => {
  return modulos.map((modulo) => ({
    id: modulo.id_modulo,
    nombre: modulo.nombre_modulo,
  }));
};

const formatTemas = (temas) => {
  return temas.map((tema) => ({
    id: tema.id_tema,
    nombre: tema.nombre_tema,
  }));
};

const formatSubtemas = (subtemas) => {
  return subtemas.map((subtema) => ({
    id: subtema.id_subtema,
    nombre: subtema.nombre_subtema,
  }));
};