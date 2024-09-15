

import { CustomSwiper, HeroCard } from "@/components";

export const LandingSwiper = () => {
  // Definir la data de las tarjetas HeroCard
  const heroData = [
    {
      title: "Únete a nuestro",
      highlightText: "Plan Premium",
      description: "Disfruta de beneficios exclusivos, contenido personalizado y mucho más. ¡Haz que tu experiencia sea aún mejor con nuestro plan premium!",
      buttonText: "Ver Planes",
      buttonLink: "/premium",
      imageSrc: "/imgs/img-p-1.png", // Asegúrate de que esta imagen exista en tu proyecto
      imageAlt: "Imagen del Plan Premium",
    },
    {
      title: "Descubre las",
      highlightText: "Ventajas de Nuestra App",
      description: "Nuestra aplicación te permite gestionar tus preguntas, seguir tu progreso y obtener resultados en tiempo real. ¡Comienza a mejorar hoy!",
      buttonText: "Iniciar",
      buttonLink: "/download",
      imageSrc: "/imgs/img-p-2.png", // Asegúrate de que esta imagen exista en tu proyecto
      imageAlt: "Imagen de las Ventajas de la App",
    },
  ];

  // Mapear los datos a HeroCards
  const heroSlides = heroData.map((hero, index) => (
    <HeroCard
      key={index}
      title={hero.title}
      highlightText={hero.highlightText}
      description={hero.description}
      buttonText={hero.buttonText}
      buttonLink={hero.buttonLink}
      imageSrc={hero.imageSrc}
      imageAlt={hero.imageAlt}
    />
  ));

  const heroConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: { delay: 5000 },
  };

  return (
    <>
      <CustomSwiper slides={heroSlides} config={heroConfig} />
    </>
  );
};
