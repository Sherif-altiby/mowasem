import { Data } from "@/types/Data/tourGuideDetails";
import React from "react";
import { FaMoneyBillWave } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
import { HiMapPin } from "react-icons/hi2";
export default function TourGuideContentSection({ data }: { data: Data }) {
  return (
    <div className=" xl:col-span-2 bg-gradient-to-br from-secondary to-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col gap-4 sm:gap-6 overflow-hidden ">
      {/* محتوى الكارت */}
      <div className="relative z-10">
        {/* العنوان الرئيسي والوصف */}
        <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-6 mb-8">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-4">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                {data.name}
              </p>
              <div className="px-3 py-1 bg-primary text-secondary text-sm font-bold rounded-lg">
                {data.code}
              </div>
            </div>
            <div
              className="text-lg sm:text-xl text-primary/70 leading-relaxed "
              dangerouslySetInnerHTML={{ __html: data.description || "" }}
            />
            <p className="text-base text-primary/60 leading-relaxed max-w-3xl">
              {data.descText || ""}
            </p>
          </div>
        </div>

        {/* معلومات الدولة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* القارة */}
          <div className="bg-card/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-4 group-hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <HiMapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-primary/60 font-medium">القارة</p>
                <p className="text-primary font-bold text-lg">
                  {data.continent}
                </p>
              </div>
            </div>
          </div>

          {/* العملة */}
          <div className="bg-card/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-4 group-hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <FaMoneyBillWave className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-primary/60 font-medium">العملة</p>
                <p className="text-primary font-bold text-lg">
                  {data.currency}
                </p>
              </div>
            </div>
          </div>

          {/* اللغة */}
          <div className="bg-card/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-4 group-hover:scale-105 transition-all duration-300 hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <GrLanguage className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-primary/60 font-medium">اللغة</p>
                <p className="text-primary font-bold text-lg">
                  {data.language}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* حالة النشاط */}
        <div className="flex items-center justify-between">
          <div
            className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${data.isActive
              ? "bg-primary text-secondary"
              : "bg-primary/10 text-primary"
              }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${data.isActive ? "bg-secondary" : "bg-primary/50"
                }`}
            />
            {data.isActive ? "متاح للحجز" : "غير متاح حالياً"}
          </div>

          <div className="text-sm text-primary/60 font-medium">
            {data.seo?.metaTitle}
          </div>
        </div>
      </div>
    </div>
  );
}
