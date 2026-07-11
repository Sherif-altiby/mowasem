import React from "react";
import { IoMdPricetag } from "react-icons/io";

export default function loading() {
  return (
    <div className="secondary-page-layout container animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-1/3 bg-slate-200 rounded-lg"></div>
        <div className="h-5 w-1/2 bg-slate-100 rounded-lg"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-card flex flex-col gap-4 p-4 shadow-sm border border-slate-100 rounded-xl"
          >
            {/* Image */}
            <div className="h-[200px] bg-slate-200 rounded-lg shrink-0"></div>

            {/* Title + Description */}
            <div className="flex flex-col gap-3 py-2">
              <div className="h-6 w-3/4 bg-slate-200 rounded-md"></div>
              <div className="h-4 w-full bg-slate-100 rounded-md"></div>
            </div>

            <hr className="border-slate-100" />

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <span
                  key={j}
                  className="flex items-center gap-1 border border-slate-100 p-2 rounded-md"
                >
                  <IoMdPricetag className="text-slate-200" />
                  <span className="h-3 w-12 bg-slate-100 rounded inline-block"></span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
