"use client";

import { useRef } from "react";
import { FaRegClock } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Link from "next/link";
import gsap from "gsap";
import ImageHandleComponent from "@/components/common/ImageHandleComponent/ImageHandleComponent";

const TourCard = ({
  tour,
  titleTag = "h3",
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tour: any;
  titleTag?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getImageAlt = (t: any) => t?.alt || t?.coverImage?.alt || t.title || "";
  const Title = titleTag === "h3" ? "h3" : "h2";
  const coverImage =
    tour?.coverImage?.url ||
    (typeof tour?.images?.[0] === "string" ? tour?.images?.[0] : tour?.images?.[0]?.url) ||
    "/assets/placeholder.png";

  const location = tour?.location || tour?.city || tour?.destination;

  const handleEnter = () => {
    gsap.to(imgWrapRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.06)",
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      rotate: -45,
      scale: 1.05,
      duration: 0.35,
      ease: "back.out(2)",
    });
  };

  const handleLeave = () => {
    gsap.to(imgWrapRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0px 4px 30px 0px rgba(0,0,0,0.06)",
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      rotate: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
className="group relative border border-dashed border-[#E5E7EB] flex flex-col rounded-2xl lg:rounded-[28px] overflow-hidden h-full w-full bg-white"    >
      {/* Image area */}
      <div className="relative w-full h-[180px] sm:h-[230px] md:h-[350px] overflow-hidden">
        <div ref={imgWrapRef} className="absolute inset-0">
          <ImageHandleComponent
            src={coverImage}
            alt={getImageAlt(tour)}
            fill
            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center"
          />
        </div>

        {/* Top row: duration badge + external link button */}
        <div className="absolute top-3 md:top-4 inset-x-3 md:inset-x-4 flex items-center justify-between z-10">
          {tour?.duration ? (
            <div className="flex items-center gap-1.5 font-medium text-[11px] md:text-sm border border-white/10 backdrop-blur-xl backdrop-brightness-90 bg-transparent/50 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-full w-fit shadow-sm">
              <FaRegClock size={12} className="w-3 h-3 md:w-auto md:h-auto" />
              {tour.duration} {Number(tour.duration) === 1 ? "يوم" : "أيام"}
            </div>
          ) : (
            <span />
          )}

          <Link
            href={`/tours/${tour.slug}`}
            aria-label="عرض التفاصيل"
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white shadow-sm text-[#1A1A1A]"
          >
            <FiArrowUpRight size={18} className="w-4 h-4 md:w-auto md:h-auto" />
          </Link>
        </div>
      </div>

      {/* Bottom white panel */}
      <div className="flex flex-col gap-2 md:gap-3 p-3 md:p-5 flex-1 rounded-t-2xl relative -mt-6 bg-white z-[1]" >
        {location && (
          <div className="flex items-center gap-1 text-[11px] md:text-sm text-[#8A8A8E]">
            <HiOutlineLocationMarker size={14} className="w-3 h-3 md:w-auto md:h-auto" />
            <span>{location}</span>
          </div>
        )}

        <Title className="text-sm md:text-xl font-bold leading-snug line-clamp-2 text-[#15131C]">
          {tour?.title}
        </Title>

        {tour?.descText && (
          <p className="text-[11px] md:text-sm leading-[140%] text-[#6B6B70] line-clamp-1">
            {tour.descText}
          </p>
        )}

        <div className="flex items-center justify-between w-full mt-1 pt-2 md:pt-3 border-t border-[#F0EEF5]">
          <div className="flex flex-col">
            {tour?.price && (
              <span className="text-base md:text-2xl font-bold text-[#15131C]">
                {tour.price.currency} {tour.price.amount}
              </span>
            )}
            <span className="text-[10px] md:text-xs text-[#8A8A8E]">لكل شخص</span>
          </div>

          <Link
            href={`/tours/${tour.slug}`}
            className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm font-semibold text-[#15131C] bg-primary/10 hover:bg-primary/20 ps-3 md:ps-4 pe-1 md:pe-1.5 py-1 md:py-1.5 rounded-full transition-colors"
          >
            عرض التفاصيل
            <span
              ref={arrowRef}
              className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-white text-primary"
            >
              <IoIosArrowBack size={16} className="w-3.5 h-3.5 md:w-auto md:h-auto" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;