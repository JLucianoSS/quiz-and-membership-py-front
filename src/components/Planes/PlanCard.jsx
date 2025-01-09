"use client"
import Link from "next/link";

export const PlanCard = ({ title, description, features, link, buttonText, currentPlan, disabled, icon, price }) => {
  return (
    <div className={`bg-white p-8 shadow-lg rounded-md border md:px-12 md:py-14 ${currentPlan ? 'border-green-500 border-2' : 'border-gray-100'}`}>
      {/* Mostrar el ícono antes del título */}
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex gap-2 items-center">
          <h3 className="text-2xl font-bold">{title}</h3>
          {icon && <div className="text-2xl">{icon}</div>}
        </div>
        <h5 className="text-xl font-semibold">{price} <span className="text-sm">PYG</span></h5>
      </div>

      <p className="text-gray-600 mb-6">{description}</p>

      <ul className="mb-6 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            {feature}
          </li>
        ))}
      </ul>

      {currentPlan && <span className="inline-block mb-4 text-xs text-white bg-green-500 py-1 px-2 rounded-lg">Plan Actual</span>}

      {/* Condicional para deshabilitar el botón si el plan está adquirido */}
      <Link
        href={link}
        className={`flex justify-center w-full max-w-full sm:max-w-[250px] ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} text-white py-2 rounded-lg transition-all duration-300`}
        onClick={(e) => disabled && e.preventDefault()}
      >
        {disabled ? "Adquirido" : buttonText}
      </Link>
    </div>
  );
};
