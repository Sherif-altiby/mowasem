"use client";

import { useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import BlogCard from "@/components/ui/BlogCard/BlogCard";

export default function BlogsSearch({
  blogs,
  seoData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blogs: any[];
  seoData: NormalPageSeo | null;
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearch = useCallback(() => {
    setSubmittedQuery(query.trim());
  }, [query]);

  const filtered = useMemo(() => {
    const q = submittedQuery.toLowerCase();
    if (!q) return blogs;
    return blogs.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.descText?.toLowerCase().includes(q),
    );
  }, [submittedQuery, blogs]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search bar */}
      <div className="flex items-center gap-3 w-full mx-auto">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="ابحث عن مقالة..."
            dir="rtl"
            className="w-full h-[42px] md:h-[62px] md:h-[62px] pr-10 pl-4 rounded-full md:rounded-3xl border border-[#D9D7DB] bg-card text-[13px] md:text-[20px] text-gray-800 placeholder:text-[#767677] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          className="cursor-pointer h-[42px] md:h-[62px] md:h-[62px] min-w-[90px] md:min-w-[155px] px-4 md:px-7 rounded-full bg-primary text-white font-medium text-sm md:text-[20px] hover:bg-primary transition-colors duration-200 shrink-0 shadow-sm"
        >
          بحث
        </button>
      </div>

      <SectionHeader
        title={seoData?.data?.title || "مقالات السفر"}
        titleTag="h1"
        desc={
          seoData?.data?.description ||
          "استمتع بقراءة أحدث المقالات التي تقدم لك أفكاراً ملهمة، ونصائح عملية، وتجارب استثنائية على الاستعداد لرحلتك القادمة بثقة."
        }
      />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog?.title}
              image={blog.imageCover || "/assets/CITY.webp"}
              date={blog?.createdAt || blog?.publishedAt}
              readTime={blog?.timeToRead || 5}
              href={`/blogs/${blog.slug}`}
              imageAlt={blog?.alt || blog?.title}
            />
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
    </div>
  );
}
