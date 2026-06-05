import { SearchMovie, TrailerResult } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

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
        let onlyTrailers = (res.data.results as TrailerResult[]).filter(
          (video) => video.type === "Trailer" && video.official === true,
        );
        if (onlyTrailers.length === 0) {
          onlyTrailers = (res.data.results as TrailerResult[]).filter(
            (video) => video.type === "Trailer",
          );
        }
        setTrailer(onlyTrailers);
        setLoading(false);
      });
  }, [movie.id]);

  const handlePlayer = (open: boolean) => {
    setPlayer(open);
    if (swiper) {
      if (open) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-72 sm:h-96 md:h-120 lg:h-150 flex items-center justify-center text-white/80 text-sm">
        Loading...
      </div>
    );
  }
  const trailerKey = trailer.length > 1 ? trailer[1]?.key : trailer[0]?.key;

  return (
    <div
      className="w-full h-72 sm:h-96 md:h-120 lg:h-150 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20 sm:from-black/80 sm:via-black/40 sm:to-transparent" />

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:justify-center sm:pb-0">
        <div className="flex flex-col gap-2.5 sm:gap-4 w-full max-w-2xl">
          <div className="text-xs sm:text-base font-medium text-white/90 tracking-wide">
            Now Playing
          </div>

          <Link
            href={`/movie/${movie.id}`}
            className="text-lg sm:text-3xl lg:text-[36px] leading-snug sm:leading-10 font-bold text-white cursor-pointer line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            {movie.title}
          </Link>

          <div className="flex items-center gap-1.5">
            <div className="flex justify-center items-center h-5 w-5 sm:h-7 sm:w-7 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                className="sm:w-[25px] sm:h-6"
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
            <div className="text-sm sm:text-lg font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              {movie.vote_average.toFixed(1)}
              <span className="font-normal text-white/70">/10</span>
            </div>
          </div>

          <p className="hidden sm:block max-w-75.5 text-sm font-normal text-white/90 leading-relaxed line-clamp-3">
            {movie.overview}
          </p>

          <Dialog open={player} onOpenChange={handlePlayer}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-1 flex gap-2 justify-center items-center h-10 w-full sm:w-auto sm:min-w-36.25 px-5 bg-white/95 hover:bg-white text-[#18181B] cursor-pointer rounded-md text-sm font-semibold shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="13"
                  viewBox="0 0 11 13"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M0.5 0.5L9.83333 6.5L0.5 12.5V0.5Z"
                    stroke="#18181B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Watch Trailer
              </button>
            </DialogTrigger>
            <DialogContent
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-5xl w-[95vw] sm:w-[90vw] p-0 bg-black border-none z-100"
              showCloseButton={false}
            >
              <DialogTitle className="sr-only">
                Watch {movie.title} Trailer
              </DialogTitle>
              {trailerKey ? (
                <div className="w-full aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md"
                  />
                </div>
              ) : (
                <div className="text-white p-10 text-center">
                  Trailer not available
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
