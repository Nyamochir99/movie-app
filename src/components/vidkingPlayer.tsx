"use client";

import { useEffect, useState } from "react";

type VidkingPlayerProps = {
  movieId: string;
  title?: string;
  posterUrl?: string;
  isDark?: boolean;
};

function buildEmbedUrl(movieId: string) {
  const params = new URLSearchParams({
    color: "4338CA",
    autoPlay: "false",
  });
  return `https://www.vidking.net/embed/movie/${movieId}?${params.toString()}`;
}

const iframeAllow =
  "autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer";

export function VidkingPlayer({
  movieId,
  title,
  posterUrl,
  isDark = true,
}: VidkingPlayerProps) {
  const embedUrl = buildEmbedUrl(movieId);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      const touch =
        "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
      setIsMobile(mq.matches || touch);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile) {
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
          <a
            href={embedUrl}
            target="_self"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-11 px-6 rounded-md bg-[#F4F4F5] text-[#18181B] text-sm font-medium"
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
          </a>
          <p className="text-xs text-white/80 text-center">
            Opens the player in this tab for mobile compatibility
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video my-6 sm:my-10">
      <iframe
        src={embedUrl}
        title={title ? `Watch ${title}` : "Movie player"}
        allow={iframeAllow}
        allowFullScreen
        className="w-full h-full rounded-lg border-0"
      />
    </div>
  );
};
