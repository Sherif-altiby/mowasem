import React from "react";

export default function loading() {
  return (
    <div className="secondary-page-layout container ">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative w-full h-[350px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg animate-pulse bg-gray-200"
          >
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-gray-300" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-end items-center text-center gap-2 h-full p-6">
              <div className="h-8 w-32 bg-gray-400/60 rounded-full" />
              <div className="h-6 w-40 bg-gray-400/40 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
