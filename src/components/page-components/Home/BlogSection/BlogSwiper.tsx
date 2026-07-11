"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback  } from "react";
import BlogCard from "@/components/ui/BlogCard/BlogCard";
import { Daum } from "@/types/Data/blogs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { gsap, Draggable, registerGSAPPlugins } from "@/lib/gsap";

registerGSAPPlugins();

export default function BlogSwiper({ blogs = [] }: { blogs: Daum[] }) {
  const displayBlogs = blogs.slice(0, 10);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const GAP = typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 24; // px gap between cards, mirrors gap-4 md:gap-6

  // In RTL the track is laid out right-to-left, so the "natural" resting
  // position is x = 0 with the first card pinned to the right edge, and
  // dragging/advancing moves the track in POSITIVE x toward the left.
  // That means bounds are { minX: 0, maxX } instead of the LTR { minX, maxX: 0 }.
  const updateNavState = useCallback(() => {
    const drag = draggableRef.current?.[0];
    if (!drag) return;
    const x = gsap.getProperty(trackRef.current, "x") as number;
    setCanPrev(x > 2); // can go back toward the start (x = 0)
    setCanNext(x < drag.maxX - 2); // can advance further (x = maxX)
  }, []);

  const getCardStep = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) return 0;
    return firstCard.getBoundingClientRect().width + GAP;
  };

  // dir: 1 = "next" (advance, reveal cards to the left in RTL)
  //     -1 = "prev" (go back, reveal cards to the right in RTL)
  const scrollByCards = (dir: 1 | -1) => {
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
  };

  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport || displayBlogs.length === 0) return;

    const ctx = gsap.context(() => {
      const setupDraggable = () => {
        draggableRef.current?.forEach((d) => d.kill());

        const trackWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        const maxX = Math.max(0, trackWidth - viewportWidth);

        // RTL bounds: resting/start position is 0, dragging advances toward maxX.
        draggableRef.current = Draggable.create(track, {
          type: "x",
          bounds: { minX: 0, maxX },
          edgeResistance: 0.85,
          dragResistance: 0,
          onDrag: updateNavState,
        });

        // Make sure we start pinned at 0 (first card visible on the right).
        gsap.set(track, { x: 0 });
        updateNavState();
      };

      setupDraggable();

      const handleResize = () => setupDraggable();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        draggableRef.current?.forEach((d) => d.kill());
      };
    }, viewport);

    return () => ctx.revert();
  }, [displayBlogs.length, updateNavState]);

  // Card entrance stagger (replaces the per-card part of AnimatedDiv).
  useEffect(() => {
    const cards = trackRef.current?.children;
    if (!cards || cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.1,
      }
    );
  }, [displayBlogs.length]);

  // Section reveal-on-scroll (replaces AnimatedDiv's whileInView wrapper).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;

    gsap.set(section, { opacity: 0, y: 40, scale: 0.95 });

    let played = false;
    const playIn = () => {
      if (played) return;
      played = true;
      gsap.to(section, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            playIn();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3, rootMargin: "-60px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (displayBlogs.length === 0) return null;


  return (
    <div className="relative w-full group">
      <div ref={sectionRef} className="w-full">
        <div
          dir="rtl"
          ref={viewportRef}
          className="overflow-hidden px-2 cursor-grab active:cursor-grabbing"
        >
          <div
            ref={trackRef}
            dir="rtl"
            className="flex gap-4 md:gap-6 pt-8 pb-7 will-change-transform"
            style={{ touchAction: "pan-y" }}
          >
            {blogs.map((c) => (

              <div
                key={c._id}

                dir="rtl"
                className="flex-shrink-0 w-[60vw] sm:w-[340px] md:w-[320px] lg:w-[385px]"
              >
                <BlogCard
                  image={c?.imageCover || "/assets/placeholder.png"}
                  imageAlt={c.alt}
                  date={c.createdAt}
                  readTime={c.timeToRead || 0}
                  title={c.title}
                  onReadMore={() => { }}
                  href={`/blogs/${c.slug}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prev button (RTL: right side) */}
      <button
        type="button"
        aria-label="الشريحة السابقة"
        onClick={() => scrollByCards(-1)}
        disabled={!canPrev}
        className="
          hidden md:flex items-center justify-center
          absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10
          bg-primary rounded-full p-3 lg:p-4
          border border-transparent text-white
          transition-all duration-200 cursor-pointer
          disabled:bg-white disabled:border-[#676768]
          disabled:text-[#676768] disabled:cursor-not-allowed
          hover:scale-105 active:scale-95
        "
      >
        <IoIosArrowForward size={25} />
      </button>

      {/* Next button (RTL: left side) */}
      <button
        type="button"
        aria-label="الشريحة التالية"
        onClick={() => scrollByCards(1)}
        disabled={!canNext}
        className="
          hidden md:flex items-center justify-center
          absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10
          bg-primary rounded-full p-3 lg:p-4
          border border-transparent text-white
          transition-all duration-200 cursor-pointer
          disabled:bg-white disabled:border-[#676768]
          disabled:text-[#676768] disabled:cursor-not-allowed
          hover:scale-105 active:scale-95
        "
      >
        <IoIosArrowBack size={25} />
      </button>
    </div>
  );
}