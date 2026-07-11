"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useMemo, memo } from "react";
import { ChevronLeft, MapPin, Star } from "lucide-react";
import { Daum } from "@/types/Data/hotels";
import gsap from "gsap";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const optimizeBookingUrl = (url: string, maxSize: number): string => {
  if (!url?.includes("bstatic.com")) return url;
  return url.replace(/\/max\d+\//, `/max${maxSize}/`);
};

const normalizePrice = (data: Daum): { amount: number; currency: string } => {
  const amount =
    typeof data?.price === "number"
      ? data.price
      : typeof data?.price === "object" &&
        data.price !== null &&
        "amount" in data.price
      ? (data.price as { amount: number }).amount
      : 0;

  const currency =
    data?.currency ??
    (typeof data?.price === "object" &&
    data.price !== null &&
    "currency" in data.price
      ? (data.price as { currency: string }).currency
      : null) ??
    "SAR";

  return { amount, currency };
};

// ─── Component ────────────────────────────────────────────────────────────────

function HotelCard({
  data,
  className,
}: {
  data: Daum;
  className?: string;
}) {
  const { amount, currency } = useMemo(() => normalizePrice(data), [data]);

  const imageSrc = useMemo(
    () => optimizeBookingUrl(data?.image || "/assets/HOTEL.webp", 320),
    [data?.image]
  );
  const href = useMemo(
    () => data?.hotelId ? `/hotels/${data.hotelId}` : (data?.url ?? "#"),
    [data?.hotelId, data?.url]
  );
  const isExternal = useMemo(() => href.startsWith("http"), [href]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number | null>(null);
  const angleRef  = useRef(0);
  const ctxRef    = useRef<ReturnType<typeof gsap.context> | null>(null);

  const el1 = useRef<HTMLHeadingElement>(null);
  const el2 = useRef<HTMLParagraphElement>(null);
  const el3 = useRef<HTMLParagraphElement>(null);
  const el4 = useRef<HTMLDivElement>(null);
  const el5 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card    = cardRef.current;
    const wrapper = wrapperRef.current;
    if (!card || !wrapper) return;

    const els = [el1, el2, el3, el4, el5].map((r) => r.current);

    // Use gsap.context so everything is scoped and cleans up safely
    // — this avoids polluting the shared ScrollTrigger instance
    ctxRef.current = gsap.context(() => {

      // ── Entrance stagger ──────────────────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(card, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
        .to(els[0], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")
        .to(els[1], { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.25")
        .to(els[2], { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.2")
        .to(els[3], { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.2")
        .to(els[4], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.18");

    }, wrapper); // scope to wrapper — no global side effects

    const startSpin = () => {
      const spin = () => {
        angleRef.current = (angleRef.current + 1.6) % 360;
        rafRef.current = requestAnimationFrame(spin);
      };
      rafRef.current = requestAnimationFrame(spin);
    };

    const stopSpin = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // ── 3-D tilt (plain gsap.to, no ScrollTrigger) ───────────────────────
    const handleEnter = () => startSpin();

    let lastMoveTime = 0;
    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < 16) return; // Throttle to ~60fps
      lastMoveTime = now;

      const b  = card.getBoundingClientRect();
      const dx = (e.clientX - (b.left + b.width  / 2)) / (b.width  / 2);
      const dy = (e.clientY - (b.top  + b.height / 2)) / (b.height / 2);
      gsap.to(card, {
        rotateY: dx * 5,
        rotateX: -dy * 3.5,
        scale: 1.012,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 900,
        transformOrigin: "center center",
        overwrite: "auto",
      });
    };

    const handleLeave = () => {
      stopSpin();
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.65,
        ease: "elastic.out(1, 0.6)",
        transformPerspective: 900,
        overwrite: "auto",
      });
    };

    wrapper.addEventListener("mouseenter", handleEnter);
    wrapper.addEventListener("mousemove",  handleMove);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      wrapper.removeEventListener("mouseenter", handleEnter);
      wrapper.removeEventListener("mousemove",  handleMove);
      wrapper.removeEventListener("mouseleave", handleLeave);
      stopSpin();
      ctxRef.current?.revert(); // cleans up entrance timeline safely
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative rounded-[22px] p-[1.5px] cursor-pointer ${className ?? ""}`}
    >


      {/* Card */}
      <div
        ref={cardRef}
        data-hotel-card=""
        className="relative z-[1] flex flex-col md:flex-row bg-white rounded-[20px] overflow-hidden min-h-[280px] md:min-h-[310px] border border-[#E8E7EC]"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}
      >
        {/* ── Image ── */}
        <div className="relative w-full md:w-[42%] flex-shrink-0 overflow-hidden h-[180px] md:h-auto">
          <Image
            src={imageSrc}
            alt={data?.alt || data?.name || "hotel"}
            fill
            sizes="(max-width: 768px) 60vw, 320px"
            quality={85}
            loading="lazy"
            className="object-cover transition-transform duration-700"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to left, transparent 55%, #fff 100%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none md:hidden"
            style={{ background: "linear-gradient(to top, transparent 40%, #fff 100%)" }}
          />
          {(data?.stars ?? 0) > 0 && (
            <div
              className="absolute top-[13px] right-[13px] flex items-center gap-[5px] text-[11px] font-semibold text-[#1a1a2e] px-[10px] py-[4px] rounded-full border border-black/[0.08]"
              style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(10px)" }}
            >
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{data.stars}</span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="flex flex-col justify-between flex-1 p-[16px] md:p-[22px] gap-[8px] md:gap-[10px] no-underline"
        >
          <div className="flex flex-col gap-[5px] md:gap-[7px]">
            <h2
              ref={el1}
              className="text-[15px] md:text-[18px] font-bold text-[#111827] tracking-[-0.025em] leading-[1.25] line-clamp-1 opacity-0 translate-y-[10px]"
            >
              {data?.name}
            </h2>

            {data?.address && (
              <p
                ref={el2}
                className="flex items-center gap-[4px] text-[11px] md:text-[12px] text-[#9CA3AF] opacity-0 translate-y-[10px]"
              >
                <MapPin size={10} className="shrink-0 text-amber-400" />
                {data.address}
              </p>
            )}

            {data?.description && (
              <p
                ref={el3}
                className="text-[11px] md:text-[12.5px] leading-relaxed text-[#6B7280] line-clamp-2 opacity-0 translate-y-[10px]"
              >
                {data.description}
              </p>
            )}

            {data?.rating != null && (
              <div ref={el4} className="flex items-center gap-2 opacity-0 translate-y-[10px]">
                <div className="flex items-center gap-[4px] md:gap-[5px] bg-primary/10 border border-primary text-primary text-[10px] md:text-[11px] font-bold px-[8px] md:px-[10px] py-[3px] md:py-[4px] rounded-[6px] md:rounded-[8px]">
                  <Star size={10} className="fill-amber-400 text-amber-400 w-3 h-3 md:w-auto md:h-auto" />
                  <span>{data.rating}</span>
                </div>
                {data?.ratingWord && (
                  <span className="text-[11px] md:text-[12px] font-semibold text-[#374151]">
                    {data.ratingWord}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="w-full h-px bg-[#F3F4F6] my-[2px]" />

          <div ref={el5} className="flex items-end justify-between opacity-0 translate-y-[10px]">
            <div>
              <p className="text-[9px] md:text-[10px] font-medium tracking-[0.08em] uppercase text-[#9CA3AF] mb-[2px] md:mb-[3px]">
                لليلة الواحدة
              </p>
              <strong className="text-[18px] md:text-[22px] font-bold text-[#111827] tracking-[-0.03em] leading-none">
                <span className="text-[11px] md:text-[13px] font-normal text-[#9CA3AF] mr-[2px]">
                  {currency}
                </span>
                {amount.toLocaleString("ar-SA", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>

            <div className="flex items-center gap-[5px] md:gap-[6px] bg-primary hover:bg-primary/90 text-white text-[11px] md:text-[12px] font-semibold px-3 md:px-4 py-[8px] md:py-[9px] rounded-[8px] md:rounded-[10px] transition-colors duration-200">
              عرض التفاصيل
              <ChevronLeft size={13} className="w-3 h-3 md:w-auto md:h-auto" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default memo(HotelCard, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data && prevProps.className === nextProps.className;
});