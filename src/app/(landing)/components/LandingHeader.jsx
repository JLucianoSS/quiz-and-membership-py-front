import Image from "next/image"
import Link from "next/link"
import { LOGO } from "@/config/theme"

export const LandingHeader = () => {
  return (
    <header className="relative z-20">
      <div className=" mx-auto flex items-center justify-between absolute top-0 w-full py-2 px-6 lg:px-20 xl:px-44">
        {/* Logo alineado a la izquierda */}
        <div className="">
          <Link href="/inicio" className="focus:outline-none">
            <Image
              src={LOGO}
              width={500}
              height={500}
              alt="logo"
              className="w-[100px] h-full object-cover"
            />
          </Link>
        </div>

        {/* Navegación en el centro */}
        <nav aria-label="Main Navigation" className="hidden md:flex space-x-8">
          <Link href="/unete" className="text-white hover:text-primary font-medium">
            Únete
          </Link>
          <Link href="/planes" className="text-white hover:text-primary font-medium">
            Planes
          </Link>
        </nav>

        {/* Botón de iniciar sesión alineado a la derecha */}
        <div>
          <Link
            className={` flex items-center justify-center rounded-full py-1 px-4`}
            href="/login"
          >
            <span className="text-sm text-white">Iniciar sesión</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
