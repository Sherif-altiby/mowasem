export default function ServiceSectionSkeleton() {
  return (
    <div className="main-page-section container">
      {/* Skeleton for header */}
      <div className="space-y-2 mb-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Desktop grid */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full h-48 rounded-xl bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>

      {/* Mobile grid */}
      <div className="grid grid-cols-4 md:hidden items-center justify-center divide-x divide-gray-200 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full h-32 rounded-lg bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>

      {/* Show more button skeleton */}
      <div className="mt-6 h-10 w-32 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
    </div>
  );
}
