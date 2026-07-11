"use client";
import { Search } from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ToursSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    router.push(`/tours?${params.toString()}`);
  }, [query, router, searchParams]);

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="ابحث عن الجولات, المدن..."
          dir="rtl"
          className="w-full h-[42px] md:h-[62px] pr-12 pl-4 rounded-2xl border border-[#D9D7DB] bg-card text-[12px] md:text-[20px] text-gray-800 placeholder:text-[#767677] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
        />
      </div>
      <button
        type="button"
        onClick={handleSearch}
        className="cursor-pointer h-[42px] md:h-[62px] min-w-[100px] md:min-w-[155px] px-7 rounded-3xl   md:rounded-full bg-primary text-white font-medium text-base md:text-[20px] hover:bg-[#] transition-colors duration-200 shrink-0 shadow-sm"
      >
        بحث
      </button>
    </div>
  );
};

export default ToursSearch;
