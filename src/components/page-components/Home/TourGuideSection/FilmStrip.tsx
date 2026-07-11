"use client";

import { useRef } from "react";
import { Daum } from "@/types/Data/toursGuide";
import FilmFrame from "../../../ui/FilmFrame/FilmFrame";

interface FilmStripProps {
  cards: Daum[];
  direction: "up" | "down";
  speed: number;
}

export default function FilmStrip({ cards, direction, speed }: FilmStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const items  = cards.length > 0 ? cards : [];
  // Always duplicate for seamless loop — even if items > 8
  const looped = [...items, ...items];

  const animationStyle: React.CSSProperties = {
    animationName:            direction === "up" ? "filmScrollUp" : "filmScrollDown",
    animationDuration:        `${speed}s`,
    animationTimingFunction:  "linear",
    animationIterationCount:  "infinite",
  };

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  if (items.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ flex: 1, height: "100%", willChange: "transform" }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      // Touch support — pause on touch start, resume on touch end
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      {/*
        Keyframes defined here with unique names (filmScrollUp/Down)
        to avoid any global collision.
        No media-query override — the parent section handles
        visibility per breakpoint, so this strip always animates.
      */}
      <style jsx>{`
        @keyframes filmScrollUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes filmScrollDown {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
      `}</style>

      <div
        ref={trackRef}
        className="flex flex-col gap-3 md:gap-4"
        style={{ ...animationStyle, willChange: "transform", transform: "translateZ(0)" }}
      >
        {looped.map((item, i) => (
          <FilmFrame key={`${item?._id}-${i}`} data={item} />
        ))}
      </div>
    </div>
  );
}