"use client";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SeeMore } from "@/components/seeMore";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function MovieCategory() {
  const { slug } = useParams();
  const [isDark, setIsDark] = useState<boolean>(false);
  const name = String(slug);
  const isMovieId = !isNaN(Number(slug));

  const handleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <div
      className={`flex flex-col h-full w-full ${isDark ? "bg-[#09090B]" : "bg-white"}`}
    >
      <div className="w-full min-h-screen flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center">
          <Nav isDark={isDark} handleTheme={handleTheme} />
          <SeeMore
            isDark={isDark}
            listName={isMovieId ? "moreLike" : name}
            movieId={isMovieId ? Number(slug) : undefined}
          />
        </div>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
