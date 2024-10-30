"use client";
import { useState, useEffect } from "react";
import { CustomLoading } from "@/components";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { TableSubTemas } from "..";
import { getSubtemas, getTemas } from "@/actions";

/**
 * Componente que gestiona la obtención y visualización de subtemas
 */
export const ManageSubtemas = () => {
  const [loading, setLoading] = useState(true);
  const [temas, setTemas] = useState([]);
  const [subtemas, setSubtemas] = useState([]);
  const { refreshTable } = useRedrawStore();

  useEffect(() => {
    const fetchThemesAndSub = async () => {
      setLoading(true);
      try {
        // Carga paralela de datos usando Promise.all
        const [responseTem, responseSub] = await Promise.all([
          getTemas(),
          getSubtemas()
        ]);
        
        setTemas(responseTem.data);
        setSubtemas(responseSub.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchThemesAndSub();
  }, [refreshTable]);

  return (
    <div>
      <h1 className="text-[16px] font-bold mb-4">
        Subtemas ({subtemas.length})
      </h1>

      {loading ? (
        <CustomLoading className="h-[200px]" height={28} width={28}/>
      ) : (
        <TableSubTemas 
          subtemas={subtemas} 
          temas={temas}
        />
      )}
    </div>
  );
};