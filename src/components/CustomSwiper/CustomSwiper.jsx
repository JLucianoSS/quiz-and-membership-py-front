"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CustomSwiper.css"; // Asegúrate de importar tu CSS

export const CustomSwiper = ({ slides, config }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      {...config}
      className="h-full" // Asegúrate de que Swiper ocupe toda la altura
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="h-full"> {/* Ajusta la altura de cada slide */}
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
