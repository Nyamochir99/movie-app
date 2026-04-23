"use client";
import { Genres } from "@/app/types";
import React, { useState } from "react";

export const BadgeSVG = ({
  genre,
  isDark,
}: {
  genre: string;
  isDark: boolean;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div
      onClick={() => {
        setIsActive(!isActive);
      }}
      className={`flex items-center justify-center gap-2px py-0.5 px-2.5 border rounded-full cursor-pointer ${isActive ? "border-[#18181B] bg-[#18181B] text-[#FAFAFA]" : `${isDark ? "border-[#27272a] text-[#fafafa]" : "border-[#E4E4E7] text-[#09090B]"}`}`}
    >
      <div className={`text-[12px] leading-4 font-semibold`}>{genre}</div>
      {isActive ? (
        <div className="w-4 h-4 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
          >
            <path
              d="M8.5 0.5L0.5 8.5M0.5 0.5L8.5 8.5"
              stroke="#FAFAFA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <div className="w-4 h-4 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5"
            height="9"
            viewBox="0 0 5 9"
            fill="none"
          >
            <path
              d="M0.5 8.5L4.5 4.5L0.5 0.5"
              stroke={isDark ? "#FAFAFA" : "#09090B"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
