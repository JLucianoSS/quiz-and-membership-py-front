"use client";
import { formatStringForUrl } from "@/utils/formatStringForUrl";
import Link from "next/link";

export const PlanCard = ({ id, title, description, features, currentPlan, disabled, icon, price }) => {
  return (
    <div className={`bg-white p-6 md:p-8 shadow-md rounded-lg border transition-transform duration-300 transform hover:scale-105 ${currentPlan ? 'border-green-500 border-2' : 'border-gray-200'}`}>
      {/* Mostrar el ícono antes del título */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-3xl">{icon}</div>}
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        </div>
        <h5 className="text-xl font-semibold text-gray-700">{price} <span className="text-sm">PYG</span></h5>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 mb-6">{description}</p>

      {/* Lista de características */}
      <ul className="mb-6 space-y-3 text-left text-gray-700">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500 mr-2">✔</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Etiqueta del plan actual */}
      {currentPlan && (
        <span className="inline-block mb-4 text-xs text-white bg-green-500 py-1 px-2 rounded-lg">
          Plan Actual
        </span>
      )}

      {/* Botón de adquisición del plan */}
      <Link
        href={`/adquirir/plan/checkout/${id}`}
        className={`flex justify-center w-full max-w-full sm:max-w-[240px] ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} text-white py-2 rounded-lg transition-all duration-300`}
        onClick={(e) => disabled && e.preventDefault()}
      >
        {disabled ? "Adquirido" : "Adquirir Plan"}
      </Link>
    </div>
  );
};
