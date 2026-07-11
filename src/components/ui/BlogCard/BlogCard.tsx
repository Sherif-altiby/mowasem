"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { getDateInArabic } from "@/lib/utils/blogs-utils";
import ImageHandleComponent from "@/components/common/ImageHandleComponent/ImageHandleComponent";

interface ArticleCardProps {
  image: string;
  imageAlt?: string;
  date: string;
  readTime: string | number;
  title: string;
  description?: string;
  featured?: boolean;
  onReadMore?: () => void;
  href?: string;
}

export default function BlogCard({
  image,
  imageAlt = "",
  date,
  readTime,
  title,
  description,
  featured = true,
  onReadMore,
  href = "#",
}: ArticleCardProps) {
  const router = useRouter();
  const articleRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);

  const minutes = readTime ? +readTime : 0;
  const minutesLabel =
    minutes === 1 || minutes === 2
      ? "دقيقة"
      : minutes >= 3 && minutes <= 10
        ? "دقائق"
        : "دقيقة";

  // Entrance animation (replaces motion.article initial/animate)
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // Hover interactions (replaces whileHover + group-hover utilities)
  useEffect(() => {
    const article = articleRef.current;
    const imageWrap = imageWrapRef.current;
    const cta = ctaRef.current;
    if (!article || !imageWrap) return;

    const handleEnter = () => {
      gsap.to(imageWrap, { scale: 1.05, duration: 0.5, ease: "power2.out" });
      if (cta) gsap.to(cta, { y: -2, duration: 0.3, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(imageWrap, { scale: 1, duration: 0.5, ease: "power2.out" });
      if (cta) gsap.to(cta, { y: 0, duration: 0.3, ease: "power2.out" });
    };

    article.addEventListener("mouseenter", handleEnter);
    article.addEventListener("mouseleave", handleLeave);

    return () => {
      article.removeEventListener("mouseenter", handleEnter);
      article.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <article
      ref={articleRef}
      className="cursor-pointer relative w-full h-[330px] md:h-[400px] lg:h-[450px] rounded-[20px] md:rounded-[28px] overflow-hidden bg-primary"
      dir="rtl"
      onClick={() => router.replace(href)}
    >
      {/* Full-bleed background image */}
      <div ref={imageWrapRef} className="absolute inset-0 w-full h-full">
        <ImageHandleComponent
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 420px"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay: near-transparent top, near-black bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-primary/90 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-primary via-primary/80 to-transparent pointer-events-none" />

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1.5 bg-primary/30 backdrop-blur-sm rounded-full pl-2.5 md:pl-3 pr-2 md:pr-2.5 py-1 md:py-1.5 border border-white/20">
          <span className="text-white text-[11px] md:text-[12px] font-medium">مقالة مميزة</span>
          <Star size={13} className="text-[#E8A845] fill-[#E8A845] w-3 h-3 md:w-auto md:h-auto" />
        </div>
      )}

      {/* Foreground content */}
      <div className="absolute inset-x-0 bottom-0 px-4 md:px-5 pb-4 md:pb-5 flex flex-col gap-2 md:gap-3">
        {/* Meta row */}
        <div className="flex items-center gap-2 md:gap-2.5 text-[11px] md:text-[12px] text-white/70">
          <span className="flex items-center gap-1 md:gap-1.5">
            <CalendarDays size={14} className="w-3 h-3 md:w-auto md:h-auto" />
            {getDateInArabic(date)}
          </span>
          <span className="w-px h-2.5 md:h-3 bg-white/30" />
          <span className="flex items-center gap-1 md:gap-1.5">
            <Clock size={14} className="w-3 h-3 md:w-auto md:h-auto" />
            {minutes} {minutesLabel} قراءة
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-white leading-[1.25] line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] text-white/60 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Bottom action row */}
        <div className="flex items-center justify-between mt-1 md:mt-2">
          <Link
            href={href}
            onClick={(e) => {
              e.stopPropagation();
              onReadMore?.();
            }}
            className="text-[12px] md:text-[14px] font-medium text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
          >
            اكتشف المزيد
          </Link>
          <button
            type="button"
            aria-label="السابق"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full bg-white text-primary shadow-[0_4px_16px_rgba(255,255,255,0.3)] hover:bg-white/90 transition-colors"
          >
            <ArrowLeft size={17} className="w-4 h-4 md:w-auto md:h-auto" />
          </button>
        </div>
      </div>
    </article>
  );
}