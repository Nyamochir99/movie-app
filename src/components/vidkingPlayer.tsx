"use client";

import { useEffect, useState } from "react";

type VidkingPlayerProps = {
  movieId: string;
  title?: string;
  posterUrl?: string;
  isDark?: boolean;
};

type Provider = {
  id: string;
  name: string;
  buildUrl: (movieId: string) => string;
};

const PROVIDERS: Provider[] = [
  {
    id: "vidking",
    name: "Vidking",
    buildUrl: (id) =>
      `https://www.vidking.net/embed/movie/${id}?color=4338CA&autoPlay=false`,
  },
  {
    id: "autoembed",
    name: "Server 2",
    buildUrl: (id) => `https://autoembed.co/movie/tmdb/${id}`,
  },
  {
    id: "vidlink",
    name: "Server 3",
    buildUrl: (id) =>
      `https://vidlink.pro/movie/${id}?autoplay=false&title=true`,
  },
];

const iframeAllow =
  "autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer";

export function VidkingPlayer({
  movieId,
  title,
  posterUrl,
  isDark = true,
}: VidkingPlayerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [providerId, setProviderId] = useState("vidking");

  const provider =
    PROVIDERS.find((p) => p.id === providerId) ?? PROVIDERS[0];
  const embedUrl = provider.buildUrl(movieId);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setProviderId(mobile ? "autoembed" : "vidking");
    };
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

  const providerTabs = (
    <div className="flex flex-wrap gap-2">
      {PROVIDERS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => setProviderId(p.id)}
          className={`h-8 px-3 rounded-md text-xs font-medium cursor-pointer border transition-colors ${
            providerId === p.id
              ? isDark
                ? "bg-[#FAFAFA] text-[#18181B] border-[#FAFAFA]"
                : "bg-[#18181B] text-white border-[#18181B]"
              : isDark
                ? "border-[#27272A] text-[#FAFAFA] hover:bg-[#27272A]"
                : "border-[#E4E4E7] text-[#09090B] hover:bg-[#F4F4F5]"
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );

  const playerIframe = (
    <iframe
      key={`${providerId}-${movieId}`}
      src={embedUrl}
      title={title ? `Watch ${title}` : "Movie player"}
      allow={iframeAllow}
      allowFullScreen
      referrerPolicy="origin"
      className="w-full h-full border-0"
    />
  );

  if (isMobile && !isPlaying) {
    return (
      <div className="w-full my-6 sm:my-10 flex flex-col gap-3">
        {providerTabs}
        <div className="w-full aspect-video rounded-lg overflow-hidden relative">
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
            <p className="text-xs text-white/80 text-center">
              Using {provider.name} — switch server above if it does not load
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isMobile && isPlaying) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-3 shrink-0 bg-black/90">
          <span className="text-sm text-white font-medium truncate">
            {title ?? "Now playing"} · {provider.name}
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying(false)}
            className="shrink-0 h-9 px-3 rounded-md border border-white/30 text-white text-sm cursor-pointer"
          >
            Close
          </button>
        </div>
        <div className="px-4 pb-3 shrink-0">{providerTabs}</div>
        <div className="flex-1 min-h-0 w-full">{playerIframe}</div>
      </div>
    );
  }

  return (
    <div className="w-full my-6 sm:my-10 flex flex-col gap-3">
      {providerTabs}
      <div className="w-full aspect-video">{playerIframe}</div>
    </div>
  );
}
