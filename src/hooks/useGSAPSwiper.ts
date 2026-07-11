import { useLayoutEffect, useRef, useState, useCallback, useEffect } from "react";
import { gsap, Draggable, registerGSAPPlugins } from "@/lib/gsap";

registerGSAPPlugins();

interface UseGSAPSwiperOptions {
  gap?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export const useGSAPSwiper = (
  trackRef: React.RefObject<HTMLDivElement>,
  viewportRef: React.RefObject<HTMLDivElement>,
  options: UseGSAPSwiperOptions = {}
) => {
  const { gap = 24, autoplay = false, autoplayDelay = 5000 } = options;

  const draggableRef = useRef<Draggable[] | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateNavState = useCallback(() => {
    const drag = draggableRef.current?.[0];
    if (!drag) return;
    const x = gsap.getProperty(trackRef.current, "x") as number;
    setCanPrev(x > 2);
    setCanNext(x < drag.maxX - 2);
  }, [trackRef]);

  const getCardStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) return 0;
    return firstCard.getBoundingClientRect().width + gap;
  }, [gap, trackRef]);

  // Reset autoplay function (no longer depends on scrollByCards directly)
  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }

    if (!autoplay) return;

    autoplayRef.current = setInterval(() => {
      scrollByCardsRef.current(1);
    }, autoplayDelay);
  }, [autoplay, autoplayDelay]);

  // Use a ref to always have the latest scrollByCards without causing dependency cycles
  const scrollByCardsRef = useRef<(dir: 1 | -1) => void>(() => {});

  const scrollByCards = useCallback(
    (dir: 1 | -1) => {
      const drag = draggableRef.current?.[0];
      const track = trackRef.current;
      if (!drag || !track) return;

      const step = getCardStep();
      const currentX = gsap.getProperty(track, "x") as number;
      let targetX = currentX + dir * step;

      targetX = gsap.utils.clamp(drag.minX, drag.maxX, targetX);

      gsap.to(track, {
        x: targetX,
        duration: 0.55,
        ease: "power3.out",
        onUpdate: () => drag.update(),
        onComplete: updateNavState,
      });

      resetAutoplay(); // safe to call
    },
    [getCardStep, trackRef, updateNavState, resetAutoplay]
  );

  // Keep the ref updated
  useEffect(() => {
    scrollByCardsRef.current = scrollByCards;
  }, [scrollByCards]);

  // Setup autoplay on mount / when options change
  useEffect(() => {
    resetAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [resetAutoplay]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const setupDraggable = () => {
          draggableRef.current?.forEach((d) => d.kill());

          const trackWidth = track.scrollWidth;
          const viewportWidth = viewport.clientWidth;
          const maxX = Math.max(0, trackWidth - viewportWidth);

          draggableRef.current = Draggable.create(track, {
            type: "x",
            bounds: { minX: 0, maxX },
            edgeResistance: 0.85,
            dragResistance: 0,
            onDrag: updateNavState,
            onDragEnd() {
              const currentX = gsap.getProperty(track, "x") as number;
              const step = getCardStep();
              
              const snappedX = Math.round(currentX / step) * step;
              const clampedX = gsap.utils.clamp(0, maxX, snappedX);

              gsap.to(track, {
                x: clampedX,
                duration: 0.3,
                ease: "power2.out",
                onUpdate: () => draggableRef.current?.[0]?.update(),
                onComplete: updateNavState,
              });
            },
          });

          gsap.set(track, { x: 0 });
          updateNavState();
        };

        setupDraggable();

        // Debounced resize handler for better performance
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(setupDraggable, 150);
        };
        window.addEventListener("resize", handleResize);

        return () => {
          clearTimeout(resizeTimeout);
          window.removeEventListener("resize", handleResize);
          draggableRef.current?.forEach((d) => d.kill());
        };
      });

      return () => mm.revert();
    }, viewport);

    return () => ctx.revert();
  }, [gap, trackRef, viewportRef, updateNavState, getCardStep]);

  return {
    canPrev,
    canNext,
    scrollByCards,
  };
};