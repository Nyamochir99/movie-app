import { SearchMovie, SimilarMovie } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MoiveCard } from "./moiveCard";
import { PaginationMovie } from "./paginationMovie";

export const SeeMore = ({
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
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

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
          `https://api.themoviedb.org/3/movie/${listName}?&api_key=0bfe54d2ee447174877d5dffda1a2713&page=${page}`,
        )
        .then((res) => {
          setMovies(res.data.results);
          setTotalPages(res.data.total_pages);
          setLoading(false);
        });
    }
    if (movieId) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=0bfe54d2ee447174877d5dffda1a2713&page=${page}`,
        )
        .then((res) => {
          setSimilar(res.data.results);
          setTotalPages(res.data.total_pages);
          setLoading(false);
        });
    }
  }, [movieId, listName, page]);

  return (
    <div className="w-7xl flex flex-col gap-8 mt-13 mb-19">
      <div
        className={`${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"} flex items-center justify-start`}
      >
        <div className="text-2xl font-semibold">{name}</div>
      </div>
      {listName === "moreLike" ? (
        <>
          {similar.length === 0 ? (
            <>
              <div
                className={`w-full h-110 rounded-lg my-10 flex justify-center items-center text-[14px] leading-3.5 font-medium border ${isDark ? "border-[#27272A] text-[#FAFAFA]" : "text-[#09090B] border-[#E4E4E7]"}`}
              >
                No movie found.
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-5 gap-[32.5px]">
                {similar.map((movie) => (
                  <MoiveCard
                    isSearch={false}
                    movie={movie}
                    isDark={isDark}
                    key={movie.id}
                  />
                ))}
              </div>
              <PaginationMovie
                isDark={isDark}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-[32.5px]">
            {movies.map((movie) => (
              <MoiveCard
                isSearch={false}
                movie={movie}
                isDark={isDark}
                key={movie.id}
              />
            ))}
          </div>
          <PaginationMovie
            isDark={isDark}
            totalPages={totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </div>
  );
};
