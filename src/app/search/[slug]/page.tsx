"use client";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SearchResultsMovie } from "@/components/searchResultsMovie";
import { useTheme } from "@/context/ThemeContext";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SearchResults() {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const search = String(slug).replaceAll("%20", " ");
  return (
    <div
      className={`flex flex-col h-full w-full ${isDark ? "bg-[#09090B]" : "bg-white"}`}
    >
      <div className="relative z-20 min-h-screen w-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center">
          <Nav isDark={isDark} />
          <SearchResultsMovie isDark={isDark} search={search} />
        </div>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
