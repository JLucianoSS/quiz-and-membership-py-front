import { CategoryCard, CustomSwiper } from "@/components";


export const SwiperCategories = ({ modulos }) => {
  
  const categorySlides = modulos.map((modulo, index) => (
    <CategoryCard key={index} id={modulo.id_Modulo} name={modulo.nombre_modulo} image={modulo.imagen} />
  ));

  const categoryConfig = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 3.4,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 15,
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
