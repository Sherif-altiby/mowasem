"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function HeroTextAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ opacity: 0 }}
      className="text-white flex flex-col lg:flex-row gap-4 md:gap-8 items-start lg:items-end justify-between"
    >
      {children}
    </div>
  );
}