"use client";
import { Nav } from "@/components/nav";
import { useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <div
      className={`flex flex-col h-screen w-full ${isDark ? "bg-[#09090B]" : "bg-white"}`}
    >
      <Nav isDark={isDark} handleTheme={handleTheme} />
    </div>
  );
}
