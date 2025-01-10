import { PlanCard } from "..";
import { extractDescriptionWithoutFeatures, extractFeaturesFromDescription } from "@/utils/extractDescription";
import { planes } from "@/data/plans"; // Asegúrate de importar el arreglo combinado

export const PlansGrid = ({ user }) => {
  // Filtramos solo los planes básicos
  const planesBasicos = planes.filter(plan => plan.tipo_de_plan === "Plan Básico");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
      {planesBasicos.map((plan) => {
        const features = extractFeaturesFromDescription(plan.descripcion);
        const cleanDescription = extractDescriptionWithoutFeatures(plan.descripcion); 

        return (
          <PlanCard
            key={plan.id_plan}
            id={plan.id_plan}
            title={plan.nombre}
            description={cleanDescription} // Descripción limpia sin características
            features={features} // Características extraídas
            currentPlan={false} 
            disabled={false} 
            icon={""}
            price={plan.precio}
          />
        );
      })}
    </div>
  );
};
