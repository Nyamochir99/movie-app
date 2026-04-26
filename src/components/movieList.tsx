import { SearchMovie } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MoiveCard } from "./moiveCard";

export const MovieList = ({
  listName,
  isDark,
}: {
  listName: string;
  isDark: boolean;
}) => {
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${listName}?api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      });
  }, []);

  let name = "";
  if (listName === "upcoming") {
    name = "Upcoming";
  } else if (listName === "popular") {
    name = "Popular";
  } else {
    name = "Top Rated";
  }

  return (
    <div className="w-7xl flex flex-col gap-8">
      <div
        className={`${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"} flex items-center justify-between`}
      >
        <div className="text-2xl font-semibold">{name}</div>
        <div className="h-9 flex gap-2 items-center justify-center cursor-pointer">
          <div className="text-[14px] leading-5 font-medium">See more</div>
          <div className="flex h-4 w-4 items-center justify-center">
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
      <div className="grid grid-cols-5 gap-[32.5px]">
        {listName === "upcoming"
          ? movies
              .slice(10)
              .map((movie) => (
                <MoiveCard movie={movie} isDark={isDark} key={movie.id} />
              ))
          : movies
              .slice(0, 10)
              .map((movie) => (
                <MoiveCard movie={movie} isDark={isDark} key={movie.id} />
              ))}
      </div>
    </div>
  );
};
