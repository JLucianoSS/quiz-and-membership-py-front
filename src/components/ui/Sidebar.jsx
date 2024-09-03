"use client";
import React, { useEffect, useState } from "react";
import { IoCloseOutline, IoHomeOutline, IoLogOutOutline, IoSettingsOutline  } from "react-icons/io5";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSidebarStore } from "@/store/ui";
import { signOut } from "next-auth/react";
import { routeActions } from "../../config/routes";
import Link from "next/link";

export const Sidebar = ({ user }) => {
  const { isOpen, closeSidebar } = useSidebarStore();
  const [active, setActive] = useState("");

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
        className={`fixed top-0 left-0 w-64 h-full px-4 py-8 overflow-y-auto bg-white border-r transform ${
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
        <div className="flex flex-col items-center mt-6 -mx-2">
          <UserAvatar
            userName={`${user.nombre} ${user.apellido}`}
            classHeight="h-24"
            classWidth="w-24"
            classText="text-3xl"
          />
          <h4 className="mx-2 mt-2 font-medium text-gray-800">
            {user.nombre} {user.apellido}
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600">
            {user.email}
          </p>
        </div>

        {/* ITEMS */}
        <div className="flex flex-col justify-between flex-1 mt-4">
          <div className="space-y-1">

            {user.role === "Administrador" && (
              <Link
                href="#"
                className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                  active === "Dashboard"
                    ? "bg-gray-100"
                    : "hover:bg-gray-100 hover:text-gray-700"
                }`}
                onClick={() => setActive("Dashboard")}
              >
                <IoSettingsOutline className="w-5 h-5" size="18px" color="text-gray-800"/>
                <span className="mx-2 font-medium text-sm">Administración</span>
              </Link>
            )}

            <Link
              href="/"
              className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                active === "/"
                  ? "bg-gray-100"
                  : "hover:bg-gray-100 hover:text-gray-700"
              }`}
              onClick={() => setActive("/")}
            >
              <IoHomeOutline className="w-5 h-5" size="18px" color="text-gray-800"/>
              <span className="mx-2 font-medium text-sm">Inicio</span>
            </Link>

            {routeActions.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                  active === item.action
                    ? "bg-gray-100"
                    : "hover:bg-gray-100 hover:text-gray-700"
                }`}
                onClick={() => setActive(item.action)}
              >
                {React.cloneElement(item.icon, { color: "text-gray-800", size:"18px" })}
                <span className="mx-2 font-medium text-sm">{item.action}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 px-4 py-3 bg-white border-t">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <IoLogOutOutline className="w-5 h-5" color="text-gray-800"/>
            <span className="mx-2 font-medium text-sm">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};
