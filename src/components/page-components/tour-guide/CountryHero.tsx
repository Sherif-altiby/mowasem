// components/page-components/tour-guide/CountryHero.tsx
import Image from "next/image";
import { HeroTextAnimation } from "./HeroTextAnimation";
import { ArrowLeft } from "lucide-react";

interface I_CountryHero {
  imageCover: string;
  countryName: string;
  description?: string | { ar?: string; en?: string };
}

export default function CountryHero({
  imageCover,
  countryName,
  description,
}: I_CountryHero) {
  const getDescriptionText = () => {
    if (!description) return "";
    if (typeof description === "string") return description;
    return description.ar || description.en || "";
  };

  return (
    <div className="relative h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageCover || "/assets/CITY.webp"}
        alt={countryName}
        fill
        className="object-cover brightness-[0.65] scale-105 transition-transform duration-700 hover:scale-110"
        priority
      />

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-primary/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <HeroTextAnimation>
              <div className="space-y-6 md:space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm px-5 py-2.5 rounded-full">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  دليل سياحي رسمي
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tighter">
                  السياحة في <span className="text-[#E8DFC8]">{countryName}</span>
                </h1>

                {/* Subtitle */}
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed" dangerouslySetInnerHTML={{ __html: getDescriptionText().split(".")[0] || "" }} />
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="#places"
                    className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-amber-300 transition-all active:scale-95 flex items-center gap-3 group"
                  >
                    استكشف الوجهات
                    <span className="group-hover:translate-x-1 transition">
                      <ArrowLeft />
                    </span>
                  </a>

                  <a
                    href="#overview"
                    className="border border-white/60 text-white px-8 py-4 rounded-2xl font-medium hover:bg-white/10 backdrop-blur-md transition-all"
                  >
                    تعرف على المزيد
                  </a>
                </div>
              </div>
            </HeroTextAnimation>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/70">
  <span className="text-sm tracking-widest">اسحب للأسفل</span>
  <div className="w-5 h-8 border-2 border-white/50 rounded-full flex items-center justify-center">
    <div className="w-1 h-2 bg-white rounded-full animate-scroll-down" />
  </div>
</div>
    </div>
  );
}