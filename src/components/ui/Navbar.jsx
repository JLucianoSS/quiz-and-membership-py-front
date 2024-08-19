"use client";
import Image from "next/image";
import Link from "next/link";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useSidebarStore } from "@/store/ui"; // Ruta donde guardaste el store
import { LOGO } from "@/config/theme";

export const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();

  return (
    <nav className="bg-white border-2 border-b-gray-100 fixed w-full z-40">
      <div className=" mx-auto px-6">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center gap-4">
            {/* DRAWER AVATAR PERFIL */}
            <button className="flex-shrink-0" onClick={toggleSidebar}>
              <UserAvatar userName="John Doe" />
            </button>
            
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
