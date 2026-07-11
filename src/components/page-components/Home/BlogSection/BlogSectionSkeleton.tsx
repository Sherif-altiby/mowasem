export default function BlogSectionSkeleton() {
  return (
    <div className="container !pe-0 md:pe-auto">
      {/* Header skeleton */}
      <div className="space-y-2 mb-6 !pe-[25px] md:pe-auto">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Blog cards skeleton - swiper matching actual design */}
      <div className="relative w-full my-4 md:my-8">
        <div className="overflow-hidden px-2">
          <div className="flex gap-4 md:gap-6 py-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[60vw] sm:w-[340px] md:w-[320px] lg:w-[302px] h-[480px] rounded-2xl bg-gray-200 animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Navigation arrows skeleton (hidden on mobile) */}
        <div className="hidden md:flex absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-gray-200 rounded-full p-3 lg:p-4 w-12 h-12 lg:w-16 lg:h-16 animate-pulse"></div>
        </div>
        <div className="hidden md:flex absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-gray-200 rounded-full p-3 lg:p-4 w-12 h-12 lg:w-16 lg:h-16 animate-pulse"></div>
        </div>
      </div>

      {/* Show more button skeleton */}
      <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
    </div>
  );
}
