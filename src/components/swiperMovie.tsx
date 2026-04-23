import { SearchMovie } from "@/app/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const SwiperMovie = () => {
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      });
  }, []);
  const movie = movies[1];
  if (loading) {
    return (
      <div className="w-full h-150 flex items-center justify-center">
        Уншиж байна...
      </div>
    );
  }
  return (
    <div
      className="w-full h-150 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    ></div>
  );
};
