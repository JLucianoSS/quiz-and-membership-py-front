"use client";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSidebarStore } from "@/store/ui"; // Ruta donde guardaste el store
import { LOGO } from "@/config/theme";
import { getRouteActions } from "@/config/routes";
import { ActionCard } from "..";

export const Navbar = ({ user }) => {
  const { toggleSidebar } = useSidebarStore();

  // Definir el texto y color según el rol del usuario
  const getRoleLabel = (role) => {
    switch (role) {
      case "Administrador":
        return { label: "Admin", color: "bg-blue-400" };
      case "Visitante":
        return { label: "Free", color: "bg-green-400" };
      case "Suscriptor":
        return { label: "Premium", color: "bg-yellow-400" };
      default:
        return { label: "", color: "" };
    }
  };

  const roleInfo = user ? getRoleLabel(user.role) : { label: "", color: "" };

  return (
    <nav className="bg-[#212121] fixed w-full z-40">
      <div className="mx-auto px-6 lg:px-20 xl:px-44">
        <div className="flex justify-between items-center h-[52px]">
          <div className="flex items-center gap-4">
            {/* DRAWER AVATAR PERFIL */}
            {user ? (
              <button className="flex-shrink-0" onClick={toggleSidebar}>
                <UserAvatar userName={`${user.nombre} ${user.apellido}`} />
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
            {getRouteActions(user.id_user).map(({ action, icon, link }, index) => (
              <ActionCard key={index} action={action} icon={icon} link={link} />
            ))}
          </div>

          {/* LOGO */}
          <div className="relative mb-[10px]">
            <Link href="/inicio" className="focus:outline-none">
              <img
                src={LOGO}
                // width={500}
                // height={500}
                alt="logo"
                className="w-[100px] h-full object-cover"
              />
            </Link>

            {/* Contenedor de rol dinámico */}
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
