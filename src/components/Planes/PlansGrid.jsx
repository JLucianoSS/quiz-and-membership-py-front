import { FaStar, FaCrown } from "react-icons/fa"; // Importar los íconos
import { PlanCard } from "..";
import { formatStringForUrl } from "@/utils/formatStringForUrl";

export const PlansGrid = ({ user }) => {
  // Definir los planes
  const plans = [
    {
      title: "Plan Básico",
      description: "Acceso desde el 1 de febrero hasta el día del primer examen parcial.",
      features: ["Material específico para el 1er Parcial", "Banco completo de preguntas", "Simulacros interactivos"],
      link: `/register?plan=${formatStringForUrl("Plan Básico")}`,
      buttonText: "Adquirir plan",
      planRole: "Visitante",
      price: "179.000"
    },
    {
      title: "Plan Invierno",
      description: "Desde el 1 de febrero hasta el día del segundo examen parcial.",
      features: ["Todo el contenido del 1er y 2do Parcial.", "Banco completo de preguntas", "Ideal para quienes buscan continuidad"],
      link: `/register?plan=${formatStringForUrl("Plan Invierno")}`,
      buttonText: "Adquirir plan",
      planRole: "Suscriptor",
      price:"329.000"
    },
    {
      title: "Plan Completo 3x3",
      description: " Desde el 1 de febrero hasta el día del tercer examen parcial.",
      features: ["Recursos para los 3 parciales.", "Banco completo de preguntas", "Simulacros interactivos"],
      link: `/register?plan=${formatStringForUrl("Plan Completo 3x3")}`,
      buttonText: "Adquirir plan",
      planRole: "Suscriptor",
      price:"439.000"
    },
    {
      title: "Plan Premium Anual",
      description: "Desde el 1 de febrero hasta el día del examen final.",
      features: ["Todo el contenido de los 3 parciales.", "Recursos exclusivos", "Simulacros para el examen final."],
      link: `/register?plan=${formatStringForUrl("Plan Premium Anual")}`,
      buttonText: "Adquirir plan",
      planRole: "Suscriptor",
      price:"549.000"
    },
  ];

  // Lógica para bloquear botones:
  const isFreeAcquired = user?.role === "Visitante"; // Si el rol es Visitante, adquirió el Plan Free
  const isPremiumAcquired = user?.role === "Suscriptor"; // Si el rol es Suscriptor, adquirió el Plan Premium

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
      {plans.map((plan, index) => (
        <PlanCard
          key={index}
          title={plan.title}
          description={plan.description}
          features={plan.features}
          link={plan.link}
          buttonText={plan.buttonText}
          currentPlan={user?.role === plan.planRole} // Aplicar contorno y etiqueta si coincide con el rol
          disabled={isFreeAcquired && plan.planRole === "Visitante" || isPremiumAcquired} // Deshabilitar según el rol
          icon={plan.icon} // Pasar el ícono al componente
          price={plan.price}
        />
      ))}
    </div>
  );
};
