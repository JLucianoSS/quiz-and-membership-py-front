import { FaStar, FaCrown } from "react-icons/fa"; // Importar los íconos
import { PlanCard } from "..";

export const PlansGrid = ({ user }) => {
  // Definir los planes
  const plans = [
    {
      title: "Plan Free",
      description: "Perfecto para aquellos que quieren comenzar y ver las ventajas sin compromisos",
      features: ["Acceso a contenido básico", "5 preguntas por día", "Soporte por correo electrónico", "Prueba diaria"],
      link: "/register?plan=free",
      buttonText: "Empezar gratis",
      planRole: "Visitante",
      icon: <FaStar className="text-primary" />, // Icono para el plan Free
    },
    {
      title: "Plan Premium",
      description: "Ideal para profesionales que buscan más control y herramientas avanzadas.",
      features: ["Acceso a todo el contenido premium", "Preguntas ilimitadas", "Soporte prioritario 24/7", "Guarda tus preguntas favoritas"],
      link: user ? "/inicio/comprar" : "/register?plan=premium",
      buttonText: "Contratar Premium",
      planRole: "Suscriptor",
      icon: <FaCrown className="text-primary" />, // Icono para el plan Premium
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
        />
      ))}
    </div>
  );
};
