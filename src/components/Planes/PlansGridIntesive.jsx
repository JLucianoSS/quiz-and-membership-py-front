import { FaBolt } from "react-icons/fa"; // Importar los íconos
import { PlanCard } from "..";
import { extractDescriptionWithoutFeatures, extractFeaturesFromDescription } from "@/utils/extractDescription";
import { planes } from "@/data/plans"; // Asegúrate de importar el arreglo combinado

export const PlansGridIntesive = ({ user }) => {
  // Filtramos los planes intensivos
  const planesIntensivos = planes.filter(plan => plan.tipo_de_plan === "Plan Intensivo");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
      {planesIntensivos.map((plan) => {
        const features = extractFeaturesFromDescription(plan.descripcion); 
        const cleanDescription = extractDescriptionWithoutFeatures(plan.descripcion); 

        return (
          <PlanCard
            key={plan.id_plan}
            id={plan.id_plan}
            title={plan.nombre}
            description={cleanDescription} 
            features={features} 
            currentPlan={false}
            disabled={false}
            icon={<FaBolt className="text-primary" />}
            price={plan.precio}
          />
        );
      })}
    </div>
  );
};
