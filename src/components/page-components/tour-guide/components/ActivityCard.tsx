"use client";
import Image from "next/image";
import { Star, MapPin, Clock, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface Service {
  images?: Array<{ isCover?: boolean; url?: string; alt?: { ar?: string } }>;
  type?: string;
  rating?: number;
  reviewsCount?: number;
  location?: string | { ar?: string; en?: string };
  duration?: string | { ar?: string; en?: string };
}

const ActivityCard = ({ service }: { service: Service }) => {
  const coverImage =
    service.images?.find((img) => img.isCover)?.url ||
    service.images?.[0]?.url ||
    "/assets/placeholder.png";

  const [imageSrc, setImageSrc] = useState(coverImage);
  const title = service.images?.[0]?.alt?.ar || service.type || "تجربة سياحية";

  const getLocationText = () => {
    if (!service.location) return "";
    if (typeof service.location === "string") return service.location;
    return service.location.ar || service.location.en || "";
  };

  const getDurationText = () => {
    if (!service.duration) return "";
    if (typeof service.duration === "string") return service.duration;
    return service.duration.ar || service.duration.en || "";
  };

  return (
    <div className="group  relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100 hover:border-primary/30">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          onError={() => setImageSrc("/assets/placeholder.png")}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {service.rating && (
            <div className="bg-white/95 backdrop-blur-md text-black text-sm font-semibold px-3 py-1 rounded-2xl flex items-center gap-1 shadow">
              <Star className="w-4 h-4 fill-primary text-primary" />
              {service.rating}
            </div>
          )}
        </div>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          {getDurationText() && (
            <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-xl">
              <Clock className="w-3.5 h-3.5" />
              {getDurationText()}
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-[21px] leading-tight text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {getLocationText() && (
          <div className="flex items-center gap-2 mt-3 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{getLocationText()}</span>
          </div>
        )}

        {/* Rating + Reviews */}
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {service.rating && (
              <div className="flex items-center gap-1">
                <div className="flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(service.rating!) ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-700">
                  {service.rating}
                </span>
              </div>
            )}

            {service.reviewsCount && (
              <span className="text-xs text-gray-500">
                ({service.reviewsCount} تقييم)
              </span>
            )}
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

export default ActivityCard;