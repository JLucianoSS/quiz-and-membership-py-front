"use client";
import { useEffect } from "react";
import { useSideBarStore2 } from "@/store/ui/useSideBarStore2";
import { IoHomeSharp, IoHelpCircleSharp, IoPersonSharp, IoCardSharp, IoWalletSharp, IoChatbox } from "react-icons/io5"; 
import { FaSignOutAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const SidebarAdmin = () => {
  const { isOpen, closeSidebar } = useSideBarStore2();
  const pathname = usePathname();

  // Función para cerrar el sidebar cuando se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (!event.target.closest(".sidebar") && !event.target.closest(".hamburger-menu")) {
      closeSidebar();
    }
  };

  // Agregar evento al hacer clic en cualquier parte de la pantalla
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, closeSidebar]);

  // Configuración dinámica de rutas
  const routes = [
    { path: "/admin", label: "Dashboard", icon: <IoHomeSharp /> },
    { path: "/admin/preguntas", label: "Preguntas", icon: <IoHelpCircleSharp /> },
    { path: "/admin/usuarios", label: "Usuarios", icon: <IoPersonSharp /> },
    { path: "/admin/comentarios", label: "Comentarios", icon: <IoChatbox /> },
    { path: "/admin/planes", label: "Planes", icon: <IoCardSharp /> },
    { path: "/admin/pagos", label: "Pagos", icon: <IoWalletSharp /> },
  ];

  return (
    <div
      className={`fixed z-10 shadow-md border-r top-14 left-0 h-full bg-gray-100 text-white transition-all duration-300 sidebar ${
        isOpen ? "w-44" : "w-0"
      } md:w-60`}
    >
      <ul className={`py-4 space-y-1 ${isOpen ? "block" : "hidden"} md:block`}>
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              href={route.path}
              onClick={closeSidebar}
              className={`relative flex items-center h-11 hover:bg-gray-200 text-gray-600 ${
                pathname === route.path ? "bg-gray-200 font-semibold text-primary" : ""
              }`}
            >
              <span className="ml-4">{route.icon}</span>
              <span className="ml-2 text-sm tracking-wide truncate">{route.label}</span>
            </Link>
          </li>
        ))}

        {/* Botón de salida */}
       
          <button
            onClick={signOut}
            className="relative flex items-center h-11 w-full hover:bg-gray-200 text-gray-600"
          >
            <span className="ml-4">
              <FaSignOutAlt />
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Salir</span>
          </button>
     
      </ul>
    </div>
  );
};
