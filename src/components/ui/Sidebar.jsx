"use client";
import React, { useEffect } from "react";
import {
  IoCloseOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSidebarStore } from "@/store/ui";
import { signOut } from "next-auth/react";
import { getRouteActions, routeActions } from "../../config/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Sidebar = ({ user }) => {
  const { isOpen, closeSidebar } = useSidebarStore();
  const pathname = usePathname();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest("aside")) {
        closeSidebar();
      }
    };

    const handleScrollLock = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };
    document.addEventListener("click", handleOutsideClick);
    handleScrollLock();
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeSidebar]);

  const logout = async () => {
    await signOut();
    window.location.href("/login");
  };

  const handleItemClick = () => {
    closeSidebar(); // Cerrar el sidebar después de hacer clic
  };

  return (
    <>
      {/* Overlay oscuro detrás del sidebar */}
      <div
        className={`fixed inset-0 bg-black opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={closeSidebar}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-[#212121] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-gray-50"
        >
          <IoCloseOutline size={25} />
        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center px-4 py-6 flex-shrink-0">
          <UserAvatar
            userName={`${user.nombre} ${user.apellido}`}
            classHeight="h-24"
            classWidth="w-24"
            classText="text-3xl"
          />
          <h4 className="mt-2 font-medium text-gray-100 text-center">
            {user.nombre} {user.apellido}
          </h4>
          <span className="mt-1 text-sm font-medium text-gray-100 no-underline text-center">
            {user.email}
          </span>
        </div>

        {/* ITEMS CON SCROLL */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-1 text-gray-100">
            {user.role === "Administrador" && (
              <Link
                href="/admin"
                className={`flex items-center px-4 py-2  rounded-lg ${
                  pathname === "/admin" ? "bg-primary" : ""
                }`}
                onClick={handleItemClick}
              >
                <IoSettingsOutline
                  className="w-5 h-5"
                  size="18px"
                />
                <span className="mx-2 font-medium text-sm">Administración</span>
              </Link>
            )}

            <Link
              href="/inicio"
              className={`flex items-center px-4 py-2 rounded-lg ${
                pathname === "/inicio" ? "bg-primary" : ""
              }`}
              onClick={handleItemClick}
            >
              <IoHomeOutline
                className="w-5 h-5"
                size="18px"
              />
              <span className="mx-2 font-medium text-sm">Inicio</span>
            </Link>

            {getRouteActions(user.id_user).map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  pathname === item.link ? "bg-primary" : ""
                }`}
                onClick={handleItemClick}
              >
                {React.cloneElement(item.icon, {
                  color: "text-gray-800",
                  size: "18px",
                })}
                <span className="mx-2 font-medium text-sm">{item.action}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 py-4 bg-[#212121] border-t border-gray-600">
          <button
            onClick={logout}
            className="w-full flex items-center py-2 px-4 text-gray-100 rounded-lg hover:bg-primary hover:text-primary"
          >
            <IoLogOutOutline className="w-5 h-5" color="text-gray-800" />
            <span className="mx-2 font-medium text-sm">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};
