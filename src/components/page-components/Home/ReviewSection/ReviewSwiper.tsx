"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import AddReviewCard from "./AddReviewCard";
import { reviews } from "@/lib/constants/home-constants";

export default function ReviewSwiper() {
  const filteredReviews = reviews.filter((review) => review.rating >= 3);

  // Split into two rows that scroll in opposite directions.
  const half = Math.ceil(filteredReviews.length / 2);
  const rowTop = filteredReviews.slice(0, half);
  const rowBottom = filteredReviews.slice(half).length
    ? filteredReviews.slice(half)
    : filteredReviews;

  // Repeat each row's items enough times that the duplicated track is
  // always wider than the viewport, so the xPercent: -50/50 loop never
  // reveals empty space on short review lists.
  const repeatRow = <T,>(row: T[], minCopies = 2) => {
    if (row.length === 0) return row;
    const copiesNeeded = Math.max(minCopies, Math.ceil(4 / row.length));
    return Array.from({ length: copiesNeeded }).flatMap(() => row);
  };

  const { loopedTop, loopedBottom } = useMemo(() => {
    return {
      loopedTop: repeatRow(rowTop),
      loopedBottom: repeatRow(rowBottom),
    };
  }, [rowTop, rowBottom]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Section reveal-on-scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;

    section.style.opacity = "0";
    section.style.transform = "translateY(40px) scale(0.96)";

    let played = false;
    const playIn = () => {
      if (played) return;
      played = true;
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      section.style.opacity = "1";
      section.style.transform = "translateY(0) scale(1)";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            playIn();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25, rootMargin: "-40px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (filteredReviews.length === 0) return null;

  return (
    <div ref={sectionRef} dir="rtl" className="w-full flex flex-col gap-8">
      {/* Header bar: rating statement + CTA, horizontal, full width */}
      <AddReviewCard />

      {/* Marquee rows, full width below the header */}
      <div
        ref={marqueeRef}
        className="relative w-full flex flex-col gap-3 md:gap-4 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-28 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-28 bg-gradient-to-r from-white to-transparent z-10" />

        {/* Top row - scrolls left */}
        <div className="overflow-hidden" dir="ltr">
          <div 
            className="flex gap-3 md:gap-4"
            style={{
              animation: `marquee-left 30s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {loopedTop.map((review, i) => (
              <ReviewCard
                key={`top-${review.id}-${i}`}
                name={review.name}
                reviewerImage={review.reviewerImage}
                rating={review.rating}
                reviewText={review.reviewText || ""}
                reviewUrl={review.reviewUrl}
                reviewTime={review.reviewTime}
              />
            ))}
          </div>
        </div>

        {/* Bottom row - scrolls right */}
        <div className="overflow-hidden" dir="ltr">
          <div 
            className="flex gap-3 md:gap-4"
            style={{
              animation: `marquee-right 26s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {loopedBottom.map((review, i) => (
              <ReviewCard
                key={`bottom-${review.id}-${i}`}
                name={review.name}
                reviewerImage={review.reviewerImage}
                rating={review.rating}
                reviewText={review.reviewText || ""}
                reviewUrl={review.reviewUrl}
                reviewTime={review.reviewTime}
              />
            ))}
          </div>
        </div>

        {/* CSS animations for marquee */}
        <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    </div>
  );
}