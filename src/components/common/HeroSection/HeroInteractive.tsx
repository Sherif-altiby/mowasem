"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useMemo } from "react";
import { Plane } from "lucide-react";

const Galaxy = dynamic(() => import("@/component/Galaxy"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

const CircularGallery = dynamic(() => import("@/component/CircularGallery"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px]" />,
});

export default function HeroInteractive() {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Memoize gallery items to prevent re-creation on each render
  const galleryItems = useMemo(() => [
    { image: "https://picsum.photos/seed/makkah/800/600" },
    { image: "https://picsum.photos/seed/madinah/800/600" },
    { image: "https://picsum.photos/seed/riyadh/800/600" },
    { image: "https://picsum.photos/seed/jeddah/800/600" },
    { image: "https://picsum.photos/seed/alula/800/600" },
    { image: "https://picsum.photos/seed/dammam/800/600" },
    { image: "https://picsum.photos/seed/abha/800/600"  },
    { image: "https://picsum.photos/seed/taif/800/600" }
  ], []);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Intersection Observer to pause animations when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => {
        cancelIdleCallback(id);
        mediaQuery.removeEventListener("change", listener);
        observer.disconnect();
      };
    } else {
      const id = setTimeout(() => setReady(true), 500);
      return () => {
        clearTimeout(id);
        mediaQuery.removeEventListener("change", listener);
        observer.disconnect();
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      <div className="relative min-h-[60vh] md:min-h-[calc(100vh-48px)] rounded-[20px] md:rounded-[30px] lg:rounded-[40px] bg-black m-3 md:m-4 lg:m-6 overflow-hidden">

        {/* Background layer */}
        <div className="absolute inset-0 z-0 will-change-transform">
          {ready && isVisible && (
            <Galaxy
              mouseRepulsion={!reducedMotion}
              mouseInteraction={!reducedMotion}
              density={1.2}
              glowIntensity={0.2}
              hueShift={0}
              twinkleIntensity={reducedMotion ? 0 : 0.2}
              rotationSpeed={reducedMotion ? 0 : 0.05}
              repulsionStrength={2}
              autoCenterRepulsion={0}
              starSpeed={reducedMotion ? 0 : 0.5}
              speed={reducedMotion ? 0 : 1.0}
            />
          )}
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-primary/40 via-primary/10 to-primary/40 pointer-events-none" />

        {/* Foreground content */}
        <div className="pt-20 md:pt-28 lg:pt-32 relative max-w-4xl lg:max-w-6xl mx-auto z-10 flex flex-col items-center justify-center gap-4 mt-4 md:mt-6 px-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-white text-xs md:text-sm">
            <Plane className="w-4 h-4" />
            <span>وجهتك القادمة على بعد خطوة</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-white leading-[150%] md:leading-[160%] drop-shadow-[0_3px_4px_0_rgba(0,0,0,25%)] text-center">
            مواسم… اكتشف وجهات العالم بثقة وسافر بتجربة متكاملة
          </h1>

          <p className="text-sm md:text-xl font-normal md:font-medium text-white leading-[164%] md:leading-[178%] drop-shadow-[0_3px_4px_0_rgba(0,0,0,25%)] text-center">
            احجز رحلاتك وفنادقك وجولاتك السياحية بخطوات بسيطة وتجربة موثوقة تضمن لك
            راحة البال من الانطلاق حتى العودة.
          </p>
        </div>

        <div className="w-full h-[25%] md:h-[30%] lg:h-[45%] absolute bottom-0 z-10">
          {ready && isVisible && (
            <CircularGallery
              items={galleryItems}
              bend={3}
              borderRadius={0.06}
              scrollSpeed={1.5}
            />
          )}
        </div>
      </div>
    </section>
  );
}
