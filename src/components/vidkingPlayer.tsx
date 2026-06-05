"use client";

import { useEffect, useState } from "react";

type VidkingPlayerProps = {
  movieId: string;
  title?: string;
  posterUrl?: string;
  isDark?: boolean;
};

const iframeAllow =
  "autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer";

function getDesktopEmbedUrl(movieId: string) {
  const params = new URLSearchParams({
    color: "4338CA",
    autoPlay: "false",
  });
  return `https://www.vidking.net/embed/movie/${movieId}?${params.toString()}`;
}

function getMobileEmbedUrl(movieId: string) {
  return `https://vidsrc.mov/embed/movie/${movieId}`;
}

export function VidkingPlayer({
  movieId,
  title,
  posterUrl,
  isDark = true,
}: VidkingPlayerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isPlaying || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isPlaying, isMobile]);

  if (isMobile && !isPlaying) {
    return (
      <div className="w-full aspect-video my-6 sm:my-10 rounded-lg overflow-hidden relative">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title ?? "Movie poster"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className={`absolute inset-0 ${isDark ? "bg-[#18181B]" : "bg-[#F4F4F5]"}`}
          />
        )}
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-3 p-4">
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="flex items-center gap-2 h-11 px-6 rounded-md bg-[#F4F4F5] text-[#18181B] text-sm font-medium cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="13"
              viewBox="0 0 11 13"
              fill="none"
              aria-hidden
            >
              <path
                d="M0.5 0.5L9.83333 6.5L0.5 12.5V0.5Z"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Watch movie
          </button>
          <p className="text-xs text-white/80 text-center max-w-xs">
            Tap to open the mobile player
          </p>
        </div>
      </div>
    );
  }

  if (isMobile && isPlaying) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-3 shrink-0 bg-black/90">
          <span className="text-sm text-white font-medium truncate">
            {title ?? "Now playing"}
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying(false)}
            className="shrink-0 h-9 px-3 rounded-md border border-white/30 text-white text-sm cursor-pointer"
          >
            Close
          </button>
        </div>
        <div className="flex-1 min-h-0 w-full">
          <iframe
            src={getMobileEmbedUrl(movieId)}
            title={title ? `Watch ${title}` : "Movie player"}
            allow={iframeAllow}
            allowFullScreen
            referrerPolicy="origin"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video my-6 sm:my-10">
      <iframe
        src={getDesktopEmbedUrl(movieId)}
        title={title ? `Watch ${title}` : "Movie player"}
        allow={iframeAllow}
        allowFullScreen
        referrerPolicy="origin"
        className="w-full h-full rounded-lg border-0"
      />
    </div>
  );
}
