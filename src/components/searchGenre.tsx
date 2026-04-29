"use client";

import { Genres, SearchMovie } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BadgeSVG } from "./badgeSVG";

export const SearchGenre = ({
  isDark,
  genre,
}: {
  isDark: boolean;
  genre: number;
}) => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [active, setActive] = useState<number[]>([genre]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=0bfe54d2ee447174877d5dffda1a2713",
      )
      .then((res) => {
        setGenres(res.data.genres);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0bfe54d2ee447174877d5dffda1a2713&with_genres=${active}`,
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);
  return (
    <div
      className={`mt-13 nb-19 w-7xl flex flex-col gap-8 ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
    >
      <div className="text-3xl font-semibold">Search filter</div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-5 justify-start w-97">
          <div className="text-2xl font-semibold">Genres</div>
          <div className="text-base font-normal">
            See lists of movies by genre
          </div>
          <div className="flex flex-wrap items-start gap-4">
            {genres.map((genre) => (
              <BadgeSVG genre={genre.name} key={genre.id} isDark={isDark} />
            ))}
          </div>
        </div>
        <div
          className={`w-px mx-4 ${isDark ? "bg-[#27272A]" : "bg-[#e4e4e7]"}`}
        ></div>
        <div className="flex flex-col gap-8 w-202">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
