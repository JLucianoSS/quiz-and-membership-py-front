"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

// Función para determinar si el plan es válido según la fecha de inicio y fin
const isPlanActive = (plan) => {
  const currentDate = new Date();
  const endDate = new Date(plan.fecha_fin);

  return currentDate <= endDate;
};

export const FormEditUser = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user.email,
      password: "•••••••••••••••",
    },
  });

  const [isEditing, setIsEditing] = useState({
    email: false,
    password: false,
  });

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (data) => {
    console.log("Datos guardados: ", data);
    setIsEditing({
      email: false,
      password: false,
    });
  };

  // Lógica para el plan activo
  let planInfo = { label: "", color: "" };
  if (user.pagos.length > 0 && isPlanActive(user.pagos[0].plan)) {
    planInfo = {
      label: user.pagos[0].plan.nombre,
      color: "bg-primary", // Puedes definir el color basado en el tipo de plan si es necesario
    };
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xs rounded-lg shadow-sm bg-white p-6"
    >
      {/* Plan del usuario */}
      {user.role !== "Administrador" && planInfo.label && (
        <p className="text-center text-gray-500 mb-4 flex flex-col gap-[6px] items-center justify-center">
          {planInfo.label}
          <Link href="/inicio/planes" className="bg-primary py-1 px-2 rounded text-white">
            Ver plan
          </Link>
        </p>
      )}

      {/* Email */}
      <div className="mt-4 flex items-center">
        <div className="flex-grow">
          <p className="text-xs text-gray-400">CORREO</p>
          <input
            type="email"
            className={`border-b-2 w-full text-sm py-2 px-3 rounded-md transition-all duration-150 ${
              isEditing.email ? "border-primary bg-gray-50" : "border-gray-300 bg-gray-100"
            }`}
            {...register("email")}
            disabled={!isEditing.email}
          />
        </div>
      </div>

      {/* Password */}
      <div className="mt-4 flex items-center">
        <div className="flex-grow">
          <p className="text-xs text-gray-400">CONTRASEÑA</p>
          <input
            type="password"
            className={`border-b-2 w-full text-sm py-2 px-3 rounded-md transition-all duration-150 ${
              isEditing.password ? "border-primary bg-gray-50" : "border-gray-300 bg-gray-100"
            }`}
            {...register("password")}
            disabled={!isEditing.password}
          />
        </div>
      </div>

      {/* Botón Suscribirse */}
      {user.role === "Free" && (
        <button
          type="button"
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-green-600 transition-colors"
        >
          Suscribirse al Plan Premium
        </button>
      )}
    </form>
  );
};
