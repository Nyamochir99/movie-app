import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { SwiperMovie } from "./swiperMovie";

export const SwiperMain = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper w-full"
      >
        <SwiperSlide>
          <SwiperMovie />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperMovie />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperMovie />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
