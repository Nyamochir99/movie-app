"use client";

import {
  CastMember,
  MovieDetails,
  SimilarMovie,
  TrailerResult,
} from "@/app/types";
import { Badge } from "@/components/badge";
import { Footer } from "@/components/footer";
import { MovieList } from "@/components/movieList";
import { Nav } from "@/components/nav";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [trailer, setTrailer] = useState<TrailerResult[]>([]);
  const [similar, setSimilar] = useState<SimilarMovie[]>([]);
  const [credits, setCredits] = useState<CastMember[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        setMovie(res.data);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        const onlyTrailers = (res.data.results as TrailerResult[]).filter(
          (video) => video.type === "Trailer" && video.official === true,
        );
        setTrailer(onlyTrailers);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        setSimilar(res.data.results);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0bfe54d2ee447174877d5dffda1a2713`,
      )
      .then((res) => {
        setCredits([...res.data.cast, ...res.data.crew]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const [isDark, setIsDark] = useState<boolean>(false);

  const handleTheme = () => {
    setIsDark(!isDark);
  };

  const trailerKey = trailer.length > 1 ? trailer[1]?.key : trailer[0]?.key;
  const director = credits.filter(
    (cast) =>
      cast.known_for_department === "Directing" && cast.job === "Director",
  );
  const writers = credits.filter(
    (cast) => cast.known_for_department === "Writing",
  );
  const stars = credits.filter(
    (cast) => cast.known_for_department === "Acting",
  );

  return (
    <div
      className={`flex flex-col h-full w-full ${isDark ? "bg-[#09090B]" : "bg-white"}`}
    >
      <div className="relative z-20 w-full flex justify-center">
        <Nav isDark={isDark} handleTheme={handleTheme} />
      </div>
      <div
        className={`w-full flex flex-col mt-13 mb-28 items-center ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
      >
        <div className="w-7xl flex flex-col gap-6">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-1 items-start">
              <div className="text-4xl font-bold">{movie?.title}</div>
              <div className="text-lg font-normal">
                {movie?.release_date?.replaceAll("-", ".")} ·{" "}
                {movie?.adult ? "R" : "PG"} ·{" "}
                {movie?.runtime
                  ? movie?.runtime < 60
                    ? `${movie?.runtime}m`
                    : `${Math.floor(movie?.runtime / 60)}h ${movie?.runtime % 60}m`
                  : "N/A"}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-xs font-medium">Rating</div>
              <div className="flex items-center">
                <div className="flex h-7 w-7 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M12.1667 0.5L15.7717 7.80333L23.8333 8.98167L18 14.6633L19.3767 22.69L12.1667 18.8983L4.95667 22.69L6.33333 14.6633L0.5 8.98167L8.56167 7.80333L12.1667 0.5Z"
                      fill={isDark ? "#FAFAFA" : "#FDE047"}
                      stroke={isDark ? "#FAFAFA" : "#FDE047"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-lg font-semibold">
                    {movie?.vote_average.toFixed(1)}
                    <span
                      className={`font-normal ${isDark ? "text-[#A1A1AA]" : "text-[#71717A]"}`}
                    >
                      /10
                    </span>
                  </div>
                  <div
                    className={`text-xs font-normal ${isDark ? "text-[#A1A1AA]" : "text-[#71717A]"}`}
                  >
                    {movie?.vote_count
                      ? movie?.vote_count > 1000
                        ? movie.vote_count.toString().slice(0, -3) + "k"
                        : movie.vote_count
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8 w-full">
            <img
              className="w-72.5 h-107 object-cover"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={movie?.title}
            />

            <iframe
              width="960"
              height="428"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-107 w-240"
            ></iframe>
          </div>
          <div className="flex flex-col gap-5 w-full items-start">
            <div className="flex gap-3">
              {movie?.genres.map((genre) => (
                <Badge key={genre.id} isDark={isDark} name={genre.name} />
              ))}
            </div>
            <div className="text-base font-normal">{movie?.overview}</div>
            <div className={`flex flex-col gap-5 divide w-full`}>
              <div
                className={`w-full flex gap-13 items-center pb-2 border-b ${isDark ? "border-b-[#27272A]" : "border-b-[#E4E4E7]"}`}
              >
                <div className="text-[16px] leading-7 font-bold w-16">
                  Director
                </div>
                <div className="text-[16px] leading-6 font-normal flex">
                  {director[0]?.name}
                </div>
              </div>
              <div
                className={`w-full flex gap-13 items-center pb-2 border-b ${isDark ? "border-b-[#27272A]" : "border-b-[#E4E4E7]"}`}
              >
                <div className="text-[16px] leading-7 font-bold w-16">
                  Writers
                </div>
                <div className="text-[16px] leading-6 font-normal flex gap-2">
                  {writers.slice(0, 3).map((name, index) => (
                    <div className="flex gap-2" key={name.id + index + index}>
                      <div key={index}>{name.name}</div>
                      {index < writers.slice(0, 3).length - 1 && <span>·</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`w-full flex gap-13 items-center pb-2 border-b ${isDark ? "border-b-[#27272A]" : "border-b-[#E4E4E7]"}`}
              >
                <div className="text-[16px] leading-7 font-bold w-16">
                  Stars
                </div>
                <div className="text-[16px] leading-6 font-normal flex gap-2">
                  {stars.slice(0, 3).map((name, index) => (
                    <div className="flex gap-2" key={name.id + index + index}>
                      <div key={index}>{name.name}</div>
                      {index < stars.slice(0, 3).length - 1 && <span>·</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <iframe
            src={"https://www.vidking.net/embed/movie/" + id}
            width="1280"
            height="600"
            allowFullScreen
          ></iframe>
          <MovieList isDark={isDark} listName="moreLike" movieId={movie?.id} />
        </div>
      </div>
      <Footer isDark={isDark} />
    </div>
  );
}
