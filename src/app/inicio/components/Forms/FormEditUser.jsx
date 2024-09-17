"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

export const FormEditUser = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "maysasha@gmail.com",
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xs rounded-lg shadow-sm bg-white p-6"
    >
      <p className="text-center text-gray-500 text-sm mb-4 flex flex-col gap-[6px] items-center justify-center">
        Plan {user.role === "Suscriptor" ? "Premium" : "Free"}
        <Link href="/inicio/planes" className="bg-primary py-1 px-2 rounded text-white">Renovar</Link>
      </p>

      {/* Email */}
      <div className="mt-4 flex items-center">
        <div className="flex-grow">
          <p className="text-xs text-gray-400">CORREO</p>
          <input
            type="email"
            className={`border-b-2 w-full text-sm py-2 px-3 rounded-md transition-all duration-150 ${
              isEditing.email
                ? "border-primary bg-gray-50"
                : "border-gray-300 bg-gray-100"
            }`}
            {...register("email")}
            disabled={!isEditing.email}
          />
        </div>
        <button
          type="button"
          onClick={() => handleEditClick("email")}
          className="ml-2 hover:text-primary transition-colors"
        >
          <FaEdit className="text-gray-500" />
        </button>
      </div>

      {/* Password */}
      <div className="mt-4 flex items-center">
        <div className="flex-grow">
          <p className="text-xs text-gray-400">CONTRASEÑA</p>
          <input
            type="password"
            className={`border-b-2 w-full text-sm py-2 px-3 rounded-md transition-all duration-150 ${
              isEditing.password
                ? "border-primary bg-gray-50"
                : "border-gray-300 bg-gray-100"
            }`}
            {...register("password")}
            disabled={!isEditing.password}
          />
        </div>
        <button
          type="button"
          onClick={() => handleEditClick("password")}
          className="ml-2 hover:text-primary transition-colors"
        >
          <FaEdit className="text-gray-500" />
        </button>
      </div>

      {/* Botón Guardar */}
      <button
        type="submit"
        className={`bg-primary text-white py-2 px-4 rounded-lg w-full mt-6 transition-opacity duration-150 ${
          isDirty ? "opacity-100" : "opacity-50"
        }`}
        disabled={!isDirty || isSubmitting}
      >
        Guardar
      </button>

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
