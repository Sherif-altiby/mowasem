"use client";

import { memo, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { extractImageUrl } from "@/lib/utils/global-utils";

export interface Service {
  id: string;
  name: string;
  description: string;
  imageCover: string;
}

interface CardProps {
  service: Service;
  index: number;
  isLast: boolean;
  onSelect: (s: Service) => void;
  dragged: React.RefObject<boolean>;
}


const ServiceCard = memo(function ServiceCard({
  service,
  index,
  isLast,
  onSelect,
  // totalCount,
  dragged,
}: CardProps) {
  const iconWrapRef = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const barRef      = useRef<HTMLDivElement>(null);
  const tweenRef    = useRef<gsap.core.Tween | null>(null);

  const handleEnter = () => {
    // lift icon
    gsap.to(iconWrapRef.current, {
      y: -7,
      duration: 0.35,
      ease: "power2.out",
    });
    // scale + show dashed ring
    gsap.to(ringRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.4)",
    });
    // spin ring infinitely
    tweenRef.current = gsap.to(ringRef.current, {
      rotation: 360,
      duration: 5,
      ease: "none",
      repeat: -1,
    });
    // bottom bar expand
    gsap.to(barRef.current, {
      scaleX: 1,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    tweenRef.current?.kill();
    gsap.to(iconWrapRef.current, {
      y: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });
    gsap.to(ringRef.current, {
      scale: 0.7,
      opacity: 0,
      rotation: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(barRef.current, {
      scaleX: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <div className="flex items-stretch shrink-0">
          <button
            className="
              group relative flex flex-col items-center justify-center gap-3 md:gap-5 rounded-t-2xl
              px-3 py-4 md:px-5 md:py-6 lg:px-12 lg:py-8
              cursor-pointer select-none
              hover:bg-black/[0.025] transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
            "
            onClick={() => { if (!dragged.current) onSelect(service); }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
            aria-label={service.name}
          >
            {/* icon + ring wrapper — positioned relatively so ring can be absolute */}
            <div
              ref={iconWrapRef}
              className="relative flex items-center justify-center w-[80px] md:w-[130px] h-[80px] md:h-[130px]"
            >
              {/* solid background circle */}
              <div className="absolute inset-0 rounded-full bg-primary/5" />

              {/* dashed spinning ring — starts hidden */}
              <div
                ref={ringRef}
                className="absolute scale-75 inset-[-5px] opacity-0 md:inset-[-7px]  rounded-full  border border-primary"
                aria-hidden
              />

              {/* service image */}
              <Image
                src={
                  extractImageUrl(service.imageCover) ||
                  "/assets/service-placeholder.png"
                }
                alt=""
                width={70}
                height={70}
                draggable={false}
                loading={index < 5 ? "eager" : "lazy"}
                fetchPriority={index < 5 ? "high" : "auto"}
                className="relative z-10 w-8 h-8 md:w-[70px] md:h-[70px] object-contain"
              />
            </div>

            {/* label */}
            <span className="text-xs md:text-sm lg:text-lg font-medium text-foreground whitespace-nowrap text-center leading-snug">
              {service.name}
            </span>

            {/* bottom indicator */}
            <div
              ref={barRef}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-center"
              style={{ transform: "scaleX(0)" }}
              aria-hidden
            />
          </button>

          {/* vertical divider */}
          {!isLast && (
            <div
              className="self-center h-8 md:h-12 lg:h-16 w-px bg-border shrink-0"
              aria-hidden
            />
          )}
        </div>
  );
});

export default ServiceCard;
