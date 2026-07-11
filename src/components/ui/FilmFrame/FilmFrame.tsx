"use client";

import { memo } from "react";
import Link from "next/link";
import { MapPinIcon } from "lucide-react";
import { Daum } from "@/types/Data/toursGuide";
import ImageHandleComponent from "@/components/common/ImageHandleComponent/ImageHandleComponent";
import { optimizeCloudinaryUrl } from "../../page-components/Home/TourGuideSection/utils";

const FilmFrame = memo(function FilmFrame({ data }: { data: Daum }) {
  const src = optimizeCloudinaryUrl(
    data?.country?.imageCover?.url || "/assets/placeholder.png",
    400,   // زيادة الجودة
    520
  );

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-xl border border-white/10 group/card">
      <Link
        href={`/tour-guide/${data?.country?._id}`}
        className="group relative block w-full overflow-hidden aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/5] xl:aspect-[5/7]"
        aria-label={`عرض تفاصيل ${data?.country?.name}`}
      >
        {/* Dashed Film Border */}
        <div className="absolute inset-[6px] z-20 border border-dashed border-white/30 rounded-xl pointer-events-none" />

        {/* Image */}
        <ImageHandleComponent
          src={src}
          alt={data?.country?.name || "وجهة سياحية"}
          fill
          quality={65}
          loading="lazy"
          sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 380px"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]"
          placeholder="blur"
        />

        {/* Film Grain Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_1px)] bg-[length:3px_3px] opacity-10 mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 md:p-6 lg:p-8 gap-2 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <h2 className="text-white text-base md:text-lg lg:text-xl xl:text-2xl font-bold leading-tight tracking-tight line-clamp-2 drop-shadow-md">
            {data?.introduction?.ar}
          </h2>

          <div className="flex items-center gap-2 text-white/90 text-sm md:text-base font-medium">
            <MapPinIcon size={18} className="text-amber-400" />
            <span>{data?.country?.name}</span>
          </div>
        </div>

        {/* Enhanced Shimmer + Light Leak Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 via-transparent to-transparent opacity-50" />
        </div>

        {/* Bottom Film Perforations Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />
      </Link>
    </div>
  );
});

export default FilmFrame;