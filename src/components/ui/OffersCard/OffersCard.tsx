import React from "react";
import { HiOutlineCheckBadge, HiSparkles } from "react-icons/hi2";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import { IoFlashSharp } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import CurrancyIcon from "../../common/CurrancyIcon/CurrancyIcon";
import Image from "next/image";
import { Daum } from "@/types/Data/offers";
import Link from "next/link";

interface OffersCardProps {
  data: Daum;
  phone?: string;
}

export default function OffersCard({ data, phone }: OffersCardProps) {
  const mainPhoneNumber = phone || "+966501234567";
  return (
    <Link
      href={`https://wa.me/${mainPhoneNumber}?text=${encodeURIComponent(
        `مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا بخصوص عرض: ${data.name} 🔥`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`تواصل عبر واتساب بخصوص ${data.name}`}
      className="group relative bg-card border border-gray-100 rounded-3xl overflow-hidden h-full w-full shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]"
    >
      {/* Animated Background Glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 blur-xl transform scale-110" />
      </div>

      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700">
          <Image
            src={data?.imageCover || "/assets/CITY.webp"}
            alt={data?.alt || data.name}
             fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={70}
          loading="lazy"
            className="absolute inset-0 object-cover transform group-hover:scale-110 group-hover:brightness-90 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {data.offer && (
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-70" />
              <span className="relative bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                <IoFlashSharp className="w-3 h-3" />
                خصم {data.offer}
              </span>
            </div>
          )}
        </div>

        {/* New Badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <BsStars className="w-3 h-3" />
            جديد
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-br from-gray-50/80 to-white backdrop-blur-sm">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-gray-900 transition-colors duration-300">
            {data.name}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <div className="relative">
              <HiOutlineCheckBadge className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            <span className="font-medium" dangerouslySetInnerHTML={{ __html: data.description }}/>
          </div>
        </div>

        {/* Price and Action Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {data.price && (
              <span className="text-2xl font-bold  transition-colors duration-300 flex items-center gap-1">
                {data.price} <CurrancyIcon color="" />
              </span>
            )}
            {data.oldPrice && data.price !== data.oldPrice && (
              <span className="text-sm text-gray-500 line-through opacity-70 flex items-center gap-1">
                {data.oldPrice} <CurrancyIcon color="" />
              </span>
            )}
          </div>

          {/* Enhanced WhatsApp Button */}
          <div className="relative">
            {/* Pulsing Ring */}
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-75 transition-opacity duration-300" />

            {/* Button */}
            <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-xl">
              <FaWhatsapp className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>

            {/* Action Arrow */}
            <div className="absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
              <FaArrowLeft className="w-3 h-3 text-green-600 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Call to Action Text */}
        <p className="text-xs text-gray-600 text-center bg-green-50 py-2 px-3 rounded-lg border border-green-100">
          <HiSparkles className="inline w-3 h-3 ml-1 text-green-500" />
          اضغط للتواصل عبر واتساب
        </p>
      </div>
    </Link>
  );
}
