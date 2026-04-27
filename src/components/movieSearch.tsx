import { SearchMovie } from "@/app/types";
import Link from "next/link";
import React from "react";

export const MovieSearch = ({
  movie,
  isDark,
}: {
  movie: SearchMovie;
  isDark: boolean;
}) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className={`w-full flex gap-4 p-2 cursor-pointer border-b pb-4 mb-2 ${isDark ? "border-b-[#27272A]" : "border-b-[#E4E4E7]"}`}
    >
      <img
        className="w-17 h-25 object-cover rounded-md overflow-hidden cursor-pointer"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-start">
          <div
            className={`text-xl font-semibold cursor-pointer ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"} hover:underline`}
          >
            {movie.title}
          </div>
          <div className="flex justify-start gap-1 items-center h-5.75">
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
              className={`text-sm font-medium ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
            >
              {movie.vote_average.toFixed(1)}
              <span
                className={`font-normal ${isDark ? "text-[#A1A1AA]" : "text-[#71717A]"}`}
              >
                /10
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between w-113.5">
          <div
            className={`text-sm font-medium ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
          >
            {movie.release_date.slice(0, 4)}
          </div>
          <div className="h-9 px-4 flex items-center gap-2">
            <div
              className={`cursor-pointer text-sm font-medium ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
            >
              See more
            </div>
            <div className="h-4 w-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
              >
                <path
                  d="M0.5 5.16667H9.83333M9.83333 5.16667L5.16667 0.5M9.83333 5.16667L5.16667 9.83333"
                  stroke={isDark ? "#FAFAFA" : "#18181B"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
