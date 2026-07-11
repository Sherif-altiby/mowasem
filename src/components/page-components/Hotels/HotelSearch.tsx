"use client";

import { Search, X, Loader2 } from "lucide-react";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface HotelSearchProps {
  countries?: { country: string; label: string }[];
  cities?: {
    _id: string;
    name: string;
    country?: { id?: string; _id?: string; name?: string };
  }[];
}

const DEBOUNCE_MS = 500;

const HotelSearch = ({ countries = [], cities = [] }: HotelSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialQuery = useRef(searchParams.get("q") || "");
  const initialCountry = useRef(searchParams.get("country") || "");
  const initialCity = useRef(searchParams.get("city") || "");

  const [query, setQuery] = useState(initialQuery.current);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry.current);
  const [selectedCity, setSelectedCity] = useState(initialCity.current);

  const [isSearching, setIsSearching] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(false);

  const pendingUrl = useRef<string | null>(null);
  const isClearing = useRef(false);

  // detect navigation complete
  useEffect(() => {
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (pendingUrl.current === currentUrl) {
      setIsSearching(false);
      pendingUrl.current = null;
    }
  }, [pathname, searchParams]);

  const availableCities = useMemo(() => {
    if (!selectedCountry) return cities;

    const countryObj = countries.find(
      (c) => c.label === selectedCountry || c.country === selectedCountry
    );

    const countryId = countryObj ? countryObj.country : selectedCountry;

    return cities.filter(
      (c) =>
        c.country?.id === countryId ||
        c.country?._id === countryId ||
        c.country?.name === selectedCountry
    );
  }, [selectedCountry, cities, countries]);

  const navigate = useCallback(
    (q: string, country: string, city: string) => {
      const params = new URLSearchParams();

      if (q.trim()) params.set("q", q.trim());
      if (country) params.set("country", country);
      if (city) params.set("city", city);

      params.set("page", "1");

      const url = `/hotels?${params.toString()}`;

      pendingUrl.current = url;
      setIsSearching(true);

      router.push(url);
    },
    [router]
  );

  // debounce search input
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (isClearing.current) {
      isClearing.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      navigate(query, selectedCountry, selectedCity);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, navigate, selectedCity, selectedCountry]);

  // instant update for selects
  const prevCountry = useRef(selectedCountry);
  const prevCity = useRef(selectedCity);

  useEffect(() => {
    if (
      prevCountry.current === selectedCountry &&
      prevCity.current === selectedCity
    )
      return;

    prevCountry.current = selectedCountry;
    prevCity.current = selectedCity;

    if (!isMounted.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    navigate(query, selectedCountry, selectedCity);
  }, [selectedCountry, selectedCity, navigate, query]);

  // FIXED CLEAR FUNCTION
  const handleClear = useCallback(() => {
    isClearing.current = true;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    setQuery("");
    setSelectedCountry("");
    setSelectedCity("");

    const url = "/hotels?page=1";

    pendingUrl.current = url;
    setIsSearching(true);

    router.push(url);
  }, [router]);

  const hasFilters = query || selectedCountry || selectedCity;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col md:flex-row items-center gap-3 w-full">

        {/* Search */}
        <div className="relative flex-1 w-full">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن الفنادق..."
            dir="rtl"
            className="w-full h-[62px] pr-12 pl-10 rounded-2xl border border-[#D9D7DB] bg-card text-[12px] md:text-[20px] text-gray-800"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Country */}
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedCity("");
          }}
          className="w-full md:w-48 h-[62px] px-4 rounded-2xl border border-[#D9D7DB] bg-card text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={isSearching}
        >
          <option value="">كل الدول</option>
          {countries.map((c, idx) => (
            <option key={idx} value={c.label || c.country}>
              {c.label || c.country}
            </option>
          ))}
        </select>

        {/* City */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={isSearching || availableCities.length === 0}
          className="w-full md:w-48 h-[62px] px-4 rounded-2xl border border-[#D9D7DB] bg-card text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">كل المدن</option>
          {availableCities.map((city) => (
            <option key={city._id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        {/* Clear */}
        {hasFilters && (
          <button type="button" onClick={handleClear} disabled={isSearching} className="cursor-pointer h-[62px] w-full md:w-auto md:min-w-[155px] px-7 rounded-2xl bg-gray-200 text-gray-700 font-medium text-base md:text-[20px] hover:bg-gray-300 transition-colors duration-200 shrink-0 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed" > <X className="w-4 h-4" /> مسح </button>
        )}
      </div>

      {/* Loading bar */}
      <div className="relative w-full h-[3px] bg-gray-100 overflow-hidden rounded-full">
        {isSearching && (
          <div className="loading-bar bg-primary" />
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
