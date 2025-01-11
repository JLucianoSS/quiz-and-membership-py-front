"use client";
import { FaBolt } from "react-icons/fa"; // Importar los íconos
import { PlanCard } from "..";
import { extractDescriptionWithoutFeatures, extractFeaturesFromDescription } from "@/utils/extractDescription";
import { getPlanes } from "@/actions";
import { useEffect, useState } from "react";

// Función reutilizable para Skeleton Cards
const SkeletonCard = () => (
  <div className="border border-gray-300 shadow rounded-md p-4 w-full mx-auto">
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="bg-gray-200 rounded h-6 w-3/4"></div> {/* Título */}
      <div className="bg-gray-200 rounded h-4 w-5/6"></div> {/* Descripción */}
      <div className="bg-gray-200 rounded h-4 w-2/3"></div> {/* Descripción */}
      <div className="bg-gray-200 rounded h-8 w-1/2"></div> {/* Precio */}
    </div>
  </div>
);

export const PlansGridIntesive = ({ user }) => {
  const [planesIntensivos, setPlanesIntensivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const respPlanes = await getPlanes();
        if (respPlanes.success) {
          setPlanesIntensivos(respPlanes.data.filter((plan) => plan.tipo_plan === "Intensivo")); // Filtramos los planes intensivos
        } else {
          console.log("Error al traer los planes: ", respPlanes.message);
        }
      } catch (error) {
        console.log("Ocurrió un error al traer los planes: ", error);
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };
    fetchPlanes();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
      {loading ? (
        // Muestra los Skeleton Cards mientras los planes se están cargando
        Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
      ) : (
        // Muestra los planes una vez que se han cargado
        planesIntensivos.map((plan) => {
          const features = extractFeaturesFromDescription(plan.descripcion);
          const cleanDescription = extractDescriptionWithoutFeatures(plan.descripcion);

          return (
            <PlanCard
              key={plan.id_Plan}
              id={plan.id_Plan}
              title={plan.nombre}
              description={cleanDescription}
              features={features}
              currentPlan={false}
              disabled={false}
              icon={<FaBolt className="text-primary" />}
              price={plan.precio}
            />
          );
        })
      )}
    </div>
  );
};
