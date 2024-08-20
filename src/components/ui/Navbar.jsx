"use client";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSidebarStore } from "@/store/ui"; // Ruta donde guardaste el store
import { LOGO } from "@/config/theme";

export const Navbar = ({ user }) => {
  const { toggleSidebar } = useSidebarStore();
  console.log(user);

  return (
    <nav className="bg-white border-2 border-b-gray-100 fixed w-full z-40">
      <div className=" mx-auto px-6 lg:px-20 xl:px-44">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center gap-4">
            {/* DRAWER AVATAR PERFIL */}
            {user ? (
              <button className="flex-shrink-0" onClick={toggleSidebar}>
                <UserAvatar userName="John Doe" />
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

          {/* LOGO */}
          <Link href="/" className="focus:outline-none">
            <Image
              src={LOGO}
              width={500}
              height={500}
              alt="logo"
              className="w-[100px] h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
