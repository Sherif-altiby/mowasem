 
"use client";
import { Building2 } from "lucide-react";
import GSAPSwiper from "./GSAPSwiper";
import ActivityCard from "./ActivityCard";

export default function CountryActivities({ activities }: { activities: { id: number; name: string; description: string; image: string; price: number; duration: string; location: string; category: string; }[] }) {
  if (!activities?.length) {
    return (
      <div className="text-center py-16">
        <Building2 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">لا توجد أنشطة متاحة</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl  font-bold text-[#1A1A1A]">
          أنشطة وتجارب لا تفوتك
        </h2>
        <p className="text-[#3C3E42] mt-3 text-lg">
          جولات القوارب، ركوب الدراجات، الأسواق التقليدية والمزيد
        </p>
      </div>
 
      <GSAPSwiper
        items={activities}
        renderItem={(activity) => <ActivityCard service={activity} />}
        showNavigation={true}
        autoplay={false}
        gap={24}
        className="px-8"
      />
    </section>
  );
}