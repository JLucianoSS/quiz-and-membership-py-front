
import { ActionCard, CustomSwiper } from "@/components";
import { routeActions } from "../../../../config/routes"

export const SwiperActions = () => {
  
  const actionSlides = routeActions.map(({ action, icon, link }, index) => (
    <ActionCard key={index} action={action} icon={icon} link={link} />
  ));

  const actionConfig = {
    slidesPerView: 3, // Default for small screens
    spaceBetween: 10,
    breakpoints: {
      500: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  };

  return (
    <div className="mt-6">
      <CustomSwiper slides={actionSlides} config={actionConfig} />
    </div>
  );
};
