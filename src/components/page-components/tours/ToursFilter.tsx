"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ToursFilterProps {
  cities: string[];
}

const ToursFilter = ({ cities }: ToursFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/tours?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push("/tours");
    setMobileOpen(false);
  };

  const hasActiveFilters = ["price", "city"].some((key) =>
    searchParams.get(key)
  );

  const selectClass =
    "appearance-none cursor-pointer w-full px-5 py-3 bg-card border border-gray-200 rounded-full text-[#1C2C4A] text-sm md:text-base hover:bg-gray-50 transition-colors font-medium outline-none pr-10";

  return (
    <div dir="rtl" className="w-full">
      {/* Mobile trigger */}
      <div className="flex items-center gap-3 xl:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#1C2C4A] text-white rounded-full text-sm font-medium"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>تصفية النتائج</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1.5 px-4 py-3 border border-gray-200 rounded-full text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>مسح</span>
          </button>
        )}
      </div>

      {/* Mobile fixed bottom sheet */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="xl:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="xl:hidden fixed bottom-0 left-0 right-0 z-[60] bg-card rounded-t-3xl shadow-2xl p-6 space-y-5">
            {/* Handle */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto -mt-1" />

            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1C2C4A]">
                تصفية النتائج
              </h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <div className="relative">
                <select
                  className={selectClass}
                  value={searchParams.get("city") || ""}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                >
                  <option value="">كل المدن</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  className={selectClass}
                  value={searchParams.get("price") || ""}
                  onChange={(e) => handleFilterChange("price", e.target.value)}
                >
                  <option value="">كل الأسعار</option>
                  <option value="0-50">أقل من 50 ريال</option>
                  <option value="50-100">50 ريال إلى 100 ريال</option>
                  <option value="100-500">100 ريال إلى 500 ريال</option>
                  <option value="500-99999">أكثر من 500 ريال</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-3 border border-gray-200 text-gray-500 rounded-full font-medium text-sm"
                >
                  إعادة ضبط
                </button>
              )}
              <button
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-3 bg-primary text-white rounded-full font-medium text-sm"
              >
                عرض النتائج
              </button>
            </div>
          </div>
        </>
      )}

      {/* Desktop filters — unchanged */}
      <div className="hidden xl:flex items-center gap-4 w-full bg-gray-50/50 p-2 rounded-3xl border border-gray-100">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1">
            <select
              className={`${selectClass} py-3.5 text-base border-[#D9D9D9] border`}
              value={searchParams.get("city") || ""}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            >
              <option value="">كل المدن</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={2}
            />
          </div>

          <div className="relative flex-1">
            <select
              className={`${selectClass} py-3.5 text-base border-[#D9D9D9] border`}
              value={searchParams.get("price") || ""}
              onChange={(e) => handleFilterChange("price", e.target.value)}
            >
              <option value="">كل الأسعار</option>
              <option value="0-50">أقل من 50 ريال</option>
              <option value="50-100">50 ريال إلى 100 ريال</option>
              <option value="100-500">100 ريال إلى 500 ريال</option>
              <option value="500-99999">أكثر من 500 ريال</option>
            </select>
            <ChevronDown
              className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={2}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1.5 px-6 py-3.5 text-red-500 hover:bg-red-50 rounded-full transition-colors font-medium"
          >
            <X className="w-4 h-4" />
            <span>إعادة ضبط</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ToursFilter;
