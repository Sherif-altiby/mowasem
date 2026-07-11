"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

interface PackageData {
  data?: unknown;
}

interface Package {
  imageCover?: string;
  slug: string;
  name: string;
  country?: {
    name: string;
  };
  cities?: Array<{ name: string }>;
  description?: string;
  descText?: string;
}

export default function PackageSlider({ data }: { data: PackageData }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const packages = (data?.data as { packages?: Package[] })?.packages || [];
  const packageTypeSlug = (data?.data as { packageType?: { slug: string } })?.packageType?.slug || "all";
  const displayPackages = packages.slice(0, 10);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <>
      {/* Mobile: Overflow-x scroll */}
      {!isDesktop && (
        <div className="overflow-x-auto snap-x snap-mandatory py-2 px-2 -mx-2 scroll-smooth scrollbar-hide h-[320px]">
          <div className="flex gap-4 px-2">
            {displayPackages.length > 0 ? (
              displayPackages.map((pkg: Package, index: number) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[260px] snap-start"
                >
                  <Link
                    href={`/package-types/${packageTypeSlug}/${pkg.slug}`}
                    className="group relative flex flex-col rounded-[24px] overflow-hidden shadow-lg h-[320px] w-full cursor-pointer"
                  >
                    {/* Image */}
                    <Image
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      src={
                        pkg.imageCover && pkg.imageCover !== "data"
                          ? pkg.imageCover
                          : "/assets/TOUR.webp"
                      }
                      alt={pkg.name}
                      className="absolute inset-0 object-cover object-center z-0 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none opacity-90 transition-opacity duration-300" />

                    {/* Top Left Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="px-4 py-1.5 rounded-[30px] bg-[#1A1A1A]/40 backdrop-blur-md text-white border border-white/20 text-xs font-medium shadow-sm">
                        {pkg.country?.name || "الأفضل مبيعًا"}
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="relative z-20 flex flex-col justify-end p-5 h-full text-right mt-auto w-full">
                      <h3 className="text-white text-xl font-bold leading-snug mb-1 drop-shadow-lg">
                        {pkg.name}sss
                      </h3>
                      {pkg.cities && pkg.cities.length > 0 ? (
                        <p className="text-white/90 text-xs font-medium leading-relaxed drop-shadow-md">
                          {pkg.cities
                            .map((city: { name: string }) => city.name)
                            .join("، ")}
                        </p>
                      ) : pkg.description || pkg.descText ? (
                        <p className="text-white/90 text-xs font-medium leading-relaxed line-clamp-1 drop-shadow-md">
                          {pkg.description || pkg.descText}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center w-full">No packages available</p>
            )}
          </div>
        </div>
      )}

      {/* Desktop: Swiper */}
      {isDesktop && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="h-[450px] w-full p-2"
        >
          {displayPackages.length > 0 ? (
            displayPackages.map((pkg: Package, index: number) => (
              <SwiperSlide
                key={index}
                className="!w-[340px] rounded-3xl"
              >
                <Link
                  href={`/package-types/${packageTypeSlug}/${pkg.slug}`}
                  className="group relative flex flex-col rounded-[32px] overflow-hidden shadow-lg h-[400px] w-full cursor-pointer"
                >
                  {/* Image */}
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    src={
                      pkg.imageCover && pkg.imageCover !== "data"
                        ? pkg.imageCover
                        : "/assets/TOUR.webp"
                    }
                    alt={pkg.name}
                    className="absolute inset-0 object-cover object-center z-0 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none opacity-90 transition-opacity duration-300" />

                  {/* Top Left Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-5 py-2 rounded-[30px] bg-[#1A1A1A]/40 backdrop-blur-md text-white border border-white/20 text-sm font-medium shadow-sm">
                      {pkg.country?.name || "الأفضل مبيعًا"}
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-20 flex flex-col justify-end p-6 h-full text-right mt-auto w-full">
                    <h3 className="text-white text-2xl font-bold leading-snug mb-1 drop-shadow-lg">
                      {pkg.name}sss
                    </h3>
                    {pkg.cities && pkg.cities.length > 0 ? (
                      <p className="text-white/90 text-sm font-medium leading-relaxed drop-shadow-md">
                        {pkg.cities
                          .map((city: { name: string }) => city.name)
                          .join("، ")}
                      </p>
                    ) : pkg.description || pkg.descText ? (
                      <p className="text-white/90 text-sm font-medium leading-relaxed line-clamp-1 drop-shadow-md">
                        {pkg.description || pkg.descText}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center w-full">No packages available</p>
          )}
        </Swiper>
      )}
    </>
  );
}
