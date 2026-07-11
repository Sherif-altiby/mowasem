"use client";

import React, { useEffect, useRef } from "react";
import HotelCard from "@/components/ui/HotelCard/HotelCard";
import { Hotels } from "@/types/Data/hotels";
import { FaHotel } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HotelSliderProps {
  data: Hotels;
  trackRef: React.RefObject<HTMLDivElement | null>;
}

export default function HotelSlider({ data, trackRef }: HotelSliderProps) {
  const hotels = data.data.hotels;
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Dots progress — reads from same ScrollTrigger trigger (the outer section)
  useEffect(() => {
    if (!trackRef.current || !sectionRef.current) return;
    const track = trackRef.current;
    // We need to find the pinned section (parent); use document query on the trigger
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        // Mirror the same trigger used in HotelSection
        trigger: track.closest("section") ?? track,
        start: "top top",
        end: () => `+=${track.scrollWidth - (track.closest("section")?.offsetWidth ?? window.innerWidth)}`,
        scrub: true,
        onUpdate: (self) => {
          // progress 0 → rightmost card, progress 1 → leftmost card (RTL)
          const activeIndex = Math.round((1 - self.progress) * (hotels.length - 1));
          dotsRef.current.forEach((dot, i) => {
            if (!dot) return;
            dot.style.opacity = i === activeIndex ? "1" : "0.3";
            dot.style.transform = i === activeIndex ? "scaleX(2.5)" : "scaleX(1)";
          });
        },
      });
    });

    return () => ctx.revert();
  }, [hotels?.length, trackRef]);

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <FaHotel className="w-12 h-12 mb-3 opacity-40" />
        <p className="text-lg font-medium">لا توجد فنادق متاحة حالياً</p>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      {/* Scrolling track — controlled by GSAP in HotelSection */}
      <div
        ref={trackRef}
        className="flex gap-3 md:gap-5"
        style={{ width: "max-content" }}
      >
        {hotels.slice(0, 6).map((hotel, index) => (
          <div
            key={hotel._id || index}
            className="w-[60vw] md:w-[600px] lg:w-[650px] shrink-0"
          >
            <HotelCard data={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}