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
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row h-auto md:min-h-[286px] w-full rounded-2xl overflow-hidden bg-card shadow-sm border border-slate-100"
          >
            {/* Image Placeholder */}
            <div className="relative w-full md:w-[38%] h-48 md:h-auto bg-slate-200 shrink-0" />

            {/* Right side Info Placeholder */}
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <div className="space-y-3">
                <div className="h-7 w-3/4 bg-slate-200 rounded-md"></div>
                <div className="h-4 w-full bg-slate-100 rounded-md"></div>
                <div className="h-4 w-2/3 bg-slate-100 rounded-md"></div>
              </div>

              <div className="mt-auto space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-24 bg-slate-200 rounded-md"></div>
                </div>
                <div className="h-5 w-32 bg-slate-100 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </PageSection>
  );
}
