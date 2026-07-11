const GuideCardSkeleton = () => {
  return (
    <div className="relative p-2 min-h-72 rounded-xl border border-gray-200 shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gray-200">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      {/* Details Skeleton */}
      <div className="flex flex-col justify-between gap-3 flex-1 p-4 space-y-2">
        <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
        <div className="h-6 w-full bg-gray-200 rounded-lg" />
        <div className="h-6 w-1/2 bg-gray-200 rounded-lg mt-4" />
      </div>
    </div>
  );
};

export const GuidesGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[...Array(6)].map((_, i) => (
        <GuideCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default GuideCardSkeleton;
