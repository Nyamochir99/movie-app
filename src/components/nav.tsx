import React from "react";
import { Logo } from "./logo";
import { SearchNav } from "./search";
import { ThemeButton } from "./themeButton";

export const Nav = ({ isDark }: { isDark: boolean }) => {
  return (
    <div
      className={`${isDark ? "bg-[#27272A]" : "bg-[#4338CA]"} flex justify-center w-full`}
    >
      <div className={`w-7xl h-15 flex items-center justify-between`}>
        <Logo isDark={true} />
        <SearchNav isDark={isDark} />
        <ThemeButton />
      </div>
    </div>
  );
};
