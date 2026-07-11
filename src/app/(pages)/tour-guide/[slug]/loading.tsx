import React from 'react';

// Shimmer Animation Component
const ShimmerBox = ({ className = "", width = "w-full", height = "h-5" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${width} ${height} ${className}`} />
);

const DetailsPageShimmer = () => {
  return (
    <div className="min-h-screen mt-[-88px]">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <ShimmerBox 
          width="w-full" 
          height="h-full" 
          className="rounded-none"
        />
        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/50 to-transparent">
          <div className="max-w-4xl">
            <ShimmerBox width="w-1/2 md:w-1/3" height="h-8 md:h-12" className="mb-4" />
            <ShimmerBox width="w-3/4 md:w-1/2" height="h-4 md:h-6" />
          </div>
        </div>
      </div>

      {/* Container with negative margin */}
      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="border border-primary/20 rounded-3xl p-6 md:p-12 lg:p-16 my-12 bg-white">
          
          {/* Country Overview Section */}
          <div className="mb-12">
            <ShimmerBox width="w-1/3 md:w-1/4" height="h-8 md:h-10" className="mb-6" />
            <div className="space-y-3">
              <ShimmerBox width="w-full" height="h-4" />
              <ShimmerBox width="w-11/12" height="h-4" />
              <ShimmerBox width="w-10/12" height="h-4" />
              <ShimmerBox width="w-11/12" height="h-4" />
              <ShimmerBox width="w-9/12" height="h-4" />
            </div>
          </div>

          {/* Country Places Section */}
          <div id="places" className="pt-12">
            <ShimmerBox width="w-1/3 md:w-1/4" height="h-8 md:h-10" className="mb-6" />
            
            {/* Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <ShimmerBox width="w-full" height="h-48" className="rounded-none" />
                  <div className="p-4">
                    <ShimmerBox width="w-3/4" height="h-6" className="mb-3" />
                    <ShimmerBox width="w-full" height="h-4" />
                    <ShimmerBox width="w-2/3" height="h-4" className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailsPageShimmer;
