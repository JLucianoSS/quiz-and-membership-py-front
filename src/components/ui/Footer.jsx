import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { LOGO } from "@/config/theme";

export const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white py-10 w-full">
      <div className="flex flex-col justify-center items-center gap-6 md:flex-row md:justify-between md:items-start w-full px-6 lg:px-20 xl:px-44">
        {/* Logo */}
        <Link href="/" className="focus:outline-none">
          <Image
            src={LOGO}
            width={500}
            height={500}
            alt="logo"
            className="w-[130px] h-full object-cover"
          />
        </Link>

        {/* Sección de enlaces */}
        <div className="flex flex-col items-center justify-center">
          {/* <h4 className="text-lg font-bold mb-3 text-center">Nosotros</h4> */}
          <ul className="space-y-2 text-center text-sm sm:text-base">
            <li>
              <Link href="/contact" className="hover:underline">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Política de privacidad
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección de redes sociales */}
        <div className="">
          {/* <h4 className="text-lg font-bold mb-4 text-center md:text-start">Síguenos</h4> */}
          <div className="flex gap-3">
            <Link
              href="https://facebook.com"
              className="hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={24} />
            </Link>
            <Link
              href="https://twitter.com"
              className="hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </Link>
            <Link
              href="https://linkedin.com"
              className="hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="flex items-center h-[30px] mt-10 px-6 lg:px-20 xl:px-44">
        <p className="text-sm sm:text-base text-center md:text-start ">
          &copy; {new Date().getFullYear()} AnatoPlus. Todos los derechos
          reservados. Diseñada por{" "}
          <Link
            referrerPolicy="no-referrer"
            href="https://www.instagram.com/auradigital.peru"
            className="text-primary"
          >
            Aura Digital.
          </Link>
        </p>
      </div>
    </footer>
  );
};
