import React from "react";

export default function Loading() {
  return (


      <div className="secondary-page-layout animate-pulse container">
        {/* Page Header Skeleton */}
        <div className="mb-10">
          <div className="h-8 w-1/3 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[200px] w-full bg-gray-200 rounded-2xl"
            ></div>
          ))}
        </div>
      </div>
  );
}
