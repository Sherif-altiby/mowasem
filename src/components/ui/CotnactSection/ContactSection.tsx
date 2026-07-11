"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ContactSectionProps {
  className?: string;
  phone?: string;
}

const ContactSection = ({ className, phone }: ContactSectionProps) => {
  const mainPhone = phone || "+966501234567";
  return (
    <section
      className={`relative text-center container isolate mx-auto w-full bg-primary flex flex-col items-center justify-center gap-6 p-12 rounded-[24px] ${className}`}
    >
      <h2 className="text-white text-xl md:text-[32px] font-semibold">
        تواصل معنا بسهولة
      </h2>
      <p className="text-white text-base md:text-xl">
        نحن هنا لمساعدتك في أي استفسار عن رحلاتك أو حجوزاتك. تواصل معنا وسيسعد
        فريقنا بالرد عليك في أسرع وقت.
      </p>
      <Link
        href={`https://wa.me/${mainPhone}?text=${encodeURIComponent(
          "مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا، كيف يمكننا مساعدتك؟"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="
          group relative cursor-pointer mt-8 overflow-hidden
          bg-card text-primary
          hover:bg-transparent hover:text-white
          rounded-2xl px-8 py-3 font-medium text-xl
          flex items-center justify-center gap-3
          w-[220px] h-[56px]
          transition-colors duration-400
          "
      >
        <Phone
          className="
    w-5 h-5 group-hover:scale-120 shrink-0
    transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
    group-hover:-translate-x-[50px]
  "
        />
        <span
          className="
    whitespace-nowrap
    transition-[opacity,transform] duration-250 ease-in-out
    group-hover:opacity-0
  "
        >
          تواصل معنا
        </span>
      </Link>

      <Image
        src="/assets/services-vector.svg"
        alt="vector image"
        width={100}
        height={100}
        className="absolute inset-0 w-full h-full object-cover -z-100"
      />
    </section>
  );
};

export default ContactSection;
