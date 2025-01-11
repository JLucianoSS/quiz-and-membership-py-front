"use client";
import { PlanCard } from "..";
import { extractDescriptionWithoutFeatures, extractFeaturesFromDescription } from "@/utils/extractDescription";
import { useEffect, useState } from "react";
import { getPlanes } from "@/actions";

export const PlansGrid = ({ user }) => {
  const [planesBasicos, setPlanesBasicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const respPlanes = await getPlanes();
        if (respPlanes.success) {
          setPlanesBasicos(respPlanes.data.filter((plan) => plan.tipo_plan === "Basico")); // Filtramos solo los planes básicos
        } else {
          console.log("Error al traer los planes: ", respPlanes.message);
        }
      } catch (error) {
        console.log("Ocurrio un error al traer los planes: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanes();
  }, []);

  // Componente de carga (skeleton) para simular la carga de las cards
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
      {loading ? (
        // Muestra el skeleton mientras los planes están cargando
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        // Muestra los planes una vez cargados
        planesBasicos.map((plan) => {
          const features = extractFeaturesFromDescription(plan.descripcion);
          const cleanDescription = extractDescriptionWithoutFeatures(plan.descripcion);

          return (
            <PlanCard
              key={plan.id_Plan}
              id={plan.id_Plan}
              title={plan.nombre}
              description={cleanDescription} // Descripción limpia sin características
              features={features} // Características extraídas
              currentPlan={false}
              disabled={false}
              icon={""}
              price={plan.precio}
            />
          );
        })
      )}
    </div>
  );
};
