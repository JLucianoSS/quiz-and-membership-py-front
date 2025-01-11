
import { extractDescriptionWithoutFeatures, extractFeaturesFromDescription } from "@/utils/extractDescription";
import { PlanCard } from "..";

export const MyPlan = ({ user }) => {
  if (!user?.pagos || user.pagos.length === 0) {
    return <div className="text-center p-4">No tienes un plan activo.</div>;
  }

  const currentDate = new Date();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {user.pagos.map(pago => {
        const plan = pago.plan;
        const isCurrentPlan = new Date(plan.fecha_fin) > currentDate;

        return (
          <PlanCard
            key={plan.id_Plan}
            id={plan.id_Plan}
            title={plan.nombre}
            description={extractDescriptionWithoutFeatures(plan.descripcion)}
            features={extractFeaturesFromDescription(plan.descripcion)}
            currentPlan={isCurrentPlan}
            disabled={true}
            icon=""
            price={plan.precio}
          />
        );
      })}
    </div>
  );
};

