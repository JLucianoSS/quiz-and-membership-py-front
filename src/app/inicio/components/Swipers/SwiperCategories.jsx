import { CategoryCard, CustomSwiper } from "@/components";

export const SwiperCategories = ({ modulos }) => {
  
  // Verificamos si hay módulos
  if (!modulos || modulos.length === 0) {
    return <>
      <h1 className="text-2xl font-bold mt-8 mb-5">Módulos</h1>
      <span className="text-gray-700">No hay módulos disponibles en este momento</span>
    </>;
  }

  const categorySlides = modulos.map((modulo, index) => (
    <CategoryCard key={index} id={modulo.id_modulo} name={modulo.nombre_modulo} image={modulo.imagen} />
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
