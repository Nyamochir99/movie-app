import React, { useEffect, useRef, useState } from "react";
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
import { SearchMovie, TrailerResult } from "@/app/types";
import axios from "axios";

export const SwiperMain = () => {
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="w-full h-150 flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
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
        {movies.slice(0, 10).map((movie) => (
          <SwiperSlide>
            <SwiperMovie movie={movie} key={movie.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
