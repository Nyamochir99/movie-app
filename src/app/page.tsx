"use client";
import { Footer } from "@/components/footer";
import { MovieList } from "@/components/movieList";
import { Nav } from "@/components/nav";
import { SwiperMain } from "@/components/swiper";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function Home() {
  const { isDark } = useTheme();
  return (
    <div
      className={`flex flex-col h-full w-full ${isDark ? "bg-[#09090B]" : "bg-white"}`}
    >
      <div className="relative z-20 w-full flex justify-center">
        <Nav isDark={isDark} />
      </div>
      <div className=" relative z-10">
        <SwiperMain />
      </div>
      <div className="w-full flex flex-col items-center gap-13 my-13">
        <MovieList isDark={isDark} listName="upcoming" />
        <MovieList isDark={isDark} listName="popular" />
        <MovieList isDark={isDark} listName="top_rated" />
      </div>
      <Footer isDark={isDark} />
    </div>
  );
}
