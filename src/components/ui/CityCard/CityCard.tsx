import { Daum } from "@/types/Data/cities";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";

export default function CityCard({ data }: { data: Daum }) {
  return (
    <Link href={`/cities/${data.slug}`}>
      <div className="group relative h-[300px] lg:h-[350px]  w-full rounded-3xl overflow-hidden transform transition-all duration-700  hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ">
        {/* Enhanced Gradient Overlays */}
        <div className="absolute z-1 inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
        <Image
          src={data?.imageCover || "/assets/TOUR.webp"}
          alt={data?.alt || data.name}
         fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={70}
          loading="lazy"
          className="absolute inset-0 object-cover transform group-hover:scale-110 group-hover:brightness-90 transition-transform duration-700 ease-out"
        />

        {/* Content Container */}
        <div className="absolute z-10 inset-0 flex flex-col justify-end p-6 space-y-4">
          <div className="space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <div className="flex items-end justify-between gap-2">
              <div className="flex flex-col items-start gap-2 w-1/2">
                <div className="flex items-center space-x-2 text-white text-sm font-medium">
                  <LuMapPin />
                  <span>{data?.country?.name}</span>
                </div>
                <h3 className="text-white text-xl lg:text-2xl font-bold leading-tight  ">
                  {data?.name}
                </h3>
                <p className="text-white text-sm">{data?.descText}</p>
              </div>

              <div className="flex justify-between items-center pt-2">
                {/* CTA Button */}
                <div className="hidden lg:block opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-300">
                  <div className="bg-primary text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <span>احجز الآن</span>
                    <FiArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="lg:hidden transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-300">
                  <div className="bg-primary text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <span>احجز الآن</span>
                    <FiArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
        </div>
      </div>
    </Link>
  );
}
