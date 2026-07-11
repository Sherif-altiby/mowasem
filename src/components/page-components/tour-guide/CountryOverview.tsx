"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CountryOverview({
  desc,
}: {
  desc: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: "power2.out" },
    );
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      <div ref={containerRef} className="rounded-2xl" style={{ opacity: 0 }}>
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary border-b border-[#D6D6D6] pb-4 md:pb-6 w-full mb-2">
            نظرة عامة
          </h2>
        </div>
        <div className="relative">
          <div
            className="text-[#010204] leading-7 md:leading-10 text-sm md:text-base lg:text-xl overflow-hidden text-ellipsis"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        </div>
      </div>
    </div>
  );
}