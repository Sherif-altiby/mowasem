"use client";

import React, { useState } from "react";
import { Branch } from "@/types/Data/packageDetails";
import Image from "next/image";
import { MdCalendarToday, MdCheckCircle, MdCancel } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import CurrancyIcon from "@/components/common/CurrancyIcon/CurrancyIcon";

export default function BranchDetails({ branches }: { branches: Branch[] }) {
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const selectedBranch = branches[selectedBranchIndex];
  console.log(branches)
  if (!branches || branches.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Branch Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-2 bg-card/40 backdrop-blur-sm rounded-3xl border border-primary/5">
        {branches.map((branch, index) => (
          <button
            key={branch._id}
            onClick={() => setSelectedBranchIndex(index)}
            className={`p-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${selectedBranchIndex === index
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
              : "bg-card/60 text-primary hover:bg-card hover:shadow-md border border-primary/5"
              }`}
          >
            {branch.name}
          </button>
        ))}
      </div>

      {/* Selected Branch Content */}
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Price and Duration Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card/80 p-6 rounded-[2rem] border border-primary/5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                <MdCalendarToday className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium">
                  مدة البرنامج
                </p>
                <p className="text-primary font-bold text-lg">
                  {selectedBranch.daysCount} أيام / {selectedBranch.nightsCount}{" "}
                  ليالي
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/80 p-6 rounded-[2rem] border border-primary/5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="text-xl font-bold">
                  <CurrancyIcon color="text-primary" />
                </span>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium">
                  السعر يبدأ من
                </p>
                <p className="text-primary font-bold text-2xl">
                  {selectedBranch.price}
                  <span className="text-sm font-normal text-gray-400">
                    / للشخص
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary (Days) */}
        {selectedBranch.days && selectedBranch.days.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">
                برنامج الرحلة بالتفصيل
              </h3>
            </div>

            <div className="relative space-y-4 before:absolute before:right-4 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-primary/10 before:to-transparent">
              {selectedBranch.days.map((day, index) => (
                <div key={index} className="relative pr-12">
                  {/* Timeline Dot */}
                  <div className="absolute right-2 top-4 w-4.5 h-4.5 rounded-full bg-card border-4 border-primary shadow-sm z-10" />

                  <details
                    className="group bg-card/60 hover:bg-card rounded-3xl border border-primary/5 transition-all duration-300"
                    open={index === 0}
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-secondary text-primary font-bold text-sm">
                          {day.dayNumber}
                        </span>
                        <h4 className="text-lg font-bold text-primary">
                          {day.tour?.title}
                        </h4>
                      </div>
                      <FaChevronDown className="w-4 h-4 text-primary/40 group-open:rotate-180 transition-transform duration-300" />
                    </summary>
                    <div className="px-5 pb-5 pt-0">
                      <div className="h-px bg-primary/5 mb-4" />

                      <div className="flex flex-col gap-4">
                        {/* Tour Description */}
                        {day.tour?.descText && (
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {day.tour.descText}
                          </p>
                        )}

                        {day.tour?.description && (
                          <div
                            className="text-gray-600 leading-relaxed text-sm prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: day.tour.description,
                            }}
                          />
                        )}

                        {/* Tour Images Gallery */}
                        {Array.isArray(day.tour?.images) && day.tour.images.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                            {day.tour.images.map((img, i) => (
                              <div
                                key={i}
                                className="relative h-28 rounded-2xl overflow-hidden group/img shadow-sm border border-black/5"
                              >
                                <Image
                                  src={"/assets/TOUR.webp"}
                                  alt={day.tour?.title || "Tour image"}
                                  fill
                                  className="object-cover transform group-hover/img:scale-110 transition-transform duration-500"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tour Specific Includes (Optional) */}
                        {Array.isArray(day.tour?.includes) && day.tour.includes.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {day.tour.includes.map((inc, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-bold border border-green-100"
                              >
                                {inc}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Includes & Excludes */}
        {(selectedBranch.includes?.length ||
          selectedBranch.excludes?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(selectedBranch.includes) && selectedBranch.includes.length > 0 && (
                <div className="bg-green-50/50 p-6 rounded-[2rem] border border-green-200">
                  <h4 className="text-green-800 font-bold mb-4 flex items-center gap-2">
                    <MdCheckCircle className="w-5 h-5" />
                    يشمل البرنامج
                  </h4>
                  <ul className="space-y-2">
                    {selectedBranch.includes.map((item, i) => (
                      <li
                        key={i}
                        className="text-green-700/80 text-sm flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(selectedBranch.excludes) && selectedBranch.excludes.length > 0 && (
                <div className="bg-red-50/50 p-6 rounded-[2rem] border border-red-200">
                  <h4 className="text-red-800 font-bold mb-4 flex items-center gap-2">
                    <MdCancel className="w-5 h-5" />
                    لا يشمل البرنامج
                  </h4>
                  <ul className="space-y-2">
                    {selectedBranch.excludes.map((item, i) => (
                      <li
                        key={i}
                        className="text-red-700/80 text-sm flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
