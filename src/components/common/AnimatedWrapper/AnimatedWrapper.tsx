"use client";
import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGSAPPlugins } from "@/lib/gsap";
import { ComponentProps } from "react";

registerGSAPPlugins();

type T_AnimatedDivProps = ComponentProps<"div"> & {
  initial?: {
    opacity?: number;
    y?: number | string;
    x?: number | string;
    scale?: number;
    rotation?: number;
  };
  animate?: {
    opacity?: number;
    y?: number | string;
    x?: number | string;
    scale?: number;
    rotation?: number;
  };
  whileInView?: {
    opacity?: number;
    y?: number | string;
    x?: number | string;
    scale?: number;
    rotation?: number;
  };
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number;
  };
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    y?: {
      type: string;
      stiffness?: number;
      damping?: number;
    };
    scale?: {
      type: string;
      stiffness?: number;
      damping?: number;
    };
  };
};

export default function AnimatedDiv({
  initial,
  animate,
  whileInView,
  viewport,
  transition = { duration: 0.6, ease: "power2.out" },
  className = "",
  children,
  ...props
}: T_AnimatedDivProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Memoize ease conversion for performance
  const easeValue = useMemo(() => {
    const ease = transition.ease;

    // Handle bezier array [x1, y1, x2, y2]
    if (Array.isArray(ease) && ease.length === 4) {
      // Approximate common bezier curves with GSAP eases
      const [x1, y1, x2, y2] = ease;
      if (x1 === 0.25 && y1 === 0.46 && x2 === 0.45 && y2 === 0.94) {
        return "power2.out";
      }
      if (x1 === 0.42 && y1 === 0 && x2 === 0.58 && y2 === 1) {
        return "power1.inOut";
      }
      if (x1 === 0 && y1 === 0 && x2 === 1 && y2 === 1) {
        return "linear";
      }
      return "power2.out";
    }

    // Handle spring configs
    if (transition.y?.type === "spring" || transition.scale?.type === "spring") {
      return "elastic.out(1, 0.8)";
    }

    return (ease as string) ?? "power2.out";
  }, [transition.ease, transition.y?.type, transition.scale?.type]);

  useGSAP(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial state
    if (initial) {
      gsap.set(element, {
        opacity: initial.opacity ?? 1,
        y: initial.y ?? 0,
        x: initial.x ?? 0,
        scale: initial.scale ?? 1,
        rotation: initial.rotation ?? 0,
      });
    }

    // Animate to target state
    if (animate) {
      gsap.to(element, {
        opacity: animate.opacity ?? 1,
        y: animate.y ?? 0,
        x: animate.x ?? 0,
        scale: animate.scale ?? 1,
        rotation: animate.rotation ?? 0,
        duration: transition.duration,
        delay: transition.delay,
        ease: easeValue,
      });
    }

    // Scroll-triggered animation with reduced motion support
    if (whileInView) {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTriggerConfig: ScrollTrigger.Vars = {
          trigger: element,
          start: viewport?.margin ? `top${viewport.margin}` : "top 85%",
          toggleActions: viewport?.once ? "play none none none" : "play none none reverse",
        };

        if (viewport?.amount !== undefined) {
          scrollTriggerConfig.start = `top bottom-=${100 - viewport.amount}%`;
        }

        gsap.to(element, {
          opacity: whileInView.opacity ?? 1,
          y: whileInView.y ?? 0,
          x: whileInView.x ?? 0,
          scale: whileInView.scale ?? 1,
          rotation: whileInView.rotation ?? 0,
          duration: transition.duration,
          ease: easeValue,
          scrollTrigger: scrollTriggerConfig,
        });
      });

      return () => mm.revert();
    }
  }, { scope: ref, dependencies: [initial, animate, whileInView, viewport, transition.duration, transition.delay, easeValue] });

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
