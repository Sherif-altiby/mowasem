"use client";

import { useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { Daum } from "@/types/Data/toursGuide";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import FilmFrame from "@/components/ui/FilmFrame/FilmFrame";

const PAGE_SIZE = 12;

export default function TourGuideSearch({
  guides,
  seoData,
}: {
  guides: Daum[];
  seoData: NormalPageSeo | null;
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useCallback(() => {
    setSubmittedQuery(query.trim());
    setCurrentPage(1); // reset to first page on new search
  }, [query]);

  // Only show guides that have a cover image
  const validGuides = useMemo(
    () => guides.filter((g) => !!g?.country?.imageCover?.url),
    [guides]
  );

  // All filtered results (no slicing yet)
  const filtered = useMemo(() => {
    const q = submittedQuery.toLowerCase();
    if (!q) return validGuides;
    return validGuides.filter((g) =>
      g.country.name.toLowerCase().includes(q)
    );
  }, [submittedQuery, validGuides]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // Slice for current page
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build visible page numbers: always show max 5, centred around currentPage
  const pageNumbers = useMemo(() => {
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = start + max - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - max + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col gap-8">

      {/* ── Search bar ── */}
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="ابحث عن وجهتك..."
            dir="rtl"
            className="w-full h-[42px] md:h-[62px] pr-12 pl-4 rounded-2xl border border-[#D9D7DB] bg-card
                       text-[12px] md:text-[20px] text-gray-800 placeholder:text-[#767677]
                       outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
                       transition-all duration-200"
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="cursor-pointer h-[42px] md:h-[62px] min-w-[100px] md:min-w-[155px] px-7
                     rounded-3xl md:rounded-full bg-primary text-white font-medium
                     text-base md:text-[20px] hover:bg-primary/80 transition-colors duration-200
                     shrink-0 shadow-sm"
        >
          بحث
        </button>
      </div>

      {/* ── Section header ── */}
      <SectionHeader
        title={seoData?.data?.title || "الدليل السياحي"}
        titleTag="h1"
        desc={
          seoData?.data?.description ||
          "اكتشف أجمل الوجهات السياحية حول العالم مع دليلنا السياحي الشامل"
        }
      />

      {/* ── Results count ── */}
      {filtered.length > 0 && (
        <p className="text-sm text-gray-500 text-right">
          عرض{" "}
          <span className="font-semibold text-gray-700">
            {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filtered.length)}
          </span>{" "}
          من{" "}
          <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
          نتيجة
        </p>
      )}

      {/* ── Grid ── */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginated.map((guide) => (
            <FilmFrame key={guide._id} data={guide} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <p className="text-2xl font-semibold text-gray-400">
            لا توجد نتائج لـ &quot;{submittedQuery}&quot;
          </p>
          <p className="text-gray-400 text-base">جرّب كلمة بحث أخرى</p>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 py-4"  >

          {/* Previous */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="الصفحة السابقة"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200
                       text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors"
          >
            ‹
          </button>

          {/* First page + ellipsis */}
          {pageNumbers[0] > 1 && (
            <>
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-700
                           hover:bg-gray-100 transition-colors font-medium"
              >
                1
              </button>
              {pageNumbers[0] > 2 && (
                <span className="w-10 h-10 flex items-center justify-center text-gray-400 select-none">
                  …
                </span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {pageNumbers.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePageChange(p)}
              aria-current={currentPage === p ? "page" : undefined}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors
                ${currentPage === p
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {p}
            </button>
          ))}

          {/* Ellipsis + last page */}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="w-10 h-10 flex items-center justify-center text-gray-400 select-none">
                  …
                </span>
              )}
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-700
                           hover:bg-gray-100 transition-colors font-medium"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="الصفحة التالية"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200
                       text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
