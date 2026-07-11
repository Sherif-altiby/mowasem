"use client";

import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { getData } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

interface DestinationOption {
  id: string;
  name: string;
  code: string;
  cityName: string;
  countryName: string;
  type: "CITY" | "AIRPORT";
  photo: string;
}

interface DestinationResponse {
  success: boolean;
  data: DestinationOption[];
}

async function fetchDestinations(query: string): Promise<DestinationOption[]> {
  if (!query || query.length < 2) return [];
  const res = await getData<DestinationResponse>(
    `flights/search-destination?query=${encodeURIComponent(query)}`,
  );
  return res.success ? res.data : [];
}

interface Props<T extends FieldValues> {
  id: string;
  label: React.ReactNode;
  placeholder?: string;
  icon?: React.ReactNode;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  errors?: Partial<Record<string, { message?: string }>>;
}

const AutocompleteInput = <T extends FieldValues>({
  id,
  placeholder,
  icon,
  label,
  name,
  control,
  rules,
  errors,
}: Props<T>) => {
  const [displayValue, setDisplayValue] = useState("");
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const { data: options = [], isFetching } = useQuery({
    queryKey: ["autocomplete-destination", debounced],
    queryFn: () => fetchDestinations(debounced),
    enabled: debounced.length > 1,
  });

  const error = errors?.[name as string];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const handleSelect = (option: DestinationOption) => {
          field.onChange(option.id);
          setDisplayValue(option.name);
          setSearch("");
          setIsOpen(false);
        };

        return (
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor={id}
              className="text-sm md:text-2xl font-medium text-[#1A1A1A] flex items-center gap-2"
            >
              {icon}
              {label}
            </label>
            <div className="relative" ref={containerRef}>
              <input
                type="text"
                id={id}
                placeholder={placeholder}
                value={displayValue || search}
                onChange={(e) => {
                  const val = e.target.value;
                  setDisplayValue("");
                  setSearch(val);
                  if (!val) field.onChange("");
                  setIsOpen(true);
                }}
                onFocus={() => {
                  if (search.length > 1 || options.length > 0) setIsOpen(true);
                }}
                className="focus:outline-none bg-card placeholder:text-[#858687] text-base border border-gray-300 rounded-xl px-4 py-3 sm:py-3 w-full"
                autoComplete="off"
              />

              {isOpen && debounced.length > 1 && (
                <ul className="absolute z-50 top-full mt-1 w-full bg-card border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {isFetching ? (
                    <li className="flex items-center gap-3 px-3 py-2.5 text-gray-400 text-sm">
                      <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                      جاري البحث...
                    </li>
                  ) : options.length > 0 ? (
                    options.map((option) => (
                      <li
                        key={option.id}
                        onMouseDown={() => handleSelect(option)}
                        className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={option.photo}
                            alt={option.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-[#1A1A1A] truncate">
                              {option.name}
                            </span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                                option.type === "CITY"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {option.type === "CITY" ? "مدينة" : "مطار"}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 truncate">
                            {option.cityName}، {option.countryName}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-400 shrink-0">
                          {option.code}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2.5 text-gray-400 text-sm">
                      لا توجد نتائج
                    </li>
                  )}
                </ul>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-xs font-medium">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default AutocompleteInput;
