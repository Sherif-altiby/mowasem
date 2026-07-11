"use client";

import ImageHandleComponent from "@/components/common/ImageHandleComponent/ImageHandleComponent";
import { City } from "@/types/Data/packageDetails";
import Link from "next/link";
import GSAPSwiper from "@/components/page-components/tour-guide/components/GSAPSwiper";

export default function CitiesSwiper({ cities }: { cities: City[] }) {
  const renderCityCard = (city: City) => (
    <Link
      href={`/cities/${city?.slug || ""}`}
      className="relative rounded-3xl h-[350px] flex flex-col border border-primary/5 overflow-hidden group"
    >
      <ImageHandleComponent
        fill
        loading="lazy"
        sizes="100%"
        style={{ objectFit: "cover" }}
        src={city?.imageCover ? city.imageCover : "/assets/CITY.webp"}
        alt={city?.name || "مدينة"}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* تفاصيل المدينة */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <h2 className="text-xl font-bold text-white text-center">
          {city?.name || ""}
        </h2>
      </div>
    </Link>
  );

  return (
    <GSAPSwiper
      items={cities || []}
      renderItem={(city) => renderCityCard(city)}
      showNavigation={true}
      autoplay={true}
      autoplayDelay={3000}
      gap={20}
    />
  );
}
