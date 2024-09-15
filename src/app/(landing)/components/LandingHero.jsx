export const LandingHero = () => {
    return (
      <div className="relative w-full h-[60vh] sm:h-screen overflow-hidden">
        {/* Video de fondo */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="videos/video-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        {/* Capa de superposición oscura para que el texto sea más legible */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
  
        {/* Texto centrado */}
        <div className="relative z-10 flex items-center justify-center h-full px-6 lg:px-20 xl:px-44">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
            Responde, aprende y supera tus límites en cada pregunta.
          </h1>
        </div>
      </div>
    );
  };
  