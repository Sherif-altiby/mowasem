"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight, ChevronLeft, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // منطق إنشاء أرقام الصفحات مع الـ ellipsis
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const delta = 2; // عدد الصفحات يمين ويسار الحالية

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (rangeStart > 2) pages.push("...");

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  const baseClass =
    "flex items-center justify-center w-10 h-10 border rounded-md transition-colors";
  const activeClass = "bg-primary text-white border-primary";
  const hoverClass = "hover:bg-primary hover:text-white";

  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      <div className="flex items-center gap-2">
        {/* زر السابق */}
        {hasPrevPage ? (
          <Link href={createPageUrl(currentPage - 1)} className={`${baseClass} ${hoverClass}`}>
            <ChevronRight className="w-5 h-5" />
          </Link>
        ) : (
          <span className={`${baseClass} opacity-30 cursor-not-allowed`}>
            <ChevronRight className="w-5 h-5" />
          </span>
        )}

        {/* أرقام الصفحات */}
        {pageNumbers.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className={`${baseClass} border-none cursor-default`}>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`${baseClass} ${page === currentPage ? activeClass : hoverClass}`}
            >
              {page}
            </Link>
          )
        )}

        {/* زر التالي */}
        {hasNextPage ? (
          <Link href={createPageUrl(currentPage + 1)} className={`${baseClass} ${hoverClass}`}>
            <ChevronLeft className="w-5 h-5" />
          </Link>
        ) : (
          <span className={`${baseClass} opacity-30 cursor-not-allowed`}>
            <ChevronLeft className="w-5 h-5" />
          </span>
        )}
      </div>

      {/* عداد الصفحات */}
      <p className="text-sm text-gray-500">
        صفحة <span className="font-semibold text-primary">{currentPage}</span> من{" "}
        <span className="font-semibold">{totalPages}</span>
      </p>
    </div>
  );
};

export default Pagination;
