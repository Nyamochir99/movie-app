"use client";

import React, { useEffect, useState } from "react";
import { PaginationMovie } from "./paginationMovie";
import { Genres, MovieResponse, SearchMovie } from "@/app/types";
import axios from "axios";
import { BadgeSVG } from "./badgeSVG";
import { MoiveCard } from "./moiveCard";
import Link from "next/link";

export const SearchResultsMovie = ({
  isDark,
  search,
}: {
  isDark: boolean;
  search: string;
}) => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [active, setActive] = useState<number[]>([]);
  const [genreData, setGenreData] = useState<MovieResponse>();
  const [loading, setLoading] = useState<boolean>(true);
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
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=0bfe54d2ee447174877d5dffda1a2713&page=${page}`,
      )
      .then((res) => {
        setMovies(res.data.results);
        setGenreData(res.data);
      });
  }, [page]);

  const handleGenre = (genreId: number) => {
    setActive((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      }
      return [...prev, genreId];
    });
    setPage(1);
  };

  return (
    <div
      className={`mt-13 nb-19 w-7xl flex flex-col gap-8 ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
    >
      <div className="text-3xl font-semibold">Search results</div>
      <div className="flex justify-between items-stretch">
        <div className="flex flex-col gap-8 w-202">
          <div className="text-xl font-semibold">{`${genreData?.total_results} results for "${search}"`}</div>
          {genreData?.total_results === 0 ? (
            <>
              <div
                className={`w-full h-24 rounded-lg flex justify-center items-center text-[14px] leading-3.5 font-medium border ${isDark ? "border-[#27272A]" : "border-[#E4E4E7]"}`}
              >
                No results found.
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-y-8 gap-x-12">
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
            </>
          )}
        </div>
        <div
          className={`border-l mb-10 mx-4 ${isDark ? "border-[#27272A]" : "border-[#e4e4e7]"}`}
        ></div>
        <div className="flex flex-col gap-5 justify-start w-97 mb-10">
          <div className="text-2xl font-semibold">Genres</div>
          <div className="text-base font-normal">
            See lists of movies by genre
          </div>
          <div className="flex flex-wrap items-start gap-4">
            {genres.map((genre) => (
              <Link href={`/genre/${genre.id}`} key={genre.id}>
                <BadgeSVG
                  genre={genre.name}
                  isDark={isDark}
                  onClick={() => handleGenre(genre.id)}
                  isActive={active.includes(genre.id)}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
