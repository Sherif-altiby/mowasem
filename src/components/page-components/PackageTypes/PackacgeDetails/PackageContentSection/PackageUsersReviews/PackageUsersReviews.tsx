"use client";
import React from "react";


import { FaQuoteLeft, FaStar } from "react-icons/fa";
import GSAPSwiper from "@/components/page-components/tour-guide/components/GSAPSwiper";

export interface Reviews {
  data: {
    data: {
      _id: string;
      authorName: string;
      content: string;
      rate: number;
      createdAt: string;
    }[];
  };
}

export default function PackageUsersReviews({ reviews }: { reviews: Reviews }) {
  const reviewsData = reviews?.data?.data || [];

  if (reviewsData.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-3xl shadow-lg border border-gray-100 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">آراء العملاء</h2>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 w-4 h-4" />
          ))}
        </div>
      </div>

      <GSAPSwiper
        items={reviewsData || []}
        renderItem={(review) => (
          <div key={review._id} className="flex flex-col gap-4 h-full bg-gray-50/50 p-5 rounded-2xl border border-gray-100 relative">
            <FaQuoteLeft className="absolute top-4 left-4 text-primary w-8 h-8" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                {review.authorName?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="text-base font-bold text-primary">
                  {review.authorName}
                </h3>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-3 h-3 ${i < review.rate
                        ? "text-yellow-400"
                        : "text-gray-200"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {review.content}
            </p>
          </div>
        )}
        showNavigation={true}
        autoplay={false}
        className="px-5"
        classNameSlider="w-[376px]"
        autoplayDelay={3000}
        gap={20}
      />

    </div>
  );
}
