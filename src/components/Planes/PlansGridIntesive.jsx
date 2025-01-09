import { FaBolt, FaMedal } from "react-icons/fa"; // Importar los íconos
import { PlanCard } from "..";
import { formatStringForUrl } from "@/utils/formatStringForUrl";

export const PlansGridIntesive = ({ user }) => {
  // Definir los planes
  const plans = [
    {
      title: "Int. 1er Parcial",
      description: "Acceso: 15 días antes del primer parcial.",
      features: ["Preguntas clave del 1er Parcial con respuestas explicadas.", "Simulacros exclusivos de alta dificultad."],
      link: `/register?plan=${formatStringForUrl("Int. 1er Parcial")}`,
      buttonText: "Adquirir plan",
      planRole: "Visitante",
      icon: <FaBolt className="text-primary"/>,
      price:"99.000"
    },
    {
      title: "Int. 2do Parcial",
      description: "Acceso: 15 días antes del segundo parcial.",
      features: ["Enfocado en temas del 2do Parcial.", "Simulacros exclusivos de alta dificultad."],
      link: `/register?plan=${formatStringForUrl("Int. 2do Parcial")}`,
      buttonText: "Adquirir plan",
      planRole: "Suscriptor",
      icon: <FaBolt className="text-primary"/>,
      price:"99.000"
    },
    {
      title: "Int. 3er Parcial",
      description: "Acceso: 15 días antes del tercer parcial.",
      features: ["Preguntas clave del 3er Parcial.", "Simulacros exclusivos"],
      link: `/register?plan=${formatStringForUrl("Int. 3er Parcial")}`,
      buttonText: "Adquirir plan",
      planRole: "Suscriptor",
      icon: <FaBolt className="text-primary"/>,
      price:"99.000"
    },
    {
      title: "Int. Final",
      description: "Acceso: 15 días antes del examen final.",
      features: ["Preguntas frecuentes y simulacros exclusivos para el examen final."],
      link: `/register?plan=${formatStringForUrl("Int. Final")}`,
      buttonText: "Adquirir plan",
      planRole: "Suscriptor",
      icon: <FaBolt className="text-primary"/>,
      price:"150.000"
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
