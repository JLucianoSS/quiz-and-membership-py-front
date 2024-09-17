import { CustomSwiper, HeroCard } from "@/components";

export const SwiperHeros = () => {
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
    },
    {
      title: "Disfruta",
      highlightText: "Anato Plus",
      description: "Gestiona tus preguntas, sigue tu progreso, obtén respuestas y compara tus resultados en tiempo real. Escoge un tema y empieza a mejorar ya!",
      buttonText: "Iniciar",
      buttonLink: "/inicio/iniciar-quiz",
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
