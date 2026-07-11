"use client";
import { MapPinHouse } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ActivityCard from "./ActivityCard";

export default function CountryPlacesToVisit({
  places,
  country,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  places: any[];
  country: string;
}) {
  return (
    <div className="space-y-6  rounded-2xl ">
      <h2 className="text-2xl md:text-4xl font-bold text-[#1A1A1A] border-b border-[#D6D6D6] pb-6 w-full">
        أشهر الأماكن السياحية في {country}
      </h2>

      {places && places.length > 0 ? (
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={24}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-4"
          >
            {places.map((place, index) => (
              <SwiperSlide
                key={index}
                className="h-auto py-6 pb-13 cursor-pointer"
              >
                <ActivityCard service={place} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="text-center py-12">
          <MapPinHouse className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">لا توجد أماكن سياحية متاحة</p>
        </div>
      )}
    </div>
  );
}
