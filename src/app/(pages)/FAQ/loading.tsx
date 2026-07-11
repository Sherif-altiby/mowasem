import React from "react";

export default function Loading() {
  return (
    <div className="secondary-page-layout animate-pulse container">
      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Question */}
            <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
            {/* Answer */}
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
