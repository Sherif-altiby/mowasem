"use client";

import { MdErrorOutline, MdRefresh, MdHome } from "react-icons/md";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-card p-8 md:p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-red-100">
        {/* Icon with animation */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
          <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
            <MdErrorOutline className="text-5xl text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          عذراً، حدث خطأ!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-6">
          نعتذر عن الإزعاج، حدث خطأ غير متوقع
        </p>

        {/* Error Message */}
        <p className="text-red-500 text-sm mb-6 p-4 bg-red-100 border border-red-200 rounded-lg">{error.message}</p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Retry Button */}
          <button
            onClick={reset}
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <MdRefresh className="text-xl" />
            <span>إعادة المحاولة</span>
          </button>

          {/* Home Button */}
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-200"
          >
            <MdHome className="text-xl" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
}
