"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Star } from "lucide-react";

interface HotelImage {
  isCover?: boolean;
  url?: string;
  alt?: {
    ar?: string;
  };
}

interface Hotel {
  images?: HotelImage[];
  type?: string;
  rating?: number;
  reviewsCount?: number;
}

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const coverImage = hotel.images?.find((img: HotelImage) => img.isCover)?.url || hotel.images?.[0]?.url || "";
  const [imageSrc, setImageSrc] = useState<string>(coverImage);
  const displayName = hotel.images?.[0]?.alt?.ar || hotel.type || "";

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-card shadow-md cursor-pointer group"
      dir="rtl"
    >
      {/* Image */}
      <div className="relative w-full min-h-[190px] md:min-h-[235px] overflow-hidden">
        <Image
          src={imageSrc}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageSrc("/assets/placeholder.png")}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex items-center justify-between gap-3 h-[91px]">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#1A1A1A] text-md md:text-[20px] leading-snug text-right truncate">
            {displayName}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {(hotel.rating ?? 0) > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-[#303135]">{hotel.rating ?? 0}</span>
              </div>
            )}
            {(hotel.reviewsCount ?? 0) > 0 && (
              <span className="text-sm text-gray-500">({hotel.reviewsCount ?? 0})</span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ChevronLeft className="shrink-0 w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default HotelCard;
