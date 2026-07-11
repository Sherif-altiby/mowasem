"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SectionButtonProps {
  label: string;
  href: string;
}

export default function SectionButton({ label, href }: SectionButtonProps) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const btnRef   = useRef<HTMLAnchorElement>(null);
  const iconRef  = useRef<HTMLSpanElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const lineRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const btn   = btnRef.current;
    const icon  = iconRef.current;
    const shine = shineRef.current;
    const line  = lineRef.current;
    if (!wrap || !btn) return;

    const ctx = gsap.context(() => {
      let rect: DOMRect;

      // QuickTo for performant mousemove animations
      const rotateX = gsap.quickTo(btn, "rotateX", {
        duration: 0.3,
        ease: "power1.out",
        transformPerspective: 600,
        transformOrigin: "center center",
      });

      const rotateY = gsap.quickTo(btn, "rotateY", {
        duration: 0.3,
        ease: "power1.out",
        transformPerspective: 600,
        transformOrigin: "center center",
      });

      // Single timeline for hover animations
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(btn, {
          rotateX: -6,
          rotateY: 8,
          scale: 1.04,
          boxShadow: "0 12px 30px rgba(99,102,241,0.18), 0 0 20px rgba(99,102,241,0.12)",
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 600,
          transformOrigin: "center center",
        })
        .to(icon, { x: -6, duration: 0.3, ease: "back.out(2)" }, 0)
        .to(line, { width: "calc(100% - 56px)", duration: 0.3, ease: "power2.out" }, 0);

      const handleEnter = (e: PointerEvent) => {
        rect = btn.getBoundingClientRect();
        hoverTl.play();
        gsap.fromTo(shine, { x: "-100%" }, { x: "200%", duration: 0.55, ease: "power1.inOut" });

        // ripple from cursor position
        const container = btn.querySelector('.ripple-container') as HTMLElement;
        const old = container?.querySelector('.ripple-circle');
        if (old) old.remove();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const maxR = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) * 2;
        const initialR = 20; // start with small circle

        const circle = document.createElement('span');
        circle.className = 'ripple-circle';
        circle.style.cssText = `position:absolute;border-radius:50%;background:rgba(0,0,0,0.08);
          width:${maxR}px;height:${maxR}px;left:${x - maxR/2}px;top:${y - maxR/2}px;
          transform:scale(${initialR/maxR});transition:transform .55s cubic-bezier(.2,.8,.3,1),opacity .55s;`;
        container.appendChild(circle);
        requestAnimationFrame(() => { circle.style.transform = 'scale(1)'; });
      };

      const handleMove = (e: PointerEvent) => {
        if (!rect) rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        rotateX(-dy * 7);
        rotateY(dx * 9);
      };

      const handleLeave = () => {
        hoverTl.reverse();
        rotateX(0);
        rotateY(0);

        // shrink ripple circle back to 0
        const container = btn.querySelector('.ripple-container') as HTMLElement;
        const circle = container?.querySelector('.ripple-circle') as HTMLElement;
        if (circle) {
          circle.style.transform = 'scale(0)';
          circle.style.opacity = '0';
          setTimeout(() => circle.remove(), 550);
        }
      };

      const handleDown = () =>
        gsap.to(btn, { scale: 0.96, duration: 0.12, ease: "power2.in", overwrite: "auto" });

      const handleUp = () =>
        gsap.to(btn, { scale: 1.04, duration: 0.2, ease: "back.out(2)", overwrite: "auto" });

      wrap.addEventListener("pointerenter", handleEnter);
      wrap.addEventListener("pointermove", handleMove);
      wrap.addEventListener("pointerleave", handleLeave);
      btn.addEventListener("pointerdown", handleDown);
      btn.addEventListener("pointerup", handleUp);

      return () => {
        wrap.removeEventListener("pointerenter", handleEnter);
        wrap.removeEventListener("pointermove", handleMove);
        wrap.removeEventListener("pointerleave", handleLeave);
        btn.removeEventListener("pointerdown", handleDown);
        btn.removeEventListener("pointerup", handleUp);
        hoverTl.kill();
      };
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto flex justify-center pt-2 md:pt-6">
      {/* perspective wrapper — must NOT be the animated element itself */}
      <div ref={wrapRef} style={{ perspective: "600px", display: "inline-block" }}>
        <Link
          ref={btnRef}
          href={href}
          className="
            relative inline-flex items-center gap-[8px] md:gap-[10px]
            px-4 py-[12px] md:px-5 md:py-[14px] rounded-[12px] md:rounded-[14px]
            bg-white border border-[#E5E7EB]
            text-[14px] md:text-[16px] font-bold text-primary
            overflow-hidden
            will-change-transform transform-gpu
          "
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          {/* Shine sweep */}
          <span
            ref={shineRef}
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
              transform: "translateX(-100%)",
            }}
          />

          <span className="relative z-[1]">{label}</span>

          <span ref={iconRef} className="relative z-[1] flex items-center bg-primary rounded-full p-1 text-white">
            <ChevronLeft  strokeWidth={2.5} className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
          </span>

          {/* Animated underline */}
          <span
            ref={lineRef}
            aria-hidden="true"
            className="absolute bottom-[8px] md:bottom-[10px] right-6 md:right-7 h-[2px] rounded-sm bg-primary pointer-events-none"
            style={{ width: 0 }}
          />

          {/* Ripple container */}
          <div
            className="ripple-container"
            style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', overflow: 'hidden', pointerEvents: 'none' }}
          />
        </Link>
      </div>
    </div>
  );
}