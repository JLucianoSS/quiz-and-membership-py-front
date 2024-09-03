"use client";
import React, { useEffect } from "react";
import { IoCloseOutline, IoHomeOutline, IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSidebarStore } from "@/store/ui";
import { signOut } from "next-auth/react";
import { routeActions } from "../../config/routes";
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
    window.location.replace("/login");
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
        className={`fixed top-0 left-0 w-64 h-full px-4 py-8 bg-white border-r transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-gray-800"
        >
          <IoCloseOutline size={25} />
        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center mt-2 -mx-2 h-[30%]">
          <UserAvatar
            userName={`${user.nombre} ${user.apellido}`}
            classHeight="h-24"
            classWidth="w-24"
            classText="text-3xl"
          />
          <h4 className="mx-2 mt-2 font-medium text-gray-800">
            {user.nombre} {user.apellido}
          </h4>
          <span className="mx-2 mt-1 text-sm font-medium text-gray-600 no-underline">
            {user.email}
          </span>
        </div>

        {/* ITEMS CON SCROLL */}
        <div className="flex flex-col justify-between flex-1 mt-4 overflow-y-auto h-[55%]">
          <div className="space-y-1">

            {user.role === "Administrador" && (
              <Link
                href="/admin"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                  pathname === "/admin"
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={handleItemClick}
              >
                <IoSettingsOutline className="w-5 h-5" size="18px" color="text-gray-800"/>
                <span className="mx-2 font-medium text-sm">Administración</span>
              </Link>
            )}

            <Link
              href="/"
              className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                pathname === "/"
                  ? "bg-gray-100"
                  : ""
              }`}
              onClick={handleItemClick}
            >
              <IoHomeOutline className="w-5 h-5" size="18px" color="text-gray-800"/>
              <span className="mx-2 font-medium text-sm">Inicio</span>
            </Link>

            {routeActions.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                  pathname === item.link
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={handleItemClick}
              >
                {React.cloneElement(item.icon, { color: "text-gray-800", size:"18px" })}
                <span className="mx-2 font-medium text-sm">{item.action}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="h-[15%]"></div>

        <div className="absolute left-0 bottom-0 bg-white border-t w-full flex justify-center items-center py-2">
          <button
            onClick={logout}
            className="flex items-center py-2 px-6 text-gray-700 rounded-lg "
          >
            <IoLogOutOutline className="w-5 h-5" color="text-gray-800"/>
            <span className="mx-2 font-medium text-sm">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};
