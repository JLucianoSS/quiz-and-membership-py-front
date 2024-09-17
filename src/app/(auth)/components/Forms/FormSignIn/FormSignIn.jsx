"use client";
import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/config/theme";
import { IoMailOutline, IoLockClosedOutline, IoEyeOff, IoEye, } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export const FormSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const onSubmit = async(data) => {
    // console.log(data);
    // Lógica de inicio de sesión
    setLoading(true);
    const { email, password } = data;
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    // console.log(result);
    if (result.ok) {
      window.location.replace("/inicio");
    } else {
      toast.error("Credenciales incorrectas");
      setLoading(false);
    }
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
          Inicia Sesión
        </h1>
      </div>

      <div>
        <div className="relative flex items-center mt-6">
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
      </div>

      <div>
        <div className="relative flex items-center mt-4">
          <span className="absolute">
            <IoLockClosedOutline className="w-6 h-6 mx-3 text-gray-300" />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            className={`block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:ring-black ease-linear transition-all duration-150 ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
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
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className={`w-full px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-secondary  focus:outline-none`}
        >
         {loading ? "Cargando..." : "Acceder"}
        </button>

        {/* <p className="mt-4 text-center text-gray-600">o inicia con</p>

        <Link
          href="#"
          className="flex items-center justify-center px-6 py-3 mt-4 text-gray-800 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
        >
          <FaGoogle className="w-6 h-6 mx-2" />
          <span className="mx-2">Google</span>
        </Link> */}

        <div className="mt-6 text-center">
          <Link
            href="/register"
            className={`text-sm text-primary hover:underline`}
          >
            ¿Aun no tienes cuenta? Regístrate
          </Link>
        </div>
      </div>
    </form>
  );
};
