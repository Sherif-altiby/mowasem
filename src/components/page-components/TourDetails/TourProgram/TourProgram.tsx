"use client";
import { useState } from "react";
import Image from "next/image";
import { ProgramItem } from "@/types/Data/tourDetails";
import { CircleCheck, CircleX } from "lucide-react";

const formatDuration = (minutes?: number): string => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins  = minutes % 60;
  if (hours > 0 && mins > 0) return `${hours}س ${mins}د`;
  if (hours > 0)              return `${hours} ساعة`;
  return `${mins} دقيقة`;
};

const getTotalDuration = (programs: ProgramItem[]): number =>
  programs.reduce((total, p) => total + (p.duration?.fixedDurationInMinutes || 0), 0);

const checkeredFlagImg = "/assets/flights/flights-flag.svg";

type AdmissionValue = "نعم" | "NO" | string | undefined;

function AdmissionBadge({ value }: { value: AdmissionValue }) {
  if (!value) return null;
  if (value === "نعم")
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
        <CircleCheck className="w-4 h-4" /> التذكرة مشمولة
      </span>
    );
  if (value === "NO")
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
         <CircleX className="w-4 h-4" /> التذكرة غير مشمولة
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/60">
       <CircleX className="w-4 h-4" /> غير قابل للتطبيق
    </span>
  );
}

export default function TourProgram({ programs = [] }: { programs: ProgramItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const totalDuration = getTotalDuration(programs ?? []);

  return (
    <div dir="rtl">

      {/* ── Summary pill ────────────────────────────────────────────────── */}
      <div className="inline-flex items-center gap-2.5 mb-12 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-500">
        <span className="font-semibold text-gray-900 text-sm">{formatDuration(totalDuration)}</span>
        <span className="text-gray-300">·</span>
        <span>{programs?.length ?? 0} محطات</span>
      </div>

      {/* ── Track ───────────────────────────────────────────────────────── */}
      <div className="relative">

        {/* Timeline hairline — right on mobile, center on desktop */}
        <div className="absolute top-0 bottom-0 w-px bg-gray-200 right-6 md:right-1/2 md:translate-x-px" />

        <div className="flex flex-col">
          {programs?.map((program, index) => {
            const isOpen   = openIndex === index;
            const isEven   = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex items-start pb-10"
              >
                {/* Step dot */}
                <div className="absolute right-6 md:right-1/2 translate-x-1/2 z-10">
                  <div className={`w-2.5 h-2.5 rounded-full border-2 transition-colors duration-200 ${
                    isOpen ? "bg-primary border-primary" : "bg-white border-gray-300"
                  }`} />
                </div>

                {/* Card column */}
                <div className={`
                  w-full pr-14
                  md:pr-0 md:w-[calc(50%-44px)]
                  ${isEven
                    ? "md:mr-auto md:pr-12"
                    : "md:ml-auto md:pl-12"
                  }
                `}>
                  <div
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 ${
                      isOpen
                        ? "bg-white border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                        : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    {/* Ghost number — signature decorative element */}
                    <span
                      aria-hidden="true"
                      className={`absolute -top-2 left-2 text-[88px] font-black leading-none select-none pointer-events-none tracking-tighter transition-colors duration-300 ${
                        isOpen ? "text-blue-50" : "text-gray-100"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 p-5 md:p-6 text-right">

                      {/* Badges */}
                      {(program.passByWithoutStopping ||
                        program.admissionIncluded ||
                        program.duration?.fixedDurationInMinutes) && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {program.passByWithoutStopping && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100">
                              مرور دون توقف
                            </span>
                          )}
                          <AdmissionBadge value={program.admissionIncluded} />
                          {program.duration?.fixedDurationInMinutes && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                              ⏱ {formatDuration(program.duration.fixedDurationInMinutes)}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Title */}
                      <p className="text-sm font-bold text-gray-900 mb-2">
                        المحطة {index + 1}
                      </p>

                      {/* Description with collapse */}
                      <div className="relative">
                        <div
                          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                          style={{ maxHeight: isOpen ? "600px" : "3.2rem" }}
                        >
                          <p className="text-sm leading-relaxed text-gray-500">
                            {program.description}
                          </p>
                        </div>
                        {!isOpen && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        )}
                      </div>

                      {/* Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenIndex(isOpen ? null : index);
                        }}
                        aria-expanded={isOpen}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary opacity-80 hover:opacity-100 transition-opacity"
                      >
                        <span>{isOpen ? "إخفاء" : "عرض التفاصيل"}</span>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End marker */}
        <div className="relative flex justify-end md:justify-center pr-[18px] md:pr-0 -mt-4">
          <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <Image src={checkeredFlagImg} alt="" width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}