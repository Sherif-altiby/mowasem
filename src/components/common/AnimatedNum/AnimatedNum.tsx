"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.endsWith("%") ? "%" : "";
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);

  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ val: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver بدلاً من useInView — أخف وزنًا
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        counterRef.current.val = 0;

        tweenRef.current = gsap.to(counterRef.current, {
          val: numeric,
          duration: 1.8,
          ease: "expo.out", // مكافئ لـ [0.16, 1, 0.3, 1]
          // will-change يُعيَّن على العنصر مسبقاً عبر CSS
          onUpdate() {
            if (el) {
              // Math.round أسرع من Math.floor للأعداد الموجبة
              el.textContent = `${prefix}${Math.round(counterRef.current.val)}${suffix}`;
            }
          },
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      tweenRef.current?.kill(); // تنظيف الـ tween عند الـ unmount
    };
  }, [numeric, prefix, suffix]);

  return (
    <span
      ref={ref}
      className={className}
      // will-change مباشرة على العنصر لتفادي repaints غير ضرورية
      style={{ willChange: "contents" }}
    >
      {prefix}0{suffix}
    </span>
  );
}