"use client";
import { IoMenuOutline, IoCloseOutline, IoArrowBack } from "react-icons/io5";
import { useSideBarStore2 } from "@/store/ui/useSideBarStore2";
import Image from "next/image";
import Link from "next/link";

export const NavbarAdmin = ({ user }) => {
  const { isOpen, toggleSidebar } = useSideBarStore2();

  return (
    <div className="fixed w-full flex items-center justify-between h-14 bg-gray-100 text-gray-700 border-b-2">
      <div className="flex items-center gap-1 w-64 pl-3 md:pl-4">
        <button
          className="hamburger-menu md:hidden transition-transform duration-300 ease-in-out transform"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <IoCloseOutline
              size={20}
              className="text-gray-600 transition-transform duration-300 ease-in-out transform rotate-180"
            />
          ) : (
            <IoMenuOutline
              size={20}
              className="text-gray-600 transition-transform duration-300 ease-in-out transform rotate-0"
            />
          )}
        </button>
        <button className="dropdown-toggle flex items-center">
          <div className="flex-shrink-0 w-10 h-10 relative">
            <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
              <Image
                className="w-8 h-8 rounded-full"
                src="/imgs/admin-user.jpg"
                alt="Admin avatar"
                height={150}
                width={150}
              />
              <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
              <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
          <div className="p-2 md:block text-left">
            <h2 className="text-sm font-semibold text-gray-800">{user.nombre} {user.apellido}</h2>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </button>
      </div>

      <Link href="/inicio" className="flex items-center pr-6 text-sm text-gray-600" >
        {/* <IoArrowBack /> */}
        <span className="ml-1 font-semibold text-gray-800 hover:underline hover:text-primary">Inicio</span>
      </Link>
    </div>
  );
};
