export default function ReviewSectionSkeleton() {
  return (
    <div className="main-page-section container">
      {/* Header skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Review marquee skeleton - matching actual design with two rows */}
      <div className="relative w-full flex flex-col gap-8">
        {/* Header bar skeleton (AddReviewCard) */}
        <div className="w-full h-24 bg-gray-200 rounded-2xl animate-pulse"></div>

        {/* Marquee rows skeleton */}
        <div className="relative w-full flex flex-col gap-3 md:gap-4 overflow-hidden">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-28 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-28 bg-gradient-to-r from-white to-transparent z-10" />

          {/* Top row */}
          <div className="overflow-hidden">
            <div className="flex gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={`top-${i}`}
                  className="w-[280px] md:w-[350px] h-[180px] rounded-2xl bg-gray-200 animate-pulse flex-shrink-0"
                ></div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="overflow-hidden">
            <div className="flex gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={`bottom-${i}`}
                  className="w-[280px] md:w-[350px] h-[180px] rounded-2xl bg-gray-200 animate-pulse flex-shrink-0"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Show more button skeleton */}
      <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
    </div>
  );
}
