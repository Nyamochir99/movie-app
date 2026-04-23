import { SearchMovie, TrailerResult } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

export const SwiperMovie = ({ movie }: { movie: SearchMovie }) => {
  const [trailer, setTrailer] = useState<TrailerResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [player, setPlayer] = useState<boolean>(false);

  const swiper = useSwiper();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        setTrailer(res.data.results);
        setLoading(false);
      });
  }, [movie.id]);
  if (loading) {
    return (
      <div className="w-full h-150 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="w-full h-200 bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="flex flex-col gap-4 ml-35 items-start">
        <div className="flex flex-col items-start">
          <div className="text-base font-normal text-white">Now Playing:</div>
          <div className="text-[36px] leading-10 font-bold text-white cursor-pointer">
            {movie.title}
          </div>
          <div className="flex gap-1 h-12">
            <div className="flex justify-center items-center h-7 w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  d="M7.16667 0.5L9.22667 4.67333L13.8333 5.34667L10.5 8.59333L11.2867 13.18L7.16667 11.0133L3.04667 13.18L3.83333 8.59333L0.5 5.34667L5.10667 4.67333L7.16667 0.5Z"
                  fill="#FDE047"
                  stroke="#FDE047"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={`text-lg font-normal text-[#FAFAFA]`}>
              {movie.vote_average.toFixed(1)}
              <span className={`font-normal text-[#71717A]`}>/10</span>
            </div>
          </div>
        </div>
        <div className="w-75.5 text-xs font-normal text-[#FAFAFA]">
          {movie.overview}
        </div>
        <div className="flex gap-2 justify-center items-center h-10 w-36.25 bg-[#F4F4F5] cursor-pointer rounded-md">
          <div className="flex items-center justify-center h-4 w-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="13"
              viewBox="0 0 11 13"
              fill="none"
            >
              <path
                d="M0.5 0.5L9.83333 6.5L0.5 12.5V0.5Z"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              setPlayer(true);
              if (swiper) {
                swiper.autoplay.stop();
              }
            }}
            className="text-sm font-medium text-[#18181B] "
          >
            Watch Trailer
          </div>
        </div>
      </div>
      {player && (
        <div className="relative">
          <iframe
            width="997"
            height="561"
            src={`https://www.youtube.com/embed/${trailer[1].key}`}
            title="YouTube video player"
          ></iframe>
          <div
            className="absolute -top-20 -right-20 rounded-full bg-white cursor-pointer h-10 w-10 z-20"
            onClick={() => {
              setPlayer(false);
              swiper.autoplay.start();
            }}
          ></div>
        </div>
      )}
    </div>
  );
};
