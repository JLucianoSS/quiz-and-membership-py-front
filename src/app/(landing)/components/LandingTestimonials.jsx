import { CustomSwiper } from "@/components";
import { TestimonialCard } from ".";

export const LandingTestimonials = () => {
  const testimonios = [
    {
      nombre: "Carlo Enc",
      comentario: "El servicio es excelente, he mejorado mucho en poco tiempo.",
      imageSrc: "/imgs/carlos.jpg",
    },
    {
      nombre: "Jorge Sánchez",
      comentario:
        "Me encanta la atención al cliente y los resultados son increíbles.",
      imageSrc: "/imgs/jorge.jpeg",
    },
    {
      nombre: "David Peña",
      comentario:
        "Recomiendo 100% esta plataforma, es de las mejores que he probado.",
      imageSrc: "/imgs/david.jpeg",
    },
    {
      nombre: "Jhon Doe",
      comentario:
        "Super recomendada esta plataforma, es muy entendible.",
      imageSrc: "/imgs/jhon.jpg",
    },
  ];

  // Configuración del swiper
  const swiperConfig = {
    spaceBetween: 30,
    slidesPerView: 3, // Muestra 3 slides a la vez en escritorio
    loop: true, // Activa el loop para que las slides se repitan infinitamente
    autoplay: { delay: 5000 }, // Activa el autoplay
    pagination: { clickable: true }, // Muestra los puntos de paginación
    breakpoints: {
      640: {
        slidesPerView: 1, // 1 slide en pantallas móviles
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2, // 2 slides en tablets
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3, // 3 slides en escritorio
        spaceBetween: 40,
      },
    },
  };

  // Estructura de los slides
  const slides = testimonios.map((testimonio, index) => (
    <TestimonialCard key={index} testimonio={testimonio} />
  ));

  return (
    <div className="w-full py-12">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Lo que dicen nuestros usuarios
      </h2>
      <CustomSwiper slides={slides} config={swiperConfig} />
    </div>
  );
};
