"use client";
import { useEffect, useState } from "react";
import { IoHomeOutline, IoCloseOutline, IoLogOutOutline } from "react-icons/io5";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSidebarStore } from "@/store/ui"; // Ruta donde guardaste el store
import { signOut } from "next-auth/react";
import Link from "next/link";

export const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebarStore();
  const [active, setActive] = useState("Dashboard");

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

  const logout = async() => {
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
        <button onClick={closeSidebar} className="absolute top-4 right-4 text-gray-800">
          <IoCloseOutline size={25}/>
        </button>

        <div className="flex flex-col items-center mt-6 -mx-2">
          <UserAvatar userName="John Doe" classHeight="h-24" classWidth="w-24" classText="text-3xl" />
          <h4 className="mx-2 mt-2 font-medium text-gray-800 ">John Doe</h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 ">john@example.com</p>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <div className="space-y-4">
            <Link
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                active === "Dashboard" ? "bg-gray-100" : "hover:bg-gray-100 hover:text-gray-700"
              }`}
              onClick={() => setActive("Dashboard")}
            >
              <IoHomeOutline className="w-5 h-5" />
              <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            <Link
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                active === "Item2" ? "bg-gray-100" : "hover:bg-gray-100 hover:text-gray-700"
              }`}
              onClick={() => setActive("Item2")}
            >
              <IoHomeOutline className="w-5 h-5" />
              <span className="mx-4 font-medium">Item2</span>
            </Link>
            <Link
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 rounded-lg ${
                active === "Item2" ? "bg-gray-100" : "hover:bg-gray-100 hover:text-gray-700"
              }`}
              onClick={() => setActive("Item2")}
            >
              <IoHomeOutline className="w-5 h-5" />
              <span className="mx-4 font-medium">Item2</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 px-4 py-4 bg-white border-t">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <IoLogOutOutline className="w-5 h-5" />
            <span className="mx-4 font-medium">Cerrar sesión</span>
          </button>
        </div>

      </aside>
    </>
  );
};
