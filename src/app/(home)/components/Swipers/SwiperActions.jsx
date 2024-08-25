import React from 'react';
import { IoPlayOutline, IoFilterOutline, IoBarChartOutline, IoStarOutline, IoTimeOutline, IoPersonOutline } from 'react-icons/io5';
import { ActionCard, CustomSwiper } from "@/components";

export const SwiperActions = ({ hasStarted }) => {
  const actionSlides = [
    <ActionCard action={hasStarted ? "Continuar" : "Nuevo"} icon={<IoPlayOutline size={24} color="#fff" />} />,
    <ActionCard action="Filtros" icon={<IoFilterOutline size={24} color="#fff" />} />,
    <ActionCard action="Desempeño" icon={<IoBarChartOutline size={24} color="#fff" />} />,
    <ActionCard action="Favoritas" icon={<IoStarOutline size={24} color="#fff" />} />,
    <ActionCard action="Historial" icon={<IoTimeOutline size={24} color="#fff" />} />,
    <ActionCard action="Perfil" icon={<IoPersonOutline size={24} color="#fff" />} />,
  ];

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
    <div className="mt-4">
      <CustomSwiper slides={actionSlides} config={actionConfig} />
    </div>
  );
};
