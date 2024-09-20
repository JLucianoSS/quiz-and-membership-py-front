'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { LOGO } from "@/config/theme"
import { useScrollStore } from "../../../store/ui"

export const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollToPlans = useScrollStore((state) => state.scrollToPlans)
  const scrollToInfo = useScrollStore((state) => state.scrollToInfo)
  const scrollToFAQ = useScrollStore((state) => state.scrollToFAQ)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (scrollFunction) => (e) => {
    e.preventDefault()
    scrollFunction()
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed w-full z-20">
      <div className="bg-[#212121] mx-auto flex items-center justify-between w-full py-3 px-6 lg:px-20 xl:px-44">

        {/* Logo alineado a la izquierda */}
        <Link href="/" className="focus:outline-none">
          <Image
            src={LOGO}
            width={500}
            height={500}
            alt="logo"
            className="w-[100px] h-full object-cover"
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-14">
          {/* Navegación en el centro para pantallas medianas y grandes */}
          <nav aria-label="Main Navigation" className="hidden md:flex space-x-10">
            <button className="text-primary font-semibold" onClick={handleNavClick(scrollToInfo)}>
              Únete
            </button>
            <button className="text-white" onClick={handleNavClick(scrollToPlans)}>
              Planes
            </button>
            <button className="text-white" onClick={handleNavClick(scrollToFAQ)}>
              Preguntas frecuentes
            </button>
          </nav>
          {/* Botón de iniciar sesión alineado a la derecha */}
          <div className="hidden md:block">
            <Link
              className="border border-primary flex items-center justify-center rounded-lg py-[6px] px-4"
              href="/login"
            >
              <span className="text-primary">Iniciar sesión</span>
            </Link>
          </div>
          {/* Hamburger menu for mobile */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Dropdown menu for mobile */}
      <div 
        className={`md:hidden bg-[#212121] w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col space-y-4 p-6">
          <button className="text-primary font-semibold" onClick={handleNavClick(scrollToInfo)}>
            Únete
          </button>
          <button className="text-white" onClick={handleNavClick(scrollToPlans)}>
            Planes
          </button>
          <button className="text-white" onClick={handleNavClick(scrollToFAQ)}>
            Preguntas frecuentes
          </button>
          <Link
            className="border border-primary flex items-center justify-center rounded-lg py-[6px] px-4 w-full"
            href="/login"
          >
            <span className="text-primary">Iniciar sesión</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}