import { SearchMovie, TrailerResult } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
      <div className="w-full h-150 flex items-center justify-center">
        Loading...
      </div>
    );
  }
  const trailerKey = trailer.length > 1 ? trailer[1]?.key : trailer[0]?.key;

  return (
    <div
      className="w-full h-150 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="flex flex-col gap-4 w-7xl items-start">
        <div className="flex flex-col items-start">
          <div className="text-base font-normal text-white">Now Playing:</div>
          <Link
            href={`/movie/${movie.id}`}
            className="text-[36px] leading-10 font-bold text-white cursor-pointer"
          >
            {movie.title}
          </Link>
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

        <Dialog open={player} onOpenChange={handlePlayer}>
          <DialogTrigger asChild>
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
              <div className="text-sm font-medium text-[#18181B] ">
                Watch Trailer
              </div>
            </div>
          </DialogTrigger>
          <DialogContent
            className="fixed top-1/2 left-1/2 -translate-x-4/3 -translate-y-1/2 max-w-5xl w-[90vw] p-0 bg-black border-none z-100"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">
              Watch {movie.title} Trailer
            </DialogTitle>
            {trailerKey ? (
              <div className="h-150 aspect-video">
                <iframe
                  width=" 100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md"
                ></iframe>
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
  );
};
