import { ActionCard, CustomSwiper } from "@/components";
import { routeActions } from "../../../../config/routes";

export const SwiperActions = () => {
  const actionSlides = routeActions.map(({ action, icon, link }, index) => (
    <ActionCard key={index} action={action} icon={icon} link={link} />
  ));

  const actionConfig = {
    slidesPerView: 2.8, // Mostrar parcialmente el tercer slide en pantallas pequeñas
    spaceBetween: 10,
    breakpoints: {
      500: {
        slidesPerView: 3.2, // Mostrar parcialmente el cuarto slide
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 4.2, // Mostrar parcialmente el quinto slide
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5.5, // Mostrar parcialmente el sexto slide
        spaceBetween: 10,
      },
    },
  };

  return (
    <div className="fixed bottom-0 z-10 h-[70px] w-full bg-white border border-t-1 border-gray-100 py-1 flex items-center px-2 lg:px-2 xl:px-44">
      <CustomSwiper slides={actionSlides} config={actionConfig} className="h-full" />
    </div>
  );
};
