import { SearchMovie } from "@/app/types";
import Link from "next/link";
import React from "react";

export const MoiveCard = ({
  movie,
  isDark,
}: {
  movie: SearchMovie;
  isDark: boolean;
}) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className={`w-57.5 cursor-pointer flex flex-col gap-1 rounded-lg items-start overflow-hidden ${isDark ? "bg-[#27272A]" : "bg-[#F4F4F5]"}`}
    >
      <img
        className="h-85 w-full object-cover"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="w-full h-24 flex flex-col justify-start p-2">
        <div className="flex gap-1 h-6 items-center">
          <div className="flex justify-center items-center h-4 w-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
            >
              <path
                d="M7.16667 0.5L9.22667 4.67333L13.8333 5.34667L10.5 8.59333L11.2867 13.18L7.16667 11.0133L3.04667 13.18L3.83333 8.59333L0.5 5.34667L5.10667 4.67333L7.16667 0.5Z"
                fill={isDark ? "#FAFAFA" : "#FDE047"}
                stroke={isDark ? "#FAFAFA" : "#FDE047"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className={`text-sm font-normal ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
          >
            {movie.vote_average.toFixed(1)}
            <span
              className={`font-normal ${isDark ? "text-[#A1A1AA]" : "text-[#71717A]"}`}
            >
              /10
            </span>
          </div>
        </div>
        <div
          className={`text-lg font-normal ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
        >
          {movie.title}
        </div>
      </div>
    </Link>
  );
};
