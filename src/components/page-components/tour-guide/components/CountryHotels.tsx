"use client";
import HotelCard from "./HotelCard";
import GSAPSwiper from "./GSAPSwiper";

export default function CountryHotels({
  hotels,
  country,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hotels: any[];
  country: string;
}) {
  return (
    <div className="space-y-4 md:space-y-6  rounded-2xl py-2">
      <div>
        <h2 className="text-3xl md:text-4xl  font-bold text-[#1A1A1A]">
          أشهر الفنادق في {country}
        </h2>
        <p className="text-[#3C3E42] mt-3 text-lg">

          استكشف أجمل المدن مع معالمها الشهيرة وتجاربها الفريدة
        </p>
      </div>
      <GSAPSwiper
        items={hotels}
        renderItem={(hotel) => <HotelCard hotel={hotel} />}
        showNavigation={true}
        autoplay={false}
        gap={24}
        className="px-8"
      />
     
    </div>
  );
}
