import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloatingButton({ phone }: { phone: string }) {
  return (
    <div className="fixed bottom-24 right-5 lg:bottom-9 lg:right-9 z-[60]">
      <div className="relative flex items-center justify-center">
        <span className="absolute inline-flex h-10 w-10 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-green-700 via-green-600 to-green-400 opacity-75 animate-ping"></span>

        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(
            "مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا، كيف يمكننا مساعدتك؟"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="relative flex items-center justify-center h-10 w-10 md:h-14 md:w-14  rounded-full bg-gradient-to-br from-green-700 via-green-600 to-green-400 text-white shadow-lg transition"
        >
          <FaWhatsapp className=" h-7 w-7 md:h-8 md:w-8 " />
        </a>
      </div>
    </div>
  );
}
