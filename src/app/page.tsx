"use client";
import { Footer } from "@/components/footer";
import { MovieList } from "@/components/movieList";
import { Nav } from "@/components/nav";
import { SwiperMain } from "@/components/swiper";
import { useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <div
      className={`flex flex-col h-full w-full ${isDark ? "bg-[#09090B]" : "bg-white"}`}
    >
      <div className="relative z-20 w-full flex justify-center">
        <Nav isDark={isDark} handleTheme={handleTheme} />
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
