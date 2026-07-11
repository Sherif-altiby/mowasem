// components/GSAPSwiper.tsx
"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGSAPSwiper } from "@/hooks/useGSAPSwiper";

interface GSAPSwiperProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  showNavigation?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  gap?: number;
  className?: string;
  classNameSlider?: string;
}

export default function GSAPSwiper<T = unknown>({
  items,
  renderItem,
  showNavigation = true,
  autoplay = false,
  autoplayDelay = 5000,
  gap = 24,
  className = "",
  classNameSlider ="w-[60vw] sm:w-[340px] md:w-[320px] lg:w-[330px]",
}: GSAPSwiperProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const { canPrev, canNext, scrollByCards } = useGSAPSwiper(
    trackRef as React.RefObject<HTMLDivElement>,
    viewportRef as React.RefObject<HTMLDivElement>,
    {
      gap,
      autoplay,
      autoplayDelay,
    }
  );

  if (!items.length) {
    return <div className="text-center py-8 text-gray-500">لا توجد عناصر</div>;
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div
        dir="rtl"
        ref={viewportRef}
        className="overflow-hidden px-2 cursor-grab active:cursor-grabbing"
      >
        <div
          ref={trackRef}
          dir="rtl"
          className="flex gap-4 md:gap-6 pt-8 pb-7 will-change-transform"
          style={{ touchAction: "pan-y" }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              dir="rtl"
              className={`flex-shrink-0  ${classNameSlider}`}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* أزرار التنقل */}
      {showNavigation && (
        <>
          <button
            type="button"
            aria-label="الشريحة السابقة"
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            className="hidden md:flex items-center justify-center
              absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10
              bg-primary rounded-full p-3 lg:p-4
              border border-transparent text-white
              transition-all duration-200 cursor-pointer
              disabled:bg-white disabled:border-[#676768]
              disabled:text-[#676768] disabled:cursor-not-allowed
              hover:scale-105 active:scale-95"
          >
            <ChevronRight size={25} />
          </button>

          <button
            type="button"
            aria-label="الشريحة التالية"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            className="hidden md:flex items-center justify-center
              absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10
              bg-primary rounded-full p-3 lg:p-4
              border border-transparent text-white
              transition-all duration-200 cursor-pointer
              disabled:bg-white disabled:border-[#676768]
              disabled:text-[#676768] disabled:cursor-not-allowed
              hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={25} />
          </button>
        </>
      )}
    </div>
  );
}