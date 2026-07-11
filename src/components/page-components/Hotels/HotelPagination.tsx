"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export default function HotelPagination({ pagination }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (!pagination || pagination.totalPages <= 1) return null;
  const { currentPage, totalPages } = pagination;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const currentUrlParams = new URLSearchParams(searchParams.toString());
    currentUrlParams.set("page", newPage.toString());
    router.push(`${pathname}?${currentUrlParams.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPages = () => {
    const pages = [];
    const showMax = 5;
    let start = Math.max(1, currentPage - Math.floor(showMax / 2));
    let end = start + showMax - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - showMax + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 py-4" dir="rtl">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed mx-2 transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {getPages().map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
            currentPage === p
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed mx-2 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
    </div>
  );
}
