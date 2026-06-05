"use client";
import React, { useEffect, useRef, useState } from "react";
import { BadgeSVG } from "./badgeSVG";
import { Genres, SearchMovie } from "@/app/types";
import axios from "axios";
import { MovieSearch } from "./movieSearch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

const dropdownPanelClass = (isDark: boolean) =>
  `border rounded-lg p-4 sm:p-5 shadow-lg ${
    isDark ? "border-[#27272a] bg-[#09090B]" : "border-[#e4e4e7] bg-white"
  }`;

const dropdownPositionClass =
  "absolute top-full left-0 right-0 mt-2 z-50 max-h-[min(70vh,32rem)] overflow-y-auto sm:w-144.25 sm:max-w-144.25 sm:right-auto sm:max-h-[min(80vh,36rem)]";

export const SearchNav = ({ isDark }: { isDark: boolean }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeGenres, setActiveGenres] = useState<number[]>([]);

  const closeAll = () => {
    setIsGenreOpen(false);
    setIsSearchOpen(false);
  };

  const showSearchResults =
    Boolean(search.trim()) && isSearchOpen && !isGenreOpen;
  const isDropdownOpen = isGenreOpen || showSearchResults;

  useEffect(() => {
    if (!search.trim()) {
      setMovies([]);
      setLoading(false);
      setIsSearchOpen(false);
      return;
    }
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      });
  }, [search]);

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
    if (!isDropdownOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeAll();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isDropdownOpen]);

  const handleGenre = (genreId: number) => {
    setActiveGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      }
      return [...prev, genreId];
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      closeAll();
      router.push(`/search/${search}`);
    }
    if (e.key === "Escape") {
      closeAll();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full sm:w-auto sm:min-w-[28rem]"
    >
      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={() => {
            setIsGenreOpen((prev) => !prev);
            setIsSearchOpen(false);
          }}
          aria-label="Open genres"
          aria-expanded={isGenreOpen}
          className="shrink-0 flex justify-center items-center border rounded-md px-2.5 sm:px-4 h-9 gap-1 sm:gap-2 cursor-pointer border-[#E4E4E7]"
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
          <span className="hidden sm:inline text-[14px] font-medium leading-5 text-white">
            Genre
          </span>
        </button>
        <div className="relative flex-1 min-w-0">
          <span className="h-4 w-4 flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsGenreOpen(false);
              if (search.trim()) setIsSearchOpen(true);
            }}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              setIsGenreOpen(false);
              setIsSearchOpen(Boolean(value.trim()));
            }}
            className="h-9 w-full min-w-0 border outline-none rounded-lg pr-3 pl-9 border-[#E4E4E7] text-[#fafafa] placeholder-[#a1a1aa] text-sm sm:text-base"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      {isGenreOpen && (
        <div className={dropdownPositionClass}>
          <div className={dropdownPanelClass(isDark)}>
            <div
              className={`flex flex-col gap-1 items-start ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
            >
              <div className="text-xl sm:text-2xl font-semibold">Genres</div>
              <div className="text-sm sm:text-[16px] leading-6 font-normal">
                See lists of movies by genre
              </div>
            </div>
            <div
              className={`h-px my-3 sm:my-4 ${isDark ? "bg-[#27272a]" : "bg-[#E4E4E7]"}`}
            />
            <div className="flex items-start gap-2 sm:gap-4 flex-wrap">
              {genres.map((genre) => (
                <Link
                  href={`/genre/${genre.id}`}
                  key={genre.id}
                  className="block"
                  onClick={closeAll}
                >
                  <BadgeSVG
                    genre={genre.name}
                    isDark={isDark}
                    onClick={() => handleGenre(genre.id)}
                    isActive={activeGenres.includes(genre.id)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSearchResults && (
        <div className={`${dropdownPositionClass} sm:left-auto sm:right-0`}>
          <div
            className={`${dropdownPanelClass(isDark)} p-3 sm:p-4 min-h-24 flex flex-col`}
          >
            {loading ? (
              <div className="w-full flex gap-3 sm:gap-4 p-2 mb-2">
                <Skeleton className="w-14 sm:w-17 h-20 sm:h-25 rounded-md shrink-0" />
                <div className="flex flex-col gap-px flex-1 min-w-0">
                  <Skeleton className="h-6 sm:h-7 w-full max-w-30" />
                  <Skeleton className="h-5 sm:h-6 w-17" />
                  <div className="flex justify-between w-full mt-3">
                    <Skeleton className="h-5 w-10" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
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
                <Link
                  href={`/search/${search}`}
                  onClick={closeAll}
                  className={`text-sm cursor-pointer font-medium py-2 px-2 sm:px-4 truncate ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
                >
                  See all results for &quot;{search}&quot;
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
