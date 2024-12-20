"use client"
import { ActionCard, CustomSwiper } from "@/components";
import { useRouteActions } from "@/hooks/useRouterActions";


export const SwiperActions = ({user}) => {

  const actions = useRouteActions(user.id_user);
  
  const actionSlides = actions.map(({ action, icon, link }, index) => (
    <ActionCard key={index} action={action} icon={icon} link={link} />
  ));

  const actionConfig = {
    slidesPerView: 3.6, // Mostrar parcialmente el tercer slide en pantallas pequeñas
    spaceBetween: 2,
    breakpoints: {
      500: {
        slidesPerView: 6, // Mostrar parcialmente el cuarto slide
        spaceBetween: 1,
      },
      640: {
        slidesPerView: 6, // Mostrar parcialmente el quinto slide
        spaceBetween: 1,
      },
      1024: {
        slidesPerView: 6, // Mostrar parcialmente el sexto slide
        spaceBetween: 1,
      },
    },
  };

  return (
    <div className="fixed bottom-0 z-10 h-[50px] w-full bg-[#212121] py-1 flex justify-center items-center lg:hidden">
      <div className="w-full px-6 sm:px-0 sm:w-[500px] md:w-[600px] lg:w-[700px] ">
        <CustomSwiper slides={actionSlides} config={actionConfig} className="h-full" />
      </div>
    </div>
  );
};
