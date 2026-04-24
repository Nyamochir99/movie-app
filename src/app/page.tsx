"use client";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SwiperMain } from "@/components/swiper";
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
      <div className="relative z-20 w-full flex justify-center">
        <Nav isDark={isDark} handleTheme={handleTheme} />
      </div>
      <div className=" relative z-10">
        <SwiperMain />
      </div>
      <Footer />
    </div>
  );
}
