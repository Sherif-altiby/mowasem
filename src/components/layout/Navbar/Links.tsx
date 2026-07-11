"use client";
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  Home,
  Info,
  Building2,
  PlaneTakeoff,
  Map,
  Package,
  Route,
  Wrench,
} from "lucide-react";

const NavLinks = [
  { title: "الرئيسية",       url: "/",              icon: Home },
  { title: "نبذة عنا",       url: "/about",         icon: Info },
  { title: "الفنادق",        url: "/hotels",        icon: Building2 },
  { title: "الطيران",        url: "/flights",       icon: PlaneTakeoff },
  { title: "الدليل السياحي", url: "/tour-guide",    icon: Map },
  { title: "الباقات",        url: "/package-types", icon: Package },
  { title: "الجولات",        url: "/tours",         icon: Route },
  { title: "الخدمات",        url: "/services",      icon: Wrench },
];

interface LinksProps {
  type?: "mainPage" | "other";
}

// ─────────────────────────────────────────────
// Horizontal navbar — redesigned dark style
// ─────────────────────────────────────────────
function HorizontalLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-0.5" aria-label="التنقل الرئيسي">
      {NavLinks.map((item) => {
        const isActive =
          pathname === item.url || pathname.startsWith(item.url + "/");
        const Icon = item.icon;

        return (
          <Link
            key={item.url}
            href={item.url}
            className={`
              group relative flex items-center gap-1.5
              px-3 py-2 rounded-xl
              text-[13px] font-medium
              transition-all duration-200 select-none
              ${isActive
                ? "text-white bg-white/10"
                : "text-white/50 hover:text-white/85 hover:bg-white/[0.06]"
              }
            `}
          >
            <Icon
              size={13}
              aria-hidden="true"
              className={`flex-shrink-0 transition-colors duration-200 ${
                isActive
                  ? "text-[#a18384]"
                  : "text-white/50 group-hover:text-white/60"
              }`}
            />
            <span>{item.title}</span>

            {/* active indicator — thin bottom line instead of a dot */}
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-3 right-3 h-px rounded-full bg-[#a18384]"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────
// Dropdown menu for home page (unchanged logic)
// ─────────────────────────────────────────────
function DropdownLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const pathname = usePathname();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const barsRef = useRef<HTMLSpanElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const addItemRef = useCallback((el: HTMLAnchorElement | null) => {
    if (el && !itemsRef.current.includes(el)) itemsRef.current.push(el);
  }, []);
  const addBarRef = useCallback((el: HTMLSpanElement | null) => {
    if (el && !barsRef.current.includes(el)) barsRef.current.push(el);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useEffect(() => {
    const [top, mid, bottom] = barsRef.current;
    if (!top || !mid || !bottom) return;
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "power4.inOut" } });
    if (isOpen) {
      tl.to(top, { y: 6.5, rotate: 45 }, 0)
        .to(mid, { opacity: 0, scaleX: 0 }, 0)
        .to(bottom, { y: -6.5, rotate: -45 }, 0);
    } else {
      tl.to(top, { y: 0, rotate: 0 }, 0)
        .to(mid, { opacity: 1, scaleX: 1 }, 0)
        .to(bottom, { y: 0, rotate: 0 }, 0);
    }
    return () => { tl.kill(); };
  }, [isOpen]);

  useLayoutEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Clean up existing timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    if (isOpen) {
      setShouldRender(true);
      setIsSettled(false);

      // Small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;

        if (reduceMotion) {
          gsap.set([inner, ...itemsRef.current], { opacity: 1, y: 0 });
          setIsSettled(true);
          return;
        }

        gsap.set(outer, { opacity: 1 });
        gsap.set(inner, { opacity: 0, y: -12 });
        gsap.set(itemsRef.current, { opacity: 0, y: -8 });

        const tl = gsap.timeline({
          onComplete: () => {
            setIsSettled(true);
            tlRef.current = null;
          }
        });
        tlRef.current = tl;

        tl.to(inner, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" })
          .to(
            itemsRef.current,
            { opacity: 1, y: 0, duration: 0.38, stagger: 0.04, ease: "power3.out" },
            "-=0.25"
          );
      }, 10);

      return () => {
        clearTimeout(timeoutId);
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }
      };
    } else if (outerRef.current) {
      setIsSettled(false);

      if (reduceMotion) {
        setShouldRender(false);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false);
          tlRef.current = null;
        }
      });
      tlRef.current = tl;

      tl.to(itemsRef.current.slice().reverse(), {
        opacity: 0, y: -8, duration: 0.2, stagger: 0.025, ease: "power2.in",
      }).to(innerRef.current!, {
        opacity: 0, y: -12, duration: 0.32, ease: "power3.in",
      }, "-=0.1");

      return () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }
      };
    } else {
      setShouldRender(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpen, close]);

  const handleIconEnter = useCallback((el: SVGSVGElement) => {
    gsap.killTweensOf(el);
    gsap.to(el, { scale: 1.15, rotate: -6, duration: 0.25, ease: "back.out(2)" });
  }, []);
  const handleIconLeave = useCallback((el: SVGSVGElement) => {
    gsap.killTweensOf(el);
    gsap.to(el, { scale: 1, rotate: 0, duration: 0.25, ease: "power2.out" });
  }, []);

  return (
    <div ref={wrapperRef} className="relative z-[200]">
      <button
        onClick={toggle}
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={isOpen}
        className="relative w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px]
                   bg-white/10 border border-white/25 hover:bg-white/18 transition-colors"
      >
        <span ref={addBarRef} className="block w-5 h-[1.5px] bg-white rounded-full origin-center" />
        <span ref={addBarRef} className="block w-5 h-[1.5px] bg-white rounded-full origin-center" />
        <span ref={addBarRef} className="block w-5 h-[1.5px] bg-white rounded-full origin-center" />
      </button>

      {shouldRender && (
        <nav
          ref={outerRef}
          style={{ contain: "layout paint", willChange: "opacity" }}
          className="absolute left-0 top-[calc(100%+12px)] min-w-[220px]
                     bg-black/90 border border-white/10 rounded-2xl
                     shadow-2xl shadow-black/50 overflow-hidden"
        >
          <div
            ref={innerRef}
            style={{ willChange: "transform, opacity" }}
            className={isSettled ? "backdrop-blur-xl" : ""}
          >
            <div className="py-2">
              {NavLinks.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.url}
                    ref={addItemRef}
                    href={item.url}
                    onClick={close}
                    style={{ willChange: "transform, opacity" }}
                    className={`group flex items-center gap-3 px-4 py-2.5 relative
                      text-[15px] leading-none tracking-tight transition-colors
                      ${isActive
                        ? "text-white font-medium bg-white/5"
                        : "text-white/65 font-normal hover:text-white hover:bg-white/[0.04]"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 transition-all duration-200
                        ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                      aria-hidden="true"
                    />
                    <Icon
                      size={18}
                      aria-hidden="true"
                      onMouseEnter={(e) => handleIconEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleIconLeave(e.currentTarget)}
                      className={`flex-shrink-0 transition-colors ${
                        isActive ? "text-primary" : "text-white/35 group-hover:text-white/80"
                      }`}
                    />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default function Links({ type = "other" }: LinksProps) {
  if (type === "mainPage") return <DropdownLinks />;
  return <HorizontalLinks />;
}