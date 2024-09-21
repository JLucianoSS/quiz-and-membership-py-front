import { CategoryCard, CustomSwiper } from "@/components";


export const SwiperCategories = ({ especialidades }) => {
  const categorySlides = especialidades.map((especialidad, index) => (
    <CategoryCard key={index} id={especialidad.id} name={especialidad.nombre} image={especialidad.imagen} />
  ));

  const categoryConfig = {
    slidesPerView: 2.4,
    spaceBetween: 15,
    breakpoints: {
      640: {
        slidesPerView: 3.4,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  };
  return (
    <>
      <h1 className="text-2xl font-bold mt-8 mb-5">Módulos</h1>
      <CustomSwiper slides={categorySlides} config={categoryConfig} />
    </>
  );
};
