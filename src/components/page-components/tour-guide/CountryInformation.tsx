"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import InformationCard from "./components/InformationCard";
import Image from "next/image";

interface I_CountryInformation {
  bestTimeToVisit: string;
  visaReq: string;
  duration: string;
  country: string;
}

const CountryInformation = ({
  bestTimeToVisit,
  visaReq,
  duration,
}: I_CountryInformation) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <div className="space-y-8 mt-4">
      <div ref={containerRef} className="rounded-2xl p-8" style={{ opacity: 0 }}>
        <div className="flex items-center gap-8 mb-6 flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch justify-items-center">
            <InformationCard
              icon={
                <Image src="/assets/tour-guide-calender.svg" alt="" width={40} height={40} />
              }
              title="افضل اوقات الزيارة"
              desc={bestTimeToVisit}
            />
            <InformationCard
              icon={
                <Image src="/assets/tour-guide-document.svg" alt="" width={40} height={40} />
              }
              title="الوثائق المطلوبة للتاشيرة"
              desc={visaReq}
            />
            <InformationCard
              icon={
                <Image src="/assets/tour-guide-time.svg" alt="" width={40} height={40} />
              }
              title="مدة الرحلة"
              desc={duration}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInformation;