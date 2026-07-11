"use client";

import React, { useEffect, useRef } from "react";
import HotelSlider from "./HotelSlider";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import SectionButton from "../shared/SectionButton";
import { gsap, registerGSAPPlugins } from "@/lib/gsap";

registerGSAPPlugins();

export default function HotelSection({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      // totalScroll = how many px the track overflows the section width
      const getTotalScroll = () => track.scrollWidth - section.offsetWidth;

      // RTL fix: start at +totalScroll offset, animate back to 0
      // so cards move from right → left as user scrolls down
      gsap.fromTo(
        track,
        { x: () => getTotalScroll() },   // start: pushed right (all cards visible from right side)
        {
          x: 0,                           // end: track at natural position (leftmost card visible)
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,                    // pins the WHOLE section (header + cards + button)
            start: "top top",
            end: () => `+=${getTotalScroll()}`,
            scrub: 1.2,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            // Performance optimizations
            fastScrollEnd: true,          // Ends scroll trigger quickly when user scrolls fast
            preventOverlaps: true,        // Prevents overlapping scroll triggers
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [data]);

  if (!data?.data || data.data.length === 0) return null;

  return (
    <section ref={sectionRef} className="main-page-section">
      <div className="">
        <SectionHeader title={title} desc={subtitle} />
        <div className="mt-6 relative ">
          <HotelSlider data={data} trackRef={trackRef} />
        </div>
        <div className="mt-3 md:mt-6 flex justify-center">
          <SectionButton href="/hotels" label="اكتشف جميع الفنادق" />
        </div>
      </div>
    </section>
  );
}