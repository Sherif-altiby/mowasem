import React from 'react';

// Shimmer Animation Component
const ShimmerBox = ({ className = "", width = "w-full", height = "h-5" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${width} ${height} ${className}`} />
);

const DetailsPageShimmer = () => {
  return (
    <div className="w-full relative pb-24 md:pb-8 text-primary bg-card rounded-[32px] p-6 mb-6! mt-35! md:mt-52!">
      {/* الشريط السفلي العائم للجوال */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card shadow-[0_-4px_15px_rgba(0,0,0,0.05)] p-4 z-50 flex justify-between items-center border-t border-gray-100">
        <ShimmerBox width="w-32" height="h-10" className="rounded-full" />
        <div className="text-left flex flex-col items-end">
          <ShimmerBox width="w-20" height="h-4" />
          <ShimmerBox width="w-24" height="h-3" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-0">
        {/* الترويسة الرئيسية */}
        <div className="flex justify-between items-end mb-6 pt-4">
          <div className="flex-1 pr-0 md:pr-4">
            <ShimmerBox width="w-3/4" height="h-10 md:h-12" className="mb-2" />
            <div className="flex items-center gap-2 mb-3">
              <ShimmerBox width="w-5" height="h-5" className="rounded-full" />
              <ShimmerBox width="w-16" height="h-4" />
              <ShimmerBox width="w-12" height="h-4" />
            </div>
            <ShimmerBox width="w-1/2" height="h-4" />
          </div>
          <ShimmerBox width="w-8" height="h-8" className="rounded-full" />
        </div>

        {/* القسم الرئيسي: المحتوى والصور */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 mb-10 w-full">
          {/* النص والمرافق - على اليمين في سطح المكتب */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-between self-stretch mb-6">
            <div>
              <ShimmerBox width="w-1/2" height="h-8 md:h-10" className="mb-4" />
              <div className="space-y-2 mb-8">
                <ShimmerBox width="w-full" height="h-4" />
                <ShimmerBox width="w-5/6" height="h-4" />
                <ShimmerBox width="w-4/5" height="h-4" />
                <ShimmerBox width="w-full" height="h-4" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ShimmerBox width="w-6" height="h-6" className="rounded-full" />
                  <ShimmerBox width="w-24" height="h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* معرض الصور - على اليسار في سطح المكتب */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <ShimmerBox width="w-full" height="h-64 md:h-96" className="rounded-2xl" />
          </div>
        </div>

        {/* الغرف */}
        <div className="mt-6 mb-10 w-full relative">
          <div className="flex justify-between items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <ShimmerBox width="w-10" height="h-10" className="rounded-lg" />
              <ShimmerBox width="w-16" height="h-8 md:h-10" />
            </div>
          </div>

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-[#E5E7EB] rounded-[16px] lg:rounded-[24px] p-4 lg:p-6 flex flex-row items-stretch gap-3 lg:gap-6 bg-card w-full overflow-hidden"
              >
                {/* صورة الغرفة */}
                <ShimmerBox width="w-[80px] h-[80px] lg:w-[130px] lg:h-[130px]" className="rounded-[12px] lg:rounded-2xl shrink-0" />

                {/* بيانات الغرفة */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <ShimmerBox width="w-3/4" height="h-5 md:h-8" className="mb-2" />
                  <ShimmerBox width="w-1/2" height="h-3 md:h-6" />
                </div>

                <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2 shrink-0"></div>

                {/* الميزات */}
                <div className="flex flex-col justify-center gap-2 shrink-0">
                  <ShimmerBox width="w-16" height="h-3 md:h-6" />
                  <ShimmerBox width="w-12" height="h-3 md:h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* معلومات الموقع */}
        <div className="mb-14 border-t pt-8 border-gray-100">
          <ShimmerBox width="w-32" height="h-8" className="mb-6 mx-auto md:mx-0" />
          <ShimmerBox width="w-full" height="h-[200px] md:h-[600px]" className="rounded-3xl" />
        </div>

        {/* سياسات الفندق */}
        <div className="mb-14 border-t pt-8 border-gray-100">
          <ShimmerBox width="w-32" height="h-8" className="mb-6 mx-auto md:mx-0" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl px-6 py-7 text-center flex flex-col items-center"
              >
                <ShimmerBox width="w-16" height="w-16" className="rounded-2xl mb-4" />
                <ShimmerBox width="w-24" height="h-6" className="mb-2" />
                <ShimmerBox width="w-32" height="h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPageShimmer;
