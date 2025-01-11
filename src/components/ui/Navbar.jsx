"use client";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSidebarStore } from "@/store/ui"; // Ruta donde guardaste el store
import { LOGO } from "@/config/theme";
import { ActionCard } from "..";
import { useRouteActions } from "@/hooks/useRouterActions";

export const Navbar = ({ user }) => {
  const { toggleSidebar } = useSidebarStore();
  const actions = useRouteActions(user.id_user);

  // Función para verificar si el plan está activo
  const isPlanActive = (plan) => {
    const { fecha_inicio, fecha_fin } = plan;
    const fechaActual = new Date();
    const fechaFin = new Date(fecha_fin);

    return fechaActual <= fechaFin;
  };

  // Definir el texto y color según el tipo de plan del usuario
  const getPlanInfo = (plan) => {
    const { tipo_plan, nombre } = plan;

    let color = "";
    switch (tipo_plan) {
      case "Basico":
        color = "bg-green-400"; // Color verde para Basico
        break;
      case "Intensivo":
        color = "bg-yellow-400"; // Color amarillo para Intensivo
        break;
      default:
        color = "bg-gray-400"; // Color por defecto si no es Basico ni Intensivo
        break;
    }

    return { label: nombre, color };
  };

  // Obtener la información del plan solo si el plan está activo
  let planInfo = { label: "", color: "" };
  if (user && user.pagos.length > 0) {
    const ultimoPago = user.pagos[user.pagos.length - 1];
    if (isPlanActive(ultimoPago.plan)) {
      planInfo = getPlanInfo(ultimoPago.plan);
    }
  }

  // Si el rol es "Administrador", no mostrar el nombre del plan, sino "Admin" con su color
  const roleInfo =
    user && user.role === "Administrador"
      ? { label: "Admin", color: "bg-blue-400" } // Color azul para Administrador
      : planInfo; // Si no es Admin, mostrar el plan y su color

  return (
    <nav className="bg-[#212121] fixed w-full z-40">
      <div className="mx-auto px-6 lg:px-20 xl:px-44">
        <div className="flex justify-between items-center h-[52px]">
          <div className="flex items-center gap-4">
            {/* DRAWER AVATAR PERFIL */}
            {user ? (
              <button className="flex-shrink-0" onClick={toggleSidebar}>
                <UserAvatar userName={`${user.nombre} ${user.apellido}`} avatarUrl={user.avatar_img} />
              </button>
            ) : (
              <Link
                className={`bg-primary flex items-center justify-center rounded-full py-1 px-4`}
                href="/login"
              >
                <span className="text-sm text-white">Iniciar Sesión</span>
              </Link>
            )}
          </div>

          <div className="hidden lg:flex ">
            {actions.map(({ action, icon, link }, index) => (
              <ActionCard key={index} action={action} icon={icon} link={link} />
            ))}
          </div>

          {/* LOGO */}
          <div className="relative mb-[10px]">
            <Link href="/inicio" className="focus:outline-none">
              <img
                src={LOGO}
                alt="logo"
                className="w-[100px] h-full object-cover"
              />
            </Link>

            {/* Contenedor de plan o rol dinámico */}
            {roleInfo.label && (
              <div
                className={`absolute bottom-[-9px] right-0 px-2 flex justify-center items-center rounded-full ${roleInfo.color}`}
              >
                <span className="text-[9px] text-white font-semibold">
                  {roleInfo.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
