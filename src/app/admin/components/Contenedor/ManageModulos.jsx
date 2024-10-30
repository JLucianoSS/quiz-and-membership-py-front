"use client";
import { useState, useEffect } from "react";
import { CustomLoading } from "@/components";
import { TableModulos } from "..";
import { useRedrawStore } from "@/store/redraw/useRedrawStore";
import { getModulos } from "@/actions";

/**
 * Componente que gestiona la obtención y visualización de módulos
 */
export const ManageModulos = () => {
  const [loading, setLoading] = useState(true);
  const [modulos, setModulos] = useState([]);
  const { refreshTable } = useRedrawStore();

  useEffect(() => {
    const fetchModulos = async () => {
      setLoading(true);
      try {
        const response = await getModulos();
        setModulos(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchModulos();
  }, [refreshTable]);

  return (
    <div>
      <h1 className="text-[16px] font-bold mb-4">
        Módulos ({modulos.length})
      </h1>

      {loading ? (
        <CustomLoading className="h-[200px]" height={28} width={28}/>
      ) : (
        <TableModulos modulos={modulos} />
      )}
    </div>
  );
};