import React from "react";
import { Logo } from "./logo";
import { SearchNav } from "./search";
import { ThemeButton } from "./themeButton";

export const Nav = ({ isDark }: { isDark: boolean }) => {
  return (
    <div
      className={`${isDark ? "bg-[#27272A]" : "bg-[#4338CA]"} flex justify-center w-full relative z-50`}
    >
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile */}
        <div className="flex flex-col gap-3 py-3 sm:hidden">
          <div className="flex items-center justify-between">
            <Logo isDark={true} />
            <ThemeButton />
          </div>
          <SearchNav isDark={isDark} />
        </div>

        {/* Desktop */}
        <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:h-15 sm:gap-4">
          <div className="flex items-center justify-start">
            <Logo isDark={true} />
          </div>
          <div className="flex items-center justify-center">
            <SearchNav isDark={isDark} />
          </div>
          <div className="flex items-center justify-end">
            <ThemeButton />
          </div>
        </div>
      </div>
    </div>
  );
};
