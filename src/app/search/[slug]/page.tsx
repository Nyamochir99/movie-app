"use client";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SearchResultsMovie } from "@/components/searchResultsMovie";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SearchResults() {
  const { slug } = useParams();
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleTheme = () => {
    setIsDark(!isDark);
  };
  const search = String(slug).replaceAll("%20", " ");
  return (
    <div
      className={`flex flex-col h-full w-full ${isDark ? "bg-[#09090B]" : "bg-white"}`}
    >
      <div className="relative z-20 w-full flex flex-col items-center">
        <Nav isDark={isDark} handleTheme={handleTheme} />
        <SearchResultsMovie isDark={isDark} search={search} />
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
