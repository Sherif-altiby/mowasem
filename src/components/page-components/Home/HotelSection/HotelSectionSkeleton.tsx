export default function HotelSectionSkeleton() {
  return (
    <section className="main-page-section">
      <div className="">
        {/* Header skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Hotel cards skeleton - horizontal slider matching actual design */}
        <div className="mt-6 relative">
          <div className="flex gap-3 md:gap-5" style={{ width: "max-content" }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-[60vw] md:w-[600px] lg:w-[650px] shrink-0 h-[400px] rounded-2xl bg-gray-200 animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Show more button skeleton */}
        <div className="mt-3 md:mt-6 h-10 w-40 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
      </div>
    </section>
  );
}
