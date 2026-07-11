"use client";
import { Building2 } from "lucide-react";
import ActivityCard from "./ActivityCard";
import GSAPSwiper from "./GSAPSwiper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CountryRestaurants({ restaurants }: { restaurants: any[] }) {
  if (!restaurants?.length) {
    return (
      <div className="text-center py-16">
        <Building2 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">لا توجد  مطاعم متاحة</p>
      </div>
    );
  }
  return (
    <div className="space-y-4 md:space-y-6  rounded-2xl py-2">
      <div>
        <h2 className="text-3xl md:text-4xl  font-bold text-[#1A1A1A]">
          أشهر المطاعم
        </h2>
        <p className="text-[#3C3E42] mt-3 text-lg">
          جولات القوارب، ركوب الدراجات، زيارة حدائق الزهور والأسواق التقليدية.
        </p>
      </div>
      <GSAPSwiper
        items={restaurants}
        renderItem={(restaurant) => <ActivityCard service={restaurant} />}
        showNavigation={true}
        autoplay={false}
        gap={24}
        className="px-8"
      />

    </div>
  );
}
