"use client";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SearchGenre } from "@/components/searchGenre";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function GenreCategory() {
  const { slug } = useParams();
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleTheme = () => {
    setIsDark(!isDark);
  };
  const genre = Number(slug);
  return (
    <div
      className={`flex flex-col min-h-screen w-full ${isDark ? "bg-[#09090B]" : "bg-white"}`}
    >
      <div className="w-full min-h-screen flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center">
          <Nav isDark={isDark} handleTheme={handleTheme} />
          <SearchGenre isDark={isDark} genre={genre} />
        </div>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
