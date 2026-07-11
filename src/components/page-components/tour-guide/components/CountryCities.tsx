// components/CountryCities.tsx
"use client";
import { Building2 } from "lucide-react";
import GSAPSwiper from "./GSAPSwiper";
import CityCard from "./CityCard";

export default function CountryCities({ cities }: { cities: { id: number; name: string; description: string; image: string; }[] }) {
  if (!cities?.length) {
    return (
      <div className="text-center py-16">
        <Building2 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">لا توجد مدن متاحة حالياً</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl  font-bold text-[#1A1A1A]">
          أفضل المدن والوجهات
        </h2>
        <p className="text-[#3C3E42] mt-3 text-lg">
          استكشف أجمل المدن مع معالمها الشهيرة وتجاربها الفريدة
        </p>
      </div>

      <GSAPSwiper
        items={cities}
        renderItem={(city) => <CityCard city={city} />}
        showNavigation={true}
        autoplay={false}
        gap={24}
        className="px-8"
      />
    </section>
  );
}