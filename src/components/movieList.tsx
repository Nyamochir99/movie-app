import { SearchMovie, SimilarMovie } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MoiveCard } from "./moiveCard";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export const MovieList = ({
  listName,
  isDark,
  movieId,
}: {
  listName: string;
  isDark: boolean;
  movieId?: number;
}) => {
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [similar, setSimilar] = useState<SearchMovie[]>([]);

  let name = "";
  let link = "";
  if (listName === "upcoming") {
    name = "Upcoming";
    link = "upcoming";
  } else if (listName === "popular") {
    name = "Popular";
    link = "popular";
  } else if (listName === "top_rated") {
    name = "Top Rated";
    link = "top_rated";
  } else {
    name = "More like this";
  }

  useEffect(() => {
    if (listName !== "moreLike") {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${listName}?api_key=0bfe54d2ee447174877d5dffda1a2713`,
        )
        .then((res) => {
          setMovies(res.data.results);
          setLoading(false);
        });
    }
    if (movieId) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=0bfe54d2ee447174877d5dffda1a2713`,
        )
        .then((res) => {
          setSimilar(res.data.results);
          setLoading(false);
        });
    }
  }, [movieId, listName]);

  return (
    <>
      {loading ? (
        <div className="w-7xl flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid grid-cols-5 gap-[32.5px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-57.5 h-110" />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-7xl flex flex-col gap-8">
          <div
            className={`${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"} flex items-center justify-between`}
          >
            <div className="text-2xl font-semibold">{name}</div>
            <Link
              href={
                listName === "moreLike" ? `/cat/${movieId}` : `/cat/${listName}`
              }
              className="h-9 flex gap-2 items-center justify-center cursor-pointer"
            >
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
            </Link>
          </div>
          {listName === "moreLike" ? (
            <>
              {similar.length === 0 ? (
                <>
                  <div
                    className={`w-full h-24 rounded-lg my-10 flex justify-center items-center text-[14px] leading-3.5 font-medium border ${isDark ? "border-[#27272A]" : "border-[#E4E4E7]"}`}
                  >
                    No movie found.
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-[32.5px]">
                    {similar.slice(0, 5).map((movie) => (
                      <MoiveCard
                        isSearch={false}
                        movie={movie}
                        isDark={isDark}
                        key={movie.id}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="grid grid-cols-5 gap-[32.5px]">
              {listName === "upcoming"
                ? movies
                    .slice(10)
                    .map((movie) => (
                      <MoiveCard
                        isSearch={false}
                        movie={movie}
                        isDark={isDark}
                        key={movie.id}
                      />
                    ))
                : movies
                    .slice(0, 10)
                    .map((movie) => (
                      <MoiveCard
                        isSearch={false}
                        movie={movie}
                        isDark={isDark}
                        key={movie.id}
                      />
                    ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
