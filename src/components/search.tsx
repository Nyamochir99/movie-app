"use client";
import React, { useEffect, useState } from "react";
import { BadgeSVG } from "./badgeSVG";
import { Badge } from "./badge";
import { Genres, SearchMovie } from "@/app/types";
import axios from "axios";
import { Span } from "next/dist/trace";
import { MovieSearch } from "./movieSearch";

export const SearchNav = ({ isDark }: { isDark: boolean }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let url =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=0bfe54d2ee447174877d5dffda1a2713";
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=0bfe54d2ee447174877d5dffda1a2713`;
    }
    axios.get(url).then((res) => {
      if (search) {
        setMovies(res.data.results);
        setIsActive(false);
      } else {
        setGenres(res.data.genres);
      }
      setLoading(false);
    });
  }, [search]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => setIsActive(!isActive)}
          className={`flex justify-center items-center border rounded-md px-4 py-2 gap-2 h-9 w-24.25 cursor-pointer border-[#E4E4E7]`}
        >
          <span className="h-4 w-4 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="5"
              viewBox="0 0 9 5"
              fill="none"
            >
              <path
                d="M0.5 0.5L4.5 4.5L8.5 0.5"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={`text-[14px] font-medium leading-5 text-white`}>
            Genre
          </span>
        </div>
        <span className="relative">
          <span className="h-4 w-4 flex items-center justify-center absolute left-3 top-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M4.7998 0.5C7.17456 0.5 9.0995 2.42507 9.09961 4.7998C9.09961 5.81543 8.74857 6.74777 8.16016 7.4834L7.87988 7.83301L11.2236 11.1768C11.23 11.1833 11.2334 11.1917 11.2334 11.2002L11.2236 11.2236C11.2106 11.2365 11.1898 11.2364 11.1768 11.2236L7.83301 7.87988L7.4834 8.16016C6.74777 8.74857 5.81543 9.09961 4.7998 9.09961C2.42507 9.0995 0.5 7.17456 0.5 4.7998C0.500106 2.42514 2.42514 0.500106 4.7998 0.5ZM4.7998 0.566406C2.46195 0.566512 0.566512 2.46195 0.566406 4.7998C0.566406 7.13775 2.46189 9.0331 4.7998 9.0332C7.13781 9.0332 9.0332 7.13781 9.0332 4.7998C9.0331 2.46189 7.13775 0.566406 4.7998 0.566406Z"
                stroke="#a1a1aa"
              />
            </svg>
          </span>
          <input
            // onBlur={() => setSearch("")}
            onClick={(e) => {
              setIsActive(false);
              setSearch(e.currentTarget.value);
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className={`h-9 w-94.75 border rounded-lg pr-3 pl-9.5 border-[#E4E4E7] text-[#fafafa] placeholder-[#a1a1aa]`}
            type="text"
            placeholder="Search..."
          />
        </span>
      </div>
      {isActive && (
        <div className="absolute top-10 left-0">
          <div
            className={`border rounded-lg w-144.25 p-5 ${isDark ? "border-[#27272a] bg-[#09090B]" : "border-[#e4e4e7] bg-white"}`}
          >
            <div
              className={`flex flex-col w-53.25 gap-1 items-start ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
            >
              <div className={`text-2xl font-semibold`}>Genres</div>
              <div className="text-[16px] leading-6 font-normal">
                See lists of movies by genre
              </div>
            </div>
            <div
              className={`h-px my-4 ${isDark ? "bg-[#27272a]" : "bg-[#E4E4E7]"}`}
            ></div>
            <div className="flex items-start content-start gap-4 flex-wrap">
              {genres.map((genre) => (
                <BadgeSVG genre={genre.name} key={genre.id} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
      )}
      {search && !isActive && (
        <div className="absolute top-10 -left-9.5">
          <div
            className={`w-144.25 p-3 rounded-lg border min-h-24 flex flex-col ${isDark ? "border-[#27272a] bg-[#09090B]" : "border-[#e4e4e7] bg-white"}`}
          >
            <div>
              {loading ? (
                <>
                  <div className="flex h-18 items-center justify-center bg-white">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300" />
                  </div>
                </>
              ) : (
                <>
                  {movies.length === 0 && (
                    <div
                      className={`flex items-center justify-center h-18 text-[14px] font-medium ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
                    >
                      No results found.
                    </div>
                  )}
                  {movies.slice(0, 5).map((movie) => (
                    <MovieSearch movie={movie} key={movie.id} isDark={isDark} />
                  ))}
                  <div
                    className={`text-sm cursor-pointer font-medium py-2 px-4 ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
                  >
                    See all results for "{search}"
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
