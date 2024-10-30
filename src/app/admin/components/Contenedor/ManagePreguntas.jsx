"use client";
import { useState, useEffect } from "react";
import { CustomLoading } from "@/components";
import { TablePreguntas } from "..";
import { getOpciones, getPreguntas, getSubtemas } from "@/actions";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";

/**
 * Componente que gestiona la obtención y visualización de preguntas
 * Maneja la carga de datos y el estado de carga
 */
export const ManagePreguntas = () => {
  // Estados para almacenar los datos
  const [loading, setLoading] = useState(true);
  const [subtemas, setSubtemas] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const { refreshTable } = useRedrawStore();

  // Efecto para cargar los datos iniciales y cuando se actualiza la tabla
  useEffect(() => {
    const fetchSubAndQuesAndOpt = async () => {
      setLoading(true);
      try {
        // Carga paralela de datos usando Promise.all
        const [responseSub, responsePregun, responseOpcio] = await Promise.all([
          getSubtemas(),
          getPreguntas(),
          getOpciones()
        ]);
        
        // Actualización de estados con los datos obtenidos
        setSubtemas(responseSub.data);
        setPreguntas(responsePregun.data);
        setOpciones(responseOpcio.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubAndQuesAndOpt();
  }, [refreshTable]);

  return (
    <div>
      <h1 className="text-[16px] font-bold mb-4">
        Preguntas ({preguntas.length})
      </h1>

      {loading ? (
        <CustomLoading className="h-[200px]" height={28} width={28}/>
      ) : (
        <TablePreguntas 
          preguntas={preguntas} 
          subtemas={subtemas} 
          opciones={opciones}
        />
      )}
    </div>
  );
};