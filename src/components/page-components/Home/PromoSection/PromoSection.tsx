import Image from "next/image";
import React from "react";

export default function PromoSection({
  title,
  subtitle,
  image,
}: {
  image?: string;
  title?: string;
  subtitle?: string;
}) {
  if (!image || !title || !subtitle) {
    return (
      <>
        <section className="container">
          <div className="main-page-section">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12 items-center">
              {/* Image Skeleton */}
              <div className="w-full lg:col-span-2">
                <div className="h-[300px] md:h-[400px] rounded-2xl shadow-2xl bg-gray-200 animate-pulse"></div>
              </div>

              {/* Content Skeleton */}
              <div className="max-w-prose md:max-w-none text-center md:text-right space-y-6">
                <div className="h-8 md:h-10 lg:h-12 bg-gray-200 rounded w-3/4 mx-auto md:mx-0 animate-pulse"></div>
                <div className="h-6 md:h-8 lg:h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <section className="container">
      <div className="main-page-section">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12 items-center">
          {/* Image Section */}
          <div className="w-full lg:col-span-2 group">
            <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <Image
                fill
                src={image}
                alt="طائرة"
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-prose md:max-w-none text-center md:text-right space-y-6">
            <div className="relative">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-relaxed hover:scale-105 transition-transform duration-300">
                {title}
              </h2>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full opacity-20 blur-xl animate-bounce"></div>
            </div>
            <div className="relative">
              <p className="text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed hover:text-gray-700 transition-colors duration-300">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
