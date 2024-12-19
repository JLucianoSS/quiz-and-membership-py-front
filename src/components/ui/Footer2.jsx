import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { LOGO } from "@/config/theme";

export const Footer2 = () => {
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
      </div>

      {/* Derechos reservados */}
      <div className="flex items-center h-[30px] mt-10 px-6 lg:px-20 xl:px-44">
        <p className="text-sm sm:text-base text-center md:text-start ">
          &copy; {new Date().getFullYear()} AnatoPlus. Todos los derechos
          reservados. 
          {/* Diseñada por{" "}
          <Link
            referrerPolicy="no-referrer"
            target="_blank"
            href="https://www.instagram.com/auradigital.peru"
            className="text-primary"
          >
            Aura Digital.
          </Link> */}
        </p>
      </div>
    </footer>
  );
};
