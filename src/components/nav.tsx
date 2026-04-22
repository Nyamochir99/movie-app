import React from "react";
import { Logo } from "./logo";
import { SearchNav } from "./search";
import { ThemeButton } from "./themeButton";

export const Nav = ({
  isDark,
  handleTheme,
}: {
  isDark: boolean;
  handleTheme: () => void;
}) => {
  return (
    <div className="w-full h-15 flex items-center px-20 justify-between">
      <Logo isDark={isDark} />
      <SearchNav isDark={isDark} />
      <ThemeButton isDark={isDark} handleTheme={handleTheme} />
    </div>
  );
};
