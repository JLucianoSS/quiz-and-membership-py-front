
"use client"
import { useScrollStore } from "@/store/ui";

export const LandingHero = () => {

  const scrollToInfo = useScrollStore((state) => state.scrollToInfo);

  /* 61PX ES EL TAMAÑO DEL HEADER Y COMO ES FIJO POR ESO LE DOY PT DE 61 PX */
    return (
      <div className="pt-[53px] bg-[#212121]">
        <div className="relative w-full h-[60vh] sm:h-[72vh] overflow-hidden">
          {/* Video de fondo */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="videos/video-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Capa de superposición oscura para que el texto sea más legible */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
      
          {/* CENTRADO CONFIG */}
          <div className="relative z-10 h-full px-6 lg:px-20 xl:px-44">
            <div className="flex flex-col justify-center items-center gap-5 h-full">
              <h1 className="w-full text-gray-50 text-3xl font-bold text-center lg:text-4xl">
                Supera tus límites en cada pregunta
              </h1>
              <p className="text-gray-50 text-center text-sm lg:text-base px-[8%] lg:px-[15%]">Explora una amplia variedad de temas y pon a prueba tus conocimientos en cada respuesta. Cada pregunta es una nueva oportunidad para crecer y descubrir hasta dónde puedes llegar.</p>
              <button onClick={scrollToInfo} className="mt-4">
              <span className="text-gray-50 border border-gray-50 text-center rounded-lg py-[8px] px-[18px]">Saber más</span>
            </button>
            </div>
          </div>
          
        </div>
      </div>
    );
  };
  