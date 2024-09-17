"use client";
import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/config/theme";
import { IoMailOutline, IoLockClosedOutline, IoEyeOff, IoEye, IoPersonOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

export const FormSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    // Lógica de registro
    setLoading(true);
    const { firstName, lastName, email, password, acceptTerms } = data;
    if (!acceptTerms) {
      toast.error("Debes aceptar los términos del servicio");
      setLoading(false);
      return;
    }

    // Simulación de lógica de registro
    setTimeout(() => {
      toast.success("Registro exitoso");
      setLoading(false);
      // Redirigir al usuario
      window.location.replace("/");
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="flex flex-col items-center">
        <Link href="/">
          <Image
            className="w-[180px] h-full"
            src={LOGO}
            width={500}
            height={500}
            alt="Logo-icon"
          />
        </Link>
        <h1 className="mt-6 text-xl font-semibold text-gray-800 capitalize ">
          Regístrate
        </h1>
      </div>

      {/* Nombres */}
      <div className="relative flex items-center mt-6">
        <span className="absolute">
          <IoPersonOutline className="w-6 h-6 mx-3 text-gray-300" />
        </span>
        <input
          type="text"
          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:ring-black ease-linear transition-all duration-150 ${
            errors.firstName ? "border-red-500" : ""
          }`}
          placeholder="Nombres"
          {...register("firstName", {
            required: "Los nombres son obligatorios",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Solo se permiten letras en los nombres",
            },
          })}
        />
      </div>
      {errors.firstName && (
        <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
      )}

      {/* Apellidos */}
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <IoPersonOutline className="w-6 h-6 mx-3 text-gray-300" />
        </span>
        <input
          type="text"
          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:ring-black ease-linear transition-all duration-150 ${
            errors.lastName ? "border-red-500" : ""
          }`}
          placeholder="Apellidos"
          {...register("lastName", {
            required: "Los apellidos son obligatorios",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Solo se permiten letras en los apellidos",
            },
          })}
        />
      </div>
      {errors.lastName && (
        <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
      )}

      {/* Correo electrónico */}
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <IoMailOutline className="w-6 h-6 mx-3 text-gray-300" />
        </span>
        <input
          type="email"
          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:ring-black ease-linear transition-all duration-150 ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder="Correo electrónico"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "El correo no es válido",
            },
          })}
        />
      </div>
      {errors.email && (
        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
      )}

      {/* Contraseña */}
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <IoLockClosedOutline className="w-6 h-6 mx-3 text-gray-300" />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:ring-black ease-linear transition-all duration-150 ${
            errors.password ? "border-red-500" : ""
          }`}
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números",
            },
          })}
        />
        <span
          className="absolute right-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <IoEye className="w-6 h-6 text-gray-300" />
          ) : (
            <IoEyeOff className="w-6 h-6 text-gray-300" />
          )}
        </span>
      </div>
      {errors.password && (
        <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
      )}

      {/* Aceptar términos */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          className="w-5 h-5 text-primary bg-gray-100 border rounded focus:ring-primary"
          {...register("acceptTerms", {
            required: "Debes aceptar los términos del servicio",
          })}
        />
        <label className="ml-2 text-sm text-gray-600">
          Acepto los{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Términos del servicio
          </Link>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="mt-1 text-xs text-red-500">{errors.acceptTerms.message}</p>
      )}

      {/* Botón de registro */}
      <div className="mt-6">
        <button
          type="submit"
          className={`w-full px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-secondary focus:outline-none`}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </form>
  );
};
