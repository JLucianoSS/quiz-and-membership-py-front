import Link from "next/link";

export const LandingHero = () => {

  /* 61PX ES EL TAMAÑO DEL HEADER Y COMO ES FIJO POR ESO LE DOY PT DE 61 PX */
    return (
      <div className="pt-[53px]">
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
      
          {/* px-6 lg:px-20 xl:px-44 */}
          <div className="relative z-10 h-full px-6 lg:px-20 xl:px-44">
            <div className="flex flex-col justify-center items-center gap-5 h-full lg:items-start lg:w-[40%]">
              <h1 className="w-full text-gray-50 text-3xl font-bold text-center lg:text-start lg:text-4xl">
                Supera tus límites en cada pregunta
              </h1>
              <p className="text-gray-50 text-center text-sm lg:text-base px-[8%] lg:px-0 lg:text-start">Explora una amplia variedad de temas y pon a prueba tus conocimientos en cada respuesta. Cada pregunta es una nueva oportunidad para crecer y descubrir hasta dónde puedes llegar.</p>
              <Link href="#" className="mt-4">
                <span className="text-gray-50 border border-gray-50 text-center rounded-lg py-[8px] px-[18px]">Saber más</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  