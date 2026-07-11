import React from "react";

export default function loading() {
  return (
    <div className="secondary-page-layout animate-pulse container ">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative h-[300px] lg:h-[350px] w-full rounded-3xl overflow-hidden animate-pulse"
          >
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-gray-200" />

            {/* Gradient Overlay Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />

            {/* Content Placeholder */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-4">
              <div className="space-y-2">
                {/* Top Row: Name + Code */}
                <div className="flex justify-between items-end pt-2">
                  <div className="flex flex-col items-start gap-2 w-1/2">
                    {/* Name + Code */}
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-24 bg-gray-300 rounded" />
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-gray-300 rounded-full" />
                        <div className="h-4 w-12 bg-gray-300 rounded" />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="h-4 w-40 bg-gray-300 rounded" />
                  </div>

                  {/* CTA Button */}
                  <div className="hidden lg:block">
                    <div className="h-10 w-28 bg-gray-300 rounded-full" />
                  </div>
                  <div className="lg:hidden">
                    <div className="h-10 w-28 bg-gray-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
