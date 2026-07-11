"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionButton from "../shared/SectionButton";
import ServiceModalLazy from "./ServiceModalLazy";
import ServiceCard, { Service } from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

// ── Services ───────────────────────────────────────────────────────────────────

const Services = ({
  services,
  servicesPage = false,
  layout = "swiper",
}: {
  services: Service[];
  servicesPage?: boolean;
  layout?: "wrap" | "swiper";
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // drag-to-scroll
  const scrollRef  = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const dragged    = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    dragged.current    = false;
    startX.current     = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const walk = (e.pageX - scrollRef.current.offsetLeft - startX.current) * 1.5;
    if (Math.abs(walk) > 8) dragged.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // GSAP stagger on scroll into view
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !services?.length) return;

    const cards = sectionRef.current.querySelectorAll<HTMLElement>(
      "[data-service-card]"
    );

    gsap.fromTo(
      cards,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      }
    );

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, [services]);

  // empty state
  if (!services?.length) {
    return (
      <section
        className="container mx-auto py-12 flex flex-col items-center gap-4 text-primary"
        dir="rtl"
      >
        <svg
          className="w-14 h-14 opacity-30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
          />
        </svg>
        <p className="text-sm md:text-xl font-semibold">
          لا توجد خدمات متاحة حاليًا
        </p>
      </section>
    );
  }

  const isSwiper = layout === "swiper";

  return (
    <section ref={sectionRef} className="container mx-auto" dir="rtl">
      <div
        ref={scrollRef}
        className={[
          "w-full pb-2",
          isSwiper
            ? "flex flex-nowrap overflow-x-auto [scrollbar-width:none] cursor-grab"
            : "flex flex-wrap justify-evenly",
        ].join(" ")}
        onMouseDown={isSwiper ? onMouseDown : undefined}
        onMouseLeave={isSwiper ? onMouseUp   : undefined}
        onMouseUp={isSwiper   ? onMouseUp    : undefined}
        onMouseMove={isSwiper ? onMouseMove  : undefined}
      >
        {services.map((service, index) => (
          <div key={service.id} data-service-card style={{ opacity: 0 }}>
            <ServiceCard
              service={service}
              index={index}
              isLast={index === services.length - 1}
              onSelect={setSelectedService}
              dragged={dragged}
            />
          </div>
        ))}
      </div>

      <ServiceModalLazy
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {!servicesPage && (
        <SectionButton label="عرض جميع الخدمات" href="/services" />
      )}
    </section>
  );
};

export default Services;