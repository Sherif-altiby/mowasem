import React from 'react';

// Shimmer Animation Component
const ShimmerBox = ({ className = "", width = "w-full", height = "h-5" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${width} ${height} ${className}`} />
);

const DetailsPageShimmer = () => {
  return (
    <div className="flex flex-col items-start gap-3 md:gap-6">
      {/* Breadcrumb Shimmer */}
      <div className="w-full">
        <div className="flex items-center gap-2">
          <ShimmerBox width="w-16" height="h-4" />
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <ShimmerBox width="w-12" height="h-4" />
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <ShimmerBox width="w-32" height="h-4" />
        </div>
      </div>

      {/* Main Container */}
      <div className="details-page-layout container bg-transparent md:bg-card rounded-3xl px-0! md:p-6! md:border border-[#1a1a1a]/7 md:drop-shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] mb-10! w-full">
        <div className="flex flex-col items-start gap-3 md:gap-4 px-2 md:px-0">
          {/* Title */}
          <ShimmerBox width="w-3/4" height="h-8 md:h-10" className="rounded" />
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <ShimmerBox width="w-24" height="h-5" />
          </div>

          {/* Location and Share */}
          <div className="flex w-full justify-between items-start sm:items-center gap-2 sm:gap-4">
            <ShimmerBox width="w-1/2" height="h-5" />
            <ShimmerBox width="w-8" height="h-8" className="rounded-full" />
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mt-6">
          <ShimmerBox width="w-full" height="h-64 md:h-96" className="rounded-2xl" />
        </div>

        {/* Tour Details Section */}
        <div className="mt-6 space-y-4">
          <ShimmerBox width="w-1/3" height="h-6" className="rounded" />
          <div className="space-y-3">
            <ShimmerBox width="w-full" height="h-4" />
            <ShimmerBox width="w-5/6" height="h-4" />
            <ShimmerBox width="w-4/5" height="h-4" />
          </div>
        </div>

        {/* Inclusions */}
        <div className="mt-8 space-y-4">
          <ShimmerBox width="w-1/4" height="h-6" className="rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <ShimmerBox width="w-4" height="h-4" className="rounded-full" />
                <ShimmerBox width="w-32" height="h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="mt-8 space-y-4">
          <ShimmerBox width="w-1/4" height="h-6" className="rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <ShimmerBox width="w-4" height="h-4" className="rounded-full" />
                <ShimmerBox width="w-28" height="h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Tour Program */}
        <div className="mt-8 w-full flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <ShimmerBox width="w-8" height="h-8" className="rounded-full" />
            <ShimmerBox width="w-32" height="h-8" className="rounded" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-3 md:p-4 rounded-xl border border-gray-100">
                <ShimmerBox width="w-full" height="h-4" />
                <ShimmerBox width="w-3/4" height="h-4" className="mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className="mt-8 w-full flex flex-col gap-6 px-2 md:px-0">
          <div className="flex items-center gap-3">
            <ShimmerBox width="w-8" height="h-8" className="rounded-full" />
            <ShimmerBox width="w-32" height="h-8" className="rounded" />
          </div>
          <div className="flex flex-col gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-gray-50 p-3 md:p-4 rounded-xl border border-gray-100">
                <ShimmerBox width="w-full" height="h-4" />
                <ShimmerBox width="w-20" height="h-4" className="mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Logistics */}
        <div className="mt-8 w-full flex flex-col gap-6 px-2 md:px-0">
          <div className="flex items-center gap-3">
            <ShimmerBox width="w-8" height="h-8" className="rounded-full" />
            <ShimmerBox width="w-32" height="h-8" className="rounded" />
          </div>
          <div className="bg-blue-50 p-4 md:p-5 rounded-2xl border border-blue-100">
            <ShimmerBox width="w-full" height="h-4" />
            <ShimmerBox width="w-3/4" height="h-4" className="mt-2" />
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-8 w-full flex flex-col gap-6 px-2 md:px-0">
          <div className="flex items-center gap-3">
            <ShimmerBox width="w-8" height="h-8" className="rounded-full" />
            <ShimmerBox width="w-32" height="h-8" className="rounded" />
          </div>
          <div className="space-y-2">
            <ShimmerBox width="w-full" height="h-4" />
            <ShimmerBox width="w-5/6" height="h-4" />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 w-full flex flex-col gap-6 px-2 md:px-0">
          <div className="flex items-center gap-3">
            <ShimmerBox width="w-8" height="h-8" className="rounded-full" />
            <ShimmerBox width="w-32" height="h-8" className="rounded" />
          </div>
          <ul className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <ShimmerBox width="w-2" height="h-2" className="rounded-full" />
                <ShimmerBox width="w-48" height="h-4" />
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="mt-8 w-full flex flex-col gap-6 px-2 md:px-0">
          <ShimmerBox width="w-32" height="h-8" className="rounded" />
          <ShimmerBox width="w-full" height="h-48 md:h-96" className="rounded-3xl" />
        </div>

        {/* Packages */}
        <div className="mt-8 w-full flex flex-col gap-6 px-2 md:px-0">
          <ShimmerBox width="w-48" height="h-8" className="rounded" />
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4">
                <ShimmerBox width="w-1/3" height="h-6" className="rounded mb-3" />
                <ShimmerBox width="w-full" height="h-4" />
                <ShimmerBox width="w-2/3" height="h-4" className="mt-2" />
                <ShimmerBox width="w-24" height="h-10" className="rounded mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPageShimmer;
