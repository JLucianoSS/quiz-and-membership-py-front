import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { LOGO } from '@/config/theme';

export const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white py-8">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-20 xl:px-44">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <Link href="/inicio" className="focus:outline-none">
            <Image
              src={LOGO}
              width={500}
              height={500}
              alt="logo"
              className="w-[120px] h-full object-cover"
            />
          </Link>
        </div>

        {/* Sección de enlaces */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-bold mb-4">Navegación</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:underline">
                Acerca de
              </Link>
            </li>
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
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-bold mb-4 text-center md:text-start">Síguenos</h4>
          <div className="flex justify-center gap-3">
            <Link href="https://facebook.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={24} />
            </Link>
            <Link href="https://twitter.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </Link>
            <Link href="https://linkedin.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn size={24} />
            </Link>
          </div>
        </div>

      </div>
        {/* Derechos reservados */}
        <div className="text-center mt-10">
          <p className="text-sm">&copy; {new Date().getFullYear()} AnatoPlus. Todos los derechos reservados.</p>
        </div>
    </footer>
  );
};
