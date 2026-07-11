import React from "react";

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
            className="relative h-[300px] lg:h-[350px] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200"
          >
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-slate-200/50" />

            {/* Gradient Overlay Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-300/40 via-transparent to-transparent" />

            {/* Content Placeholder */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-4">
              <div className="space-y-3">
                {/* Country Row */}
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-card/50 rounded-full" />
                  <div className="h-4 w-24 bg-card/40 rounded-md" />
                </div>

                {/* Title */}
                <div className="h-7 w-3/4 bg-card/60 rounded-md"></div>

                {/* Description */}
                <div className="h-4 w-full bg-card/40 rounded-md"></div>
              </div>

              {/* Button Skeleton */}
              <div className="flex justify-end pt-2">
                <div className="h-10 w-28 bg-card/40 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
