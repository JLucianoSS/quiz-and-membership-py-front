import { FaGraduationCap } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export const LandingInfo = () => {
  return (
    <section className="py-12 px-6 bg-gray-100 rounded-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Icono representativo */}
        <div className="flex justify-center mb-8 md:mb-0 md:w-1/3">
          <div className='w-[180px]'>
            <Image src="/imgs/landing-img.svg" alt='project-img' width={300} height={300} className='w-full h-full object-cover'/>
          </div>
        </div>

        {/* Descripción */}
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Te ayudamos a rendir tu examen de ingreso
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            ¿Estás preparándote para ingresar a la universidad? Somos expertos en exámenes de admisión y te proporcionamos todas las herramientas necesarias para que puedas estudiar de manera eficiente. 
            Encuentra quizes personalizados y preguntas relacionadas con tu área de estudio para aumentar tus posibilidades de éxito.
          </p>
          {/* Botón Ver planes */}
          <Link href="/planes" className="bg-primary text-white px-6 py-3 rounded-lg  transition-all duration-300">
            Ver planes
          </Link>
        </div>
      </div>
    </section>
  );
};
