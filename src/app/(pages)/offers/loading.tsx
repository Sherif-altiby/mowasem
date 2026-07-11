import React from "react";

export default function loading() {
  return (
    <div className="secondary-page-layout  container ">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="group relative bg-card border border-gray-100 rounded-3xl overflow-hidden h-full w-full shadow-lg animate-pulse"
          >
            {/* Image Section */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-200" />

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="mb-4 space-y-3">
                {/* Title */}
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>

              {/* Price and Action Section */}
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-6 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>

                {/* WhatsApp Button Placeholder */}
                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              </div>

              {/* CTA Placeholder */}
              <div className="h-6 w-full bg-gray-200 rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
