export default function ToursSectionSkeleton() {
  return (
    <div className="main-page-section container mx-auto !pe-0 md:pe-auto">
      {/* Header skeleton */}
      <div className="space-y-2 mb-6 max-w-6xl mx-auto !pe-[25px] md:pe-auto">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Tour cards skeleton - horizontal slider matching actual design */}
      <div className="relative w-full">
        <div className="overflow-hidden px-2">
          <div className="flex gap-4 md:gap-6 pt-4 pb-7">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[60vw] sm:w-[340px] md:w-[320px] lg:w-[385px] h-[450px] rounded-2xl bg-gray-200 animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Navigation arrows skeleton (hidden on mobile) */}
        <div className="hidden md:flex absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-gray-200 rounded-full p-3 lg:p-4 w-12 h-12 lg:w-16 lg:h-16 animate-pulse"></div>
        </div>
        <div className="hidden md:flex absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-gray-200 rounded-full p-3 lg:p-4 w-12 h-12 lg:w-16 lg:h-16 animate-pulse"></div>
        </div>
      </div>

      {/* Show more button skeleton */}
      <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
    </div>
  );
}
