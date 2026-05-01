"use client";

import { Genres, MovieResponse, SearchMovie } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BadgeSVG } from "./badgeSVG";
import { MoiveCard } from "./moiveCard";
import { PaginationMovie } from "./paginationMovie";

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
  const [genreData, setGenreData] = useState<MovieResponse>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=0bfe54d2ee447174877d5dffda1a2713",
      )
      .then((res) => {
        setGenres(res.data.genres);
      });
  }, []);
  useEffect(() => {
    const activeGenres = active.join(",");
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=0bfe54d2ee447174877d5dffda1a2713&with_genres=${activeGenres}&page=${page}`,
      )
      .then((res) => {
        setMovies(res.data.results);
        setGenreData(res.data);
      });
  }, [active, page]);

  const handleGenre = (genreId: number) => {
    setActive((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      }
      return [...prev, genreId];
    });
    setPage(1);
  };
  const activeGenreNames = genres
    .filter((e) => active.includes(e.id))
    .map((e) => e.name)
    .join(", ");

  return (
    <div
      className={`mt-13 nb-19 w-7xl flex flex-col gap-8 ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
    >
      <div className="text-3xl font-semibold">Search filter</div>
      <div className="flex justify-between items-stretch">
        <div className="flex flex-col gap-5 justify-start w-97">
          <div className="text-2xl font-semibold">Genres</div>
          <div className="text-base font-normal">
            See lists of movies by genre
          </div>
          <div className="flex flex-wrap items-start gap-4">
            {genres.map((genre) => (
              <BadgeSVG
                genre={genre.name}
                key={genre.id}
                isDark={isDark}
                onClick={() => handleGenre(genre.id)}
                isActive={active.includes(genre.id)}
              />
            ))}
          </div>
        </div>
        <div
          className={`border-l mb-10 mx-0 ${isDark ? "border-[#27272A]" : "border-[#e4e4e7]"}`}
        ></div>
        <div className="flex flex-col gap-8 w-202">
          <div className="text-xl font-semibold">{`${genreData?.total_results} titles in "${activeGenreNames}"`}</div>
          <div className="grid grid-cols-4 gap-y-6 gap-x-6">
            {movies.map((movie) => (
              <MoiveCard
                isSearch={true}
                movie={movie}
                isDark={isDark}
                key={movie.id}
              />
            ))}
          </div>
          <PaginationMovie
            isDark={isDark}
            totalPages={genreData?.total_pages ?? 1}
            currentPage={genreData?.page ?? 1}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
};
