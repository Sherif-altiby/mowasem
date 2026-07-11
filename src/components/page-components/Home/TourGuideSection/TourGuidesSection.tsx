"use client";

import { useMemo } from "react";
import { ToursGuide } from "@/types/Data/toursGuide";
import FilmStrip from "./FilmStrip";

// ─── Config ────────────────────────────────────────────────────────────────

const STRIP_CONFIG = [
  { direction: "up" as const,   speed: 70  },
  { direction: "down" as const, speed: 90  },
  { direction: "up" as const,   speed: 58  },
  { direction: "down" as const, speed: 80  },
  { direction: "up" as const,   speed: 100 },
];

// Desktop uses 5 strips; mobile/tablet uses 3 (center ones, best variety)
const DESKTOP_STRIP_COUNT = 5;
const MOBILE_STRIP_COUNT  = 3;
const MOBILE_STRIP_INDICES = [0, 1, 2]; // which strips to show on mobile

// ─── Component ─────────────────────────────────────────────────────────────

export default function TourGuidesSection({ data }: { data: ToursGuide }) {
  const cards = useMemo(() => {
    const seen = new Set<string>();
    return [...(data?.data || [])].filter((item) => {
      const name      = item?.country?.name;
      const hasImage  = !!item?.country?.imageCover?.url;
      const hasName   = !!(name || item?.country?.continent || item?.introduction?.ar);

      if (!hasImage || !hasName) return false;
      if (name && seen.has(name)) return false;
      if (name) seen.add(name);
      return true;
    });
  }, [data]);

  // Distribute round-robin for DESKTOP (5 strips)
  const desktopStrips = useMemo(
    () =>
      Array.from({ length: DESKTOP_STRIP_COUNT }, (_, si) =>
        cards.filter((_, i) => i % DESKTOP_STRIP_COUNT === si)
      ),
    [cards]
  );

  // Distribute round-robin for MOBILE (3 strips)
  const mobileStrips = useMemo(
    () =>
      Array.from({ length: MOBILE_STRIP_COUNT }, (_, si) =>
        cards.filter((_, i) => i % MOBILE_STRIP_COUNT === si)
      ),
    [cards]
  );

  return (
    <section
      aria-label="وجهات المرشدين السياحيين"
      className="relative w-full overflow-hidden rounded-2xl container mx-auto"
    >

      {/* ════════════════════════════════════════
          MOBILE  (hidden on md+)
          3 vertical strips, no rotation, shorter height
      ════════════════════════════════════════ */}
      <div className="block md:hidden relative h-[55vh] overflow-hidden rounded-2xl">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0  w-8  z-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8  z-20 bg-gradient-to-l from-white to-transparent" />
        <div className="pointer-events-none absolute top-0    left-0 right-0 h-16 z-20 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 z-20 bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* No rotation on mobile — straight vertical strips */}
        <div className="absolute inset-0 flex gap-2 items-stretch px-1">
          {mobileStrips.map((strip, si) => (
            <FilmStrip
              key={si}
              cards={strip}
              direction={STRIP_CONFIG[MOBILE_STRIP_INDICES[si]].direction}
              speed={STRIP_CONFIG[MOBILE_STRIP_INDICES[si]].speed}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          TABLET  (hidden on lg+, hidden on mobile)
          3 strips, slight rotation -6deg
      ════════════════════════════════════════ */}
      <div className="hidden md:block lg:hidden relative h-[65vh] overflow-hidden rounded-2xl">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0  w-20 z-20 bg-gradient-to-r from-white via-white/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-20 bg-gradient-to-l from-white via-white/70 to-transparent" />
        <div className="pointer-events-none absolute top-0    left-0 right-0 h-24 z-20 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-20 bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* reduced rotation for tablet */}
        <div
          className="absolute flex gap-4 items-stretch will-change-transform"
          style={{
            transform: "rotate(-6deg) translateZ(0)",
            top: "-8%", left: "-8%", right: "-8%", bottom: "-8%",
          }}
        >
          {mobileStrips.map((strip, si) => (
            <FilmStrip
              key={si}
              cards={strip}
              direction={STRIP_CONFIG[MOBILE_STRIP_INDICES[si]].direction}
              speed={STRIP_CONFIG[MOBILE_STRIP_INDICES[si]].speed}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          DESKTOP (lg+)
          Original 5-strip rotated layout
      ════════════════════════════════════════ */}
      <div className="hidden lg:block relative h-[90vh] overflow-hidden rounded-2xl">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0  w-32 z-20 bg-gradient-to-r from-white via-white/80 via-30% to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-20 bg-gradient-to-l from-white via-white/80 via-30% to-transparent" />
        <div className="pointer-events-none absolute top-0    left-0 right-0 h-32 z-20 bg-gradient-to-b from-white via-white/80 via-25% to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-20 bg-gradient-to-t from-white via-white/80 via-25% to-transparent" />

        <div
          className="absolute flex gap-4 items-stretch will-change-transform"
          style={{
            transform: "rotate(-10deg) translateZ(0)",
            top: "-11%", left: "-11%", right: "-11%", bottom: "-11%",
          }}
        >
          {desktopStrips.map((strip, si) => (
            <FilmStrip
              key={si}
              cards={strip}
              direction={STRIP_CONFIG[si].direction}
              speed={STRIP_CONFIG[si].speed}
            />
          ))}
        </div>
      </div>

    </section>
  );
}