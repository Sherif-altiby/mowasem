"use client";

import Links from "./Links";
import MobileLinks from "./BottomNav";
import { PiWhatsappLogo } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ phone }: { phone: string }) {
  const pathname = usePathname();
  const home = pathname === "/";
  if (home) return null;

  return (
    <nav className="relative z-50 mx-auto  container px-4 lg:px-6 pt-4">
      <div
        className="
          relative flex items-center justify-between
          px-4 lg:px-6 py-3
          bg-primary
          border border-white/[0.07]
          rounded-2xl
          shadow-[0_2px_40px_rgba(0,0,0,0.45)]
          backdrop-blur-xl
        "
      >
        {/* subtle top-edge glow line */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full
                     bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Logo */}
        <Link
          href={"/"}
          className="text-white font-bold text-lg lg:text-xl   xl:text-2xl  2xl:text-3xl whitespace-nowrap"
        >
          مواسم
        </Link>

        {/* Mobile nav */}
        <MobileLinks variant="top" phone={phone} />

        {/* Desktop nav links */}
        <Links type="other" />

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(
            "مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا، كيف يمكننا مساعدتك؟"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل مع الدعم عبر واتساب"
          className="
            group hidden lg:flex items-center gap-2.5
            px-3.5 py-2 rounded-xl
            bg-white/[0.05] border border-white/10
            hover:bg-emerald-500/10 hover:border-emerald-500/30
            transition-all duration-300
          "
        >
          <div className="flex flex-col items-end leading-none gap-0.5">
            <span className="text-[11px] font-medium text-white/60 group-hover:text-emerald-300 transition-colors duration-300">
              الدعم الفني
            </span>
            <span dir="ltr" className="text-[12px] font-mono text-white/85">
              {phone}
            </span>
          </div>

          <div className="relative flex-shrink-0">
            <PiWhatsappLogo className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
            {/* live indicator dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0a0a0a]" />
          </div>
        </a>
      </div>
    </nav>
  );
}