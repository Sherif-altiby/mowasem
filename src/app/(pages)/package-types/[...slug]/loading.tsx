import React from 'react';

// Shimmer Animation Component
const ShimmerBox = ({ className = "", width = "w-full", height = "h-5" }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${width} ${height} ${className}`} />
);

const DetailsPageShimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Breadcrumb Shimmer */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <ShimmerBox width="w-20" height="h-4" />
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <ShimmerBox width="w-24" height="h-4" />
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <ShimmerBox width="w-28" height="h-4" />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-8">
          <ShimmerBox 
            width="w-full" 
            height="h-96" 
            className="rounded-xl mb-4"
          />
          {/* Thumbnail Images */}
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <ShimmerBox 
                key={i}
                width="w-20" 
                height="h-16" 
                className="rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Product Details - Right Side (Bigger) */}
          <div className="lg:col-span-8">
            <div className="bg-card rounded-xl border border-gray-200 p-6">
              
              {/* Title and Basic Info */}
              <div className="mb-8">
                <ShimmerBox width="w-3/4" height="h-9" className="mb-4" />
                <div className="flex items-center gap-4 mb-4">
                  <ShimmerBox width="w-24" height="h-5" />
                  <ShimmerBox width="w-20" height="h-5" />
                  <ShimmerBox width="w-28" height="h-5" />
                </div>
                <ShimmerBox width="w-full" height="h-16" className="rounded-lg" />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <ShimmerBox width="w-32" height="h-7" className="mb-4" />
                <div className="space-y-4">
                  <ShimmerBox width="w-full" height="h-4" />
                  <ShimmerBox width="w-5/6" height="h-4" />
                  <ShimmerBox width="w-4/5" height="h-4" />
                  <ShimmerBox width="w-full" height="h-32" className="rounded-lg" />
                </div>

                {/* Features List */}
                <div className="mt-8">
                  <ShimmerBox width="w-48" height="h-7" className="mb-4" />
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <ShimmerBox width="w-4" height="h-4" className="rounded-full" />
                        <ShimmerBox width="w-64" height="h-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Us - Left Side (Smaller) */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-xl border border-gray-200 p-6 sticky top-6">
              
              <ShimmerBox width="w-36" height="h-6" className="mb-6" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShimmerBox width="w-5" height="h-5" />
                  <ShimmerBox width="w-32" height="h-4" />
                </div>
                <div className="flex items-center gap-3">
                  <ShimmerBox width="w-5" height="h-5" />
                  <ShimmerBox width="w-28" height="h-4" />
                </div>
                <div className="flex items-center gap-3">
                  <ShimmerBox width="w-5" height="h-5" />
                  <ShimmerBox width="w-40" height="h-4" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <ShimmerBox width="w-full" height="h-12" className="rounded-lg" />
                <ShimmerBox width="w-full" height="h-10" className="rounded-lg" />
              </div>

            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default DetailsPageShimmer;
