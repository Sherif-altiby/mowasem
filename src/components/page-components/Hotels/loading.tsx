// app/hotels/loading.tsx
import PageSection from "@/components/layout/PageSection/PageSection";

export default function Loading() {
  return (
    <PageSection>
      <div className="secondary-page-layout gap-y-6! md:gap-y-13!">
        {/* Search skeleton */}
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          <div className="flex-1 w-full h-[62px] rounded-2xl bg-gray-200 animate-pulse" />
          <div className="w-full md:w-48 h-[62px] rounded-2xl bg-gray-200 animate-pulse" />
          <div className="w-full md:w-48 h-[62px] rounded-2xl bg-gray-200 animate-pulse" />
        </div>

        {/* Header skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-4 w-72 rounded-lg bg-gray-200 animate-pulse" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
