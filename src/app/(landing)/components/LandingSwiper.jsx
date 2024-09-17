

import { CustomSwiper, HeroCard } from "@/components";

export const LandingSwiper = ({ onScrollToPlans }) => {
  // Definir la data de las tarjetas HeroCard
  const heroData = [
    {
      title: "Nuestro",
      highlightText: "Plan Premium",
      description: "Disfruta de beneficios exclusivos, contenido personalizado y mucho más. ¡Haz que tu experiencia sea aún mejor con nuestro plan premium!",
      buttonText: "Ver Planes",
      buttonLink: "/premium",
      imageSrc: "/imgs/img-p-1.png", // Asegúrate de que esta imagen exista en tu proyecto
      imageAlt: "Imagen del Plan Premium",
      handleAction: onScrollToPlans
    },
    {
      title: "Descubre",
      highlightText: "Anato plus",
      description: "Nuestra aplicación te permite gestionar tus preguntas, seguir tu progreso y obtener resultados en tiempo real. ¡Comienza a mejorar hoy!",
      buttonText: "Iniciar",
      buttonLink: "/register",
      imageSrc: "/imgs/img-p-2.png", // Asegúrate de que esta imagen exista en tu proyecto
      imageAlt: "Imagen de las Ventajas de la App",
      handleAction: ""
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
      handleAction={hero.handleAction}
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
