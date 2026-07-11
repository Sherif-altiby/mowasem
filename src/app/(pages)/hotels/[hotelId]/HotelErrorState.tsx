"use client";

import Link from "next/link";
export default function HotelErrorState({ type }: { type: "notFound" | "error" }) {
  return (
    <div
      dir="rtl"
      className="min-h-[60vh] pt-20 flex items-center justify-center px-4"
    >
      <div className="relative max-w-md w-full text-center">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-72 h-72 rounded-full bg-primary/6 blur-3xl" />
        </div>

        {/* Icon */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-primary/8 rotate-12" />
          <div className="absolute inset-0 rounded-2xl bg-primary/5 -rotate-6" />
          <div className="relative w-16 h-16 flex items-center justify-center">
            {type === "notFound" ? (
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <rect x="8" y="16" width="48" height="36" rx="4" stroke="#00276C" strokeWidth="2.5" fill="none"/>
                <path d="M8 24h48" stroke="#00276C" strokeWidth="2" strokeDasharray="4 3"/>
                <circle cx="32" cy="38" r="7" stroke="#FEBF4C" strokeWidth="2.5" fill="none"/>
                <path d="M37 43l4 4" stroke="#FEBF4C" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M29 35l6 6M35 35l-6 6" stroke="#00276C" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <rect x="8" y="16" width="48" height="36" rx="4" stroke="#00276C" strokeWidth="2.5" fill="none"/>
                <path d="M8 24h48" stroke="#00276C" strokeWidth="2" strokeDasharray="4 3"/>
                <path d="M32 32v8" stroke="#FEBF4C" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="32" cy="44" r="2" fill="#FEBF4C"/>
              </svg>
            )}
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 tracking-tight">
          {type === "notFound" ? "الفندق غير موجود" : "حدث خطأ ما"}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          {type === "notFound"
            ? "لم نتمكن من العثور على الفندق المطلوب. ربما تم حذفه أو تغيير رابطه."
            : "تعذّر تحميل بيانات الفندق في الوقت الحالي. يرجى المحاولة مرة أخرى."}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          {type === "error" && (
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/20 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              إعادة المحاولة
            </button>
          )}
          <Link
            href="/hotels"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            تصفح الفنادق
          </Link>
        </div>
      </div>
    </div>
  );
}
