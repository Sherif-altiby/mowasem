"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// import { MdCheckCircle, MdCancel } from "react-icons/md";
import tamaraImg from "@/../public/assets/tamara.svg";
import tabbyImg from "@/../public/assets/tabby.svg";
import { FaChevronDown } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { Branch, Pkg } from "@/types/Data/packageDetails";
import CurrancyIcon from "@/components/common/CurrancyIcon/CurrancyIcon";
import CitiesSwiper from "./CitiesGallery/CitiesGallery";
import { Sun, Moon, Users } from "lucide-react";
import checkmarkImg from "@/../public/assets/checkmark.svg";
import xmarkImg from "@/../public/assets/xmark.svg";

import { Swiper, SwiperSlide } from "swiper/react";

export default function PackageClientLayout({
  pkg,
  branches,
  mainPhoneNumber,
  sidebarOptionalContent,
}: {
  pkg: Pkg;
  branches: Branch[];
  mainPhoneNumber: string;
  sidebarOptionalContent?: React.ReactNode;
}) {
  console.log("PKG", branches);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const selectedBranch =
    branches && branches.length > 0 ? branches[selectedBranchIndex] : null;

  // Use state to handle hydration diffs with bottom fixed bar on mobile
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!pkg || !branches || branches.length === 0) return null;

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا بخصوص الباقة: ${pkg.name}، فرع: ${selectedBranch?.name}`,
    );
    window.open(`https://wa.me/${mainPhoneNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-8 mt-8 bg-card p-10 rounded-[32px] mb-10">
      {/* 1. Branches Selection (Cards/Swiper) */}
      <div className="w-full">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {branches.map((branch, index) => {
            const isSelected = selectedBranchIndex === index;
            // Get combined cities for subtitles
            const branchCityNames =
              branch.cities?.map((c) => c.name).join("، ") || "";

            return (
              <SwiperSlide key={branch._id} className="py-2">
                <div
                  onClick={() => setSelectedBranchIndex(index)}
                  className={`relative flex flex-col bg-card rounded-[24px] transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_4px_20px_0_rgba(0,0,0,0.10)] border-2 ${isSelected
                    ? "border-[#00102D]"
                    : "border-transparent"
                    }`}
                >
                  {/* Image Section */}
                  <div className="relative h-[180px] w-full overflow-hidden shrink-0">
                    <Image
                      src={pkg.imageCover || "/assets/CITY.webp"}
                      alt={branch.name}
                      fill
                      className="object-cover"
                    />
                    {/* Price Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-[15px] font-bold flex items-center gap-1 shadow-md">
                      {branch.price} <CurrancyIcon color="text-white" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col gap-1.5 px-4 py-3">
                    <h3 className="font-bold text-[#1A1A1A] text-[17px] md:text-[20px] leading-snug">
                      {branch.name}
                    </h3>
                    <p className="text-[#58595D] text-[13px] md:text-[15px] truncate">
                      {branchCityNames || "وجهات متعددة"}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-0 mt-1 border-t border-gray-100 pt-2">
                      {/* Days */}
                      <div className="flex items-center gap-1.5 flex-1 justify-center">
                        <Sun className="w-[15px] h-[15px] text-[#58595D]" />
                        <span className="text-[#58595D] text-[12px] md:text-[14px] font-medium">
                          {branch.daysCount} أيام
                        </span>
                      </div>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-300 shrink-0" />
                      {/* Nights */}
                      <div className="flex items-center gap-1.5 flex-1 justify-center">
                        <Moon className="w-[15px] h-[15px] text-[#58595D]" />
                        <span className="text-[#58595D] text-[12px] md:text-[14px] font-medium">
                          {branch.nightsCount} ليال
                        </span>
                      </div>
                      {/* Divider */}
                      <div className="w-px h-4 bg-gray-300 shrink-0" />
                      {/* Traveler Type */}
                      <div className="flex items-center gap-1.5 flex-1 justify-center">
                        <Users className="w-[15px] h-[15px] text-[#58595D]" />
                        <span className="text-[#58595D] text-[12px] md:text-[14px] font-medium">
                          {pkg.packageType?.name || "عروسان"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-10">
          {/* نظرة عامة عن الباقة */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] md:text-[32px] font-semibold text-[#1A1A1A] inline-flex w-fit">
              نظرة عامة عن الباقة
            </h3>
            <div className="text-[12px] md:text-[22px] text-[#0F1115] leading-relaxed space-y-4">
              {pkg.description && (
                <div dangerouslySetInnerHTML={{ __html: pkg.description }} />
              )}
            </div>
          </div>

          {/* برنامج الرحلة */}
          {selectedBranch &&
            selectedBranch.days &&
            selectedBranch.days.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[18px] md:text-[32px] font-semibold text-[#1A1A1A] inline-flex w-fit">
                  برنامج الرحلة
                </h3>

                <div className="relative space-y-4 before:absolute before:right-4 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-primary/10 before:to-transparent">
                  {selectedBranch.days.map((day, index) => (
                    <div key={index} className="relative pr-12">
                      {/* Timeline Dot */}
                      <div className="absolute right-0 top-4 w-8 h-8 rounded-full bg-primary border-8 border-[#EAE9EB] z-10" />

                      <details
                        className="group bg-card rounded-3xl border border-primary/5 shadow-sm transition-all duration-300"
                        open={index === 0}
                      >
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center min-w-[40px] h-10 px-2 rounded-2xl bg-secondary text-primary font-bold text-sm">
                              يوم {day.dayNumber}
                            </span>
                            <h4 className="text-[16px] md:text-[22px] font-bold text-[#1A1A1A]">
                              {day.tour?.title ||
                                day.customTitle ||
                                "تفاصيل اليوم"}
                            </h4>
                          </div>
                          <FaChevronDown className="w-4 h-4 text-primary/40 group-open:rotate-180 transition-transform duration-300 shrink-0" />
                        </summary>
                        <div className="px-5 pb-5 pt-0">
                          <div className="h-px bg-primary/5 mb-4" />

                          <div className="flex flex-col gap-4">
                            {/* Tour Description */}
                            {day.tour?.descText || day.customDescription ? (
                              <p className="text-[#1A1A1A] leading-relaxed text-[12px] md:text-[22px]">
                                {day.tour?.descText || day.customDescription}
                              </p>
                            ) : null}

                            {day.tour?.description && (
                              <div
                                className="text-[#1A1A1A] leading-relaxed text-[12px] md:text-[22px] prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                  __html: day.tour.description,
                                }}
                              />
                            )}

                            {/* Tour Images Gallery */}
                            {Array.isArray(day.tour?.images) &&
                              day.tour.images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                  {day.tour.images.map((img, i) => (
                                    <div
                                      key={i}
                                      className="relative h-28 rounded-2xl overflow-hidden shadow-sm border border-black/5"
                                    >
                                      <Image
                                        src={"/assets/TOUR.webp"} // Assuming fallback, can replace with img if it's a URL
                                        alt={day.tour?.title || "Tour image"}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                            {/* Tour Specific Includes (Optional) */}
                            {Array.isArray(day.tour?.includes) &&
                              day.tour.includes.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {day.tour.includes.map((inc, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-bold border border-green-100"
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

          {/* form on mobile (shows below content on mobile, hidden on desktop since it's in sidebar on desktop) */}
          <div className="block lg:hidden mt-4">
            <BookingForm widgetTitle="سجل طلبك" />
          </div>
        </div>

        {/* LEFT SIDEBAR COLUMN */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-8">
          <div className="hidden lg:flex flex-col gap-6 sticky top-8 h-fit">
            {/* Widget: تفاصيل الباقة */}
            <div className="bg-card rounded-[2rem] border border-primary/5 shadow-sm p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-center font-medium text-[#767677] text-[14px] md:text-[24px]">
                  السعر ل2 شخص{" "}
                </h2>
                <div className="flex items-center justify-center gap-1 text-primary text-[26px] md:text-[32px] font-semibold">
                  {selectedBranch?.price} <CurrancyIcon color="text-#00276C" />
                </div>
              </div>

              {/* Installments (Tabby/Tamara Placeholder) */}
              <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-200">
                <span className="text-[14px] md:text-[24px] font-medium text-[#767677]">
                  التقسيط متاح
                </span>
                <div className="flex items-center gap-4">
                  <Image
                    src={tamaraImg}
                    alt="tamara"
                    width={100}
                    height={100}
                  />
                  <Image src={tabbyImg} alt="tabby" width={100} height={100} />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#4AC759] hover:bg-[#4AC759]/80 text-white py-3.5 rounded-full font-medium transition-all text-base md:text-[24px] shadow-md shadow-[#25D366]/20"
                >
                  <FaWhatsapp className="w-8 h-8" />
                  تواصل معنا عبر واتساب
                </button>
              </div>

              <div className="text-center text-[#1A1A1A] font-semibold text-sm md:text-[24px] my-2 border-t border-gray-200 pt-4">
                أو
              </div>

              {/* Form inside widget */}
              <BookingForm widgetTitle="سجل طلبك" />
            </div>

            {/* Other Sidebar Content passed from Layout */}
            {sidebarOptionalContent}
          </div>
        </div>
      </div>

      {/* Includes & Excludes — FULL WIDTH below the grid */}
      {selectedBranch?.includes?.length ||
        selectedBranch?.excludes?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {/* ما تشمله الباقة */}
          {Array.isArray(selectedBranch?.includes) &&
            selectedBranch.includes.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[18px] md:text-[32px] font-semibold text-[#1A1A1A] inline-flex w-fit">
                  ما تشمله الباقة
                </h3>
                <div className="p-6 pr-0 h-full">
                  <ul className="space-y-4">
                    {selectedBranch.includes.map((item, i) => (
                      <li
                        key={i}
                        className="text-[#1A1A1A] font-medium text-sm md:text-2xl flex items-center gap-3"
                      >
                        <Image
                          src={checkmarkImg}
                          alt="checkmark"
                          width={30}
                          height={30}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          {/* ما لا تشمله الباقة */}
          {Array.isArray(selectedBranch?.excludes) &&
            selectedBranch.excludes.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[18px] md:text-[32px] font-semibold text-[#1A1A1A] inline-flex w-fit">
                  ما لا تشمله الباقة
                </h3>
                <div className="p-6 pr-0 h-full">
                  <ul className="space-y-4">
                    {selectedBranch.excludes.map((item, i) => (
                      <li
                        key={i}
                        className="text-[#1A1A1A] font-medium text-sm md:text-2xl flex items-center gap-3"
                      >
                        <Image
                          src={xmarkImg}
                          alt="x amrk"
                          width={30}
                          height={30}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
        </div>
      ) : null}

      {/* الوجهات المشمولة — FULL WIDTH below the grid */}
      {selectedBranch?.cities?.length || pkg.cities?.length ? (
        <div className="flex flex-col gap-4 mt-8">
          <h3 className="text-[18px] md:text-[32px] font-semibold text-[#1A1A1A] inline-flex w-fit">
            الوجهات المشمولة
          </h3>
          <CitiesSwiper
            cities={
              selectedBranch?.cities?.length
                ? selectedBranch.cities
                : pkg.cities
            }
          />
        </div>
      ) : null}

      {/* Fixed bottom bar for Mobile Only */}
      {mounted && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-card rounded-t-[28px] shadow-[0_-10px_30px_rgba(0,0,0,0.08)] p-6 pb-8 flex flex-col gap-4 lg:hidden transition-transform duration-300 ease-in-out">
          <div className="flex flex-col gap-2">
            <h2 className="text-right font-bold text-[#1A1A1A] text-[20px]">
              تفاصيل الباقة
            </h2>
            <div className="flex items-center justify-between w-full">
              <span className="text-[16px] font-medium text-[#767677]">
                السعر ل 2 شخص
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-primary text-[26px] font-bold">
                  {selectedBranch?.price}{" "}
                  <span className="mb-1">
                    <CurrancyIcon color="text-primary" />
                  </span>
                </div>
                {/* {selectedBranch?.price && (
                  <div className="flex items-center gap-1 text-[#FF3333] text-[16px] font-medium line-through">
                    {selectedBranch.price + 200}{" "}
                    <span className="mb-1 scale-75">
                      <CurrancyIcon color="text-[#FF3333]" />
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 w-full my-1"></div>

          {/* Installments (Tabby/Tamara Placeholder) */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[14px] font-medium text-[#767677]">
              التقسيط متاح
            </span>
            <div className="flex items-center justify-center gap-5">
              <Image
                src={tamaraImg}
                alt="tamara"
                className="h-[22px] w-auto object-contain"
              />
              <div className="w-[1px] h-[22px] bg-gray-300"></div>
              <Image
                src={tabbyImg}
                alt="tabby"
                className="h-[22px] w-auto object-contain"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleWhatsAppClick}
              className="cursor-pointer w-full flex items-center justify-center gap-3 bg-[#4AC759] hover:bg-[#4AC759]/80 text-white py-3.5 rounded-full font-medium transition-all text-[18px] shadow-md shadow-[#25D366]/20"
            >
              تواصل معنا عبر واتساب
              <FaWhatsapp className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// A simple reusable form component
function BookingForm({ widgetTitle }: { widgetTitle: string }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center md:text-right font-semibold text-[#1A1A1A] text-base md:text-[32px]">
        {widgetTitle}
      </p>
      <p className="text-[14px] md:text-[22px] font-medium text-[#767677] text-center md:text-right">
        قم بإدخال بياناتك في النموذج التالي وسيتم التواصل معك من فريق عملنا
        لترتيب الحجز والإجابة على جميع استفساراتك.
      </p>

      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[20px] md:text-[24px] font-medium text-[#000619]">
            الاسم الكامل
          </label>
          <input
            type="text"
            className="w-full bg-card border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[20px] md:text-[24px] font-medium text-[#000619]">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            className="w-full bg-card border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[20px] md:text-[24px] font-medium text-[#000619]">
            رقم الهاتف
          </label>
          <div className="flex text-sm">
            <input
              type="tel"
              dir="ltr"
              className="w-full bg-card border border-primary/10 rounded-r-xl px-4 py-2.5 outline-none focus:border-primary transition-colors text-left"
            />
            <div
              className="bg-gray-50 border border-r-0 border-primary/10 rounded-l-xl px-3 py-2.5 flex items-center text-gray-600 font-bold"
              dir="ltr"
            >
              +966
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[20px] md:text-[24px] font-medium text-[#000619]">
            رسالتك
          </label>
          <textarea
            rows={3}
            className="w-full bg-card border border-primary/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            placeholder="اكتب استفسارك هنا..."
          ></textarea>
        </div>

        <button
          type="button"
          className="cursor-pointer w-full mt-2 bg-primary hover:bg-[#00225d] text-white py-3.5 px-2 rounded-[64px] font-semibold transition-all text-base md:text-[24px]"
        >
          أرسل الطلب
        </button>
      </form>
    </div>
  );
}
