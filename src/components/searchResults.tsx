"use client";

import React, { useEffect, useState } from "react";
import { PaginationMovie } from "./paginationMovie";
import { SearchMovie } from "@/app/types";
import axios from "axios";

export const SearchResults = ({
  isDark,
  search,
}: {
  isDark: boolean;
  search: string;
}) => {
  const [results, setResults] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=0bfe54d2ee447174877d5dffda1a2713`,
    );
  }, []);

  return (
    <div
      className={`mt-13 nb-19 w-7xl flex flex-col gap-8 ${isDark ? "text-[#FAFAFA]" : "text-[#09090B]"}`}
    >
      <div className="text-3xl font-semibold">Search results</div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-8">
          <div className="w-full text-xl font-semibold flex justify-start">{`${search} results for "${search}"`}</div>
          <div className="grid grid-cols-4 gap-12"></div>
          <PaginationMovie />
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
