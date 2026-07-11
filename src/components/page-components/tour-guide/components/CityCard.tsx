"use client";
import Image from "next/image";
import { MapPin, ChevronLeft } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CityCard = ({ city }: { city: any }) => {
  const coverImage =
    city?.images?.[0] ||
    city?.imageCover?.url ||
    "/assets/placeholder.png";

  const [imageSrc, setImageSrc] = useState<string>(coverImage);

  const cityName = city?.name || "مدينة سياحية";

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100 hover:border-primary/30">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageSrc}
          alt={cityName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-110"
          onError={() => setImageSrc("/assets/placeholder.png")}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-[21px] leading-tight text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {cityName}
        </h3>

        {/* Location */}
        {city?.location && (
          <div className="flex items-center gap-2 mt-3 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{city.location}</span>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {city?.description?.slice(0, 60) || "اكتشف جمال المدينة"}
            {city?.description && city.description.length > 60 && "..."}
          </div>

          <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Hover Shine Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:-translate-x-0 transition-transform duration-1000" />
    </div>
  );
};

export default CityCard;