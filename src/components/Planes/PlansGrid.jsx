import { PlanCard } from "./PlanCard";

export const PlansGrid = ({ user }) => {
  // Definir los planes
  const plans = [
    {
      title: "Plan Free",
      description: "Perfecto para aquellos que quieren comenzar sin compromisos.",
      features: ["Acceso a contenido básico", "5 proyectos mensuales", "Soporte por correo electrónico"],
      link: "/register?plan=free",
      buttonText: "Empezar gratis",
      planRole: "Visitante",
    },
    {
      title: "Plan Premium",
      description: "Ideal para profesionales que buscan más control y herramientas avanzadas.",
      features: ["Acceso a todo el contenido premium", "Proyectos ilimitados", "Soporte prioritario 24/7", "Integraciones avanzadas con API"],
      link: user ? "/inicio/comprar" : "/register?plan=premium",
      buttonText: "Contratar Premium",
      planRole: "Suscriptor",
    },
  ];

  // Lógica para bloquear botones:
  const isFreeAcquired = user?.role === "Visitante"; // Si el rol es Visitante, adquirió el Plan Free
  const isPremiumAcquired = user?.role === "Suscriptor"; // Si el rol es Suscriptor, adquirió el Plan Premium

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
        />
      ))}
    </div>
  );
};
