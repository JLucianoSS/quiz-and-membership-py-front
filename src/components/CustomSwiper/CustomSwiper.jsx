
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const CustomSwiper = ({ slides, config }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      {...config}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

