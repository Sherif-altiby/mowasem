import { Data } from "@/types/Data/tourDetails";
import { Clock, BadgeCheck } from "lucide-react";
import Image from "next/image";

const TourDetails = ({ tour }: { tour: Data }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-14 w-full">
      {/* Right Column: Description & Info */}
      <div className="flex-[2] flex flex-col items-start justify-between text-right w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg md:text-2xl lg:text-[32px] font-bold text-[#1A1A1A]">
            وصف الجولة
          </h2>
          <div className="text-[#575859] leading-[1.8] text-xs md:text-sm lg:text-base whitespace-pre-wrap w-full text-justify">
            {tour.description ||
              "استمتع بتجربة سياحية لا تُنسى في قلب مدينة روما، حيث تأخذك هذه الجولة المميزة لزيارة الكولوسيوم، أحد أبرز وأشهر المعالم التاريخية في العالم. ستستكشف خلال الجولة التاريخ العريق للإمبراطورية الرومانية، وتتعرف على الأسرار الهندسية والمعمارية الفريدة لهذا المدرج الضخم، الذي شهد أحداثًا تاريخية مشوقة منذ آلاف السنين.\n\nكما ستستمتع بتجربة ثقافية غنية من خلال التعرف على فنون العمارة الرومانية، التماثيل والآثار المنتشرة في كل زاوية، والاستمتاع بالأجواء الحيوية للمطاعم والمقاهي التقليدية التي تجعل جولتك أكثر متعة وواقعية."}
          </div>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-6 md:mt-8 w-full justify-start">
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-200 rounded-xl">
            <span className="font-semibold text-xs md:text-sm lg:text-base text-[#1A1A1A]">
              {tour.duration || 6} ساعات
            </span>
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#1A1A1A]" />
          </div>


          {/* <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl">
            <span className="font-semibold text-sm md:text-base text-[#1A1A1A]">
              إلغاء مجاني
            </span>
            <XCircle className="w-5 h-5 text-[#1A1A1A]" />
          </div> */}
        </div>
      </div>

      {/* Left Column: Pricing Card */}
      <div className="flex-[1] w-full md:min-w-[300px] lg:min-w-[340px] pt-6 md:pt-0">
        <div className="bg-card border text-right border-gray-200 rounded-2xl p-4 md:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] sticky top-20 md:top-24">
          <div className="flex flex-col items-start w-full gap-1">
            <div className="flex items-end gap-2 justify-start w-full">
              <span className="text-[#575859] text-xs md:text-sm lg:text-base mb-1">ابتداءً من</span>
              <div className="flex items-end gap-2 pr-2">
                <span className="font-bold text-xl md:text-3xl lg:text-[34px] leading-none text-[#1A1A1A]">
                  {tour.price?.amount || "2750"}
                </span>
                {/* <span className="font-bold text-xl md:text-[24px] mb-1 text-[#1A1A1A]">
                  ﷼
                </span> */}
                <Image
                  src="/assets/riyal-black.png"
                  alt="Riyal Saudi"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                {/* <del className="text-[#848484] text-base mb-1 mr-2 px-1">
                  {tour.price?.oldPrice || "3000"} ﷼
                </del> */}
              </div>
            </div>
            <p className="text-[#575859] text-[10px] md:text-xs lg:text-sm mt-2 md:mt-3 w-full text-start">
              (شامل ضريبة القيمة المضافة)
            </p>
          </div>

          <div className="h-px bg-gray-200 w-full my-4 md:my-6" />

          {/* Quick confirmation badge */}
          <div className="bg-[#E6F5EC] text-[#0A7B3E] font-bold text-[10px] md:text-xs lg:text-sm rounded-lg py-2 md:py-3 px-2 flex items-center justify-start gap-2 mb-4 md:mb-6">
            <BadgeCheck className="w-4 h-4 md:w-5 md:w-6 md:h-6 fill-[#0A7B3E] text-white" />
            <span className="text-[10px] md:text-xs lg:text-sm">تأكيد سريع للحجز</span>
          </div>

          {/* Action button */}
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs md:text-sm lg:text-lg py-3 md:py-4 rounded-xl transition-colors duration-200 flex items-center justify-center">
            تحقق من التوفر
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
