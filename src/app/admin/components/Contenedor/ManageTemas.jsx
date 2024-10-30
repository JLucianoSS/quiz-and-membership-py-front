"use client";
import { useState, useEffect } from "react";
import { CustomLoading } from "@/components";
import { TableTemas } from "..";
import { getModulos, getTemas } from "@/actions";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";

/**
 * Componente que gestiona la obtención y visualización de temas
 */
export const ManageTemas = () => {
  const [loading, setLoading] = useState(true);
  const [modulos, setModulos] = useState([]);
  const [temas, setTemas] = useState([]);
  const { refreshTable } = useRedrawStore();

  useEffect(() => {
    const fetchModAndThemes = async () => {
      setLoading(true);
      try {
        // Carga paralela de datos usando Promise.all
        const [responseMod, responseTem] = await Promise.all([
          getModulos(),
          getTemas()
        ]);
        
        setModulos(responseMod.data);
        setTemas(responseTem.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchModAndThemes();
  }, [refreshTable]);

  return (
    <div>
      <h1 className="text-[16px] font-bold mb-4">
        Temas ({temas.length})
      </h1>

      {loading ? (
        <CustomLoading className="h-[200px]" height={28} width={28}/>
      ) : (
        <TableTemas 
          temas={temas} 
          modulos={modulos}
        />
      )}
    </div>
  );
};