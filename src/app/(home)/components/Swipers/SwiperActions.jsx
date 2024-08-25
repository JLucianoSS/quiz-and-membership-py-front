import React from "react";
import {
  IoPlayOutline,
  IoFilterOutline,
  IoBarChartOutline,
  IoStarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoAddOutline,
} from "react-icons/io5";
import { ActionCard, CustomSwiper } from "@/components";

export const SwiperActions = () => {
  const hasStarted = false;

  const actions = [
    {
      action: hasStarted ? "Continuar" : "Nuevo",
      icon: hasStarted ? <IoPlayOutline size={24} color="#fff" /> : <IoAddOutline size={24} color="#fff" />,
      link: hasStarted ? "" : "/iniciar-quiz"
    },
    { action: "Filtros", icon: <IoFilterOutline size={24} color="#fff" /> },
    { action: "Desempeño", icon: <IoBarChartOutline size={24} color="#fff" /> },
    { action: "Favoritas", icon: <IoStarOutline size={24} color="#fff" /> },
    {
      action: "Historial",
      icon: <IoTimeOutline size={24} color="#fff" />,
      link: "/historial",
    },
    { action: "Perfil", icon: <IoPersonOutline size={24} color="#fff" /> },
  ];

  const actionSlides = actions.map(({ action, icon, link }, index) => (
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
