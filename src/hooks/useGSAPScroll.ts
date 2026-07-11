// hooks/useGSAPScroll.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, Draggable, registerGSAPPlugins } from "@/lib/gsap";

registerGSAPPlugins();

interface UseGSAPSwiperOptions {
  duration?: number;
  ease?: string;
  gap?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
}

export const useGSAPSwiper = (
  containerRef: React.RefObject<HTMLDivElement>,
  options: UseGSAPSwiperOptions = {}
) => {
  const {
    duration = 0.6,
    ease = "power3.inOut",
    gap = 24,
    autoplay = false,
    autoplayDelay = 5000,
    loop = true,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  const dragRef = useRef<Draggable | null>(null);
  const positionRef = useRef(0);
  const itemWidthRef = useRef(0);
  const goToSlideRef = useRef<(index: number) => void>(() => {});
  const nextSlideRef = useRef<() => void>(() => {});
  const resetAutoplayRef = useRef<() => void>(() => {});

  // Cache item width for performance
  const getItemWidth = useCallback(() => {
    if (!containerRef.current) return 0;
    if (itemWidthRef.current > 0) return itemWidthRef.current;
    const firstChild = containerRef.current.querySelector(
      ".swiper-item"
    ) as HTMLElement;
    const width = firstChild ? firstChild.offsetWidth + gap : 0;
    itemWidthRef.current = width;
    return width;
  }, [gap, containerRef]);

  // إعادة تشغيل الـ autoplay باستخدام GSAP ticker للأداء الأفضل
  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      autoplayRef.current.kill();
      autoplayRef.current = null;
    }

    if (autoplay) {
      autoplayRef.current = gsap.to(
        {},
        {
          duration: autoplayDelay / 1000,
          repeat: -1,
          onRepeat: () => {
            nextSlideRef.current();
          },
        }
      );
    }
  }, [autoplay, autoplayDelay]);

  // التنقل إلى slide معين
  const goToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;

    let targetIndex = index;

    // Loop logic
    if (loop) {
      targetIndex = ((index % itemCount) + itemCount) % itemCount;
    } else {
      targetIndex = Math.max(0, Math.min(index, itemCount - 1));
    }

    const itemWidth = getItemWidth();
    const newPosition = -targetIndex * itemWidth;

    gsap.to(containerRef.current, {
      x: newPosition,
      duration,
      ease,
      onComplete: () => {
        positionRef.current = newPosition;
        setCurrentIndex(targetIndex);
      },
    });

    resetAutoplayRef.current();
  }, [containerRef, itemCount, loop, getItemWidth, duration, ease]);

  // التنقل للعنصر التالي
  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // التنقل للعنصر السابق
  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Update refs
  useEffect(() => {
    goToSlideRef.current = goToSlide;
    nextSlideRef.current = nextSlide;
    resetAutoplayRef.current = resetAutoplay;
  }, [goToSlide, nextSlide, resetAutoplay]);

  // تهيئة الـ Swiper
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const items = container.querySelectorAll(".swiper-item");
    setItemCount(items.length);
    itemWidthRef.current = 0; // Reset cache on mount

    // تهيئة الـ Draggable
    dragRef.current = Draggable.create(container, {
      type: "x",
      edgeResistance: 0.65,
      bounds: { minX: 0, maxX: 0 }, // سيتم التحديث
      onDragEnd: () => {
        const x = gsap.getProperty(container, "x") as number;
        const itemWidth = getItemWidth();
        const dragDistance = Math.abs(x - positionRef.current);
        const threshold = itemWidth * 0.2; // 20% من عرض العنصر

        if (dragDistance > threshold) {
          const dir = x > positionRef.current ? -1 : 1;
          goToSlide(currentIndex + dir);
        } else {
          // العودة للموضع السابق
          goToSlide(currentIndex);
        }
      },
    })[0];

    // تشغيل الـ autoplay
    resetAutoplay();

    return () => {
      if (autoplayRef.current) {
        autoplayRef.current.kill();
      }
      if (dragRef.current) {
        dragRef.current.kill();
      }
    };
  }, [autoplay, resetAutoplay, getItemWidth, currentIndex, goToSlide, containerRef]);

  // تحديث عند تغيير العناصر
  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".swiper-item");
    setItemCount(items.length);
    itemWidthRef.current = 0; // Reset cache when items change
  }, [containerRef]);

  return {
    currentIndex,
    itemCount,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};