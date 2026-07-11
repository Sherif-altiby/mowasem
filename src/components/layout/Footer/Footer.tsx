"use client";

import { useEffect, useRef, useState } from "react";
import { GlobalSettings } from "@/types/Data/globalSettings";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn,
  FaSnapchatGhost,
  FaWhatsapp,
} from "react-icons/fa";

const quickLinks = [
  { title: "الرئيسية", url: "/" },
  { title: "الفنادق", url: "/hotels" },
  { title: "الطيران", url: "/flights" },
  { title: "الدليل السياحي", url: "/tour-guide" },
  { title: "الباقات", url: "/package-types" },
  { title: "الجولات", url: "/tours" },
  { title: "الخدمات", url: "/services" },
  { title: "نبذه عنا", url: "/about" },
  { title: "المدونة", url: "/blogs" },
];

const legalLinks = [
  { title: "سياسة الخصوصية", url: "/privacy" },
  { title: "الشروط والأحكام", url: "/terms" },
];

const supportLinks = [
  { title: "مركز المساعدة", url: "/help" },
  { title: "الأسئلة الشائعة", url: "/FAQ" },
  { title: "دعم الحجز", url: "/booking-support" },
];

const legalInfo = [
  { label: "التسجيل التجاري", value: "1009027313" },
  { label: "رقم رخصة السياحة", value: "73105016" },
  { label: "فئة", value: "وكيل سفر وسياحة ومنظم رحلات سياحية" },
  { label: "سلطة الإصدار", value: "وزارة الاقتصاد - قطاع السياحة (المملكة العربية السعودية)" },
];

const paymentMethods = [
  { src: "/assets/payments/payment6.svg", alt: "mastercard" },
  { src: "/assets/payments/payment5.svg", alt: "applepay" },
  { src: "/assets/payments/payment4.svg", alt: "visa" },
  { src: "/assets/payments/payment3.svg", alt: "Alahly bank" },
  { src: "/assets/payments/payment2.svg", alt: "payment2" },
  { src: "/assets/payments/payment1.svg", alt: "payment1" },
];

const socialIcons: Record<string, React.ReactNode> = {
  whatsApp: <FaWhatsapp />,
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  twitter: <FaTwitter />,
  tiktok: <FaTiktok />,
  snapchat: <FaSnapchatGhost />,
  linkedin: <FaLinkedinIn />,
};

// ─── Dots Pattern ─────────────────────────────────────────────────────────────

function DotsPattern({ className, color = "rgba(255,255,255,0.12)", size = 3, gap = 20 }: {
  className?: string; color?: string; size?: number; gap?: number;
}) {
  const id = `dots-${color?.replace(/[^a-z0-9]/gi, "")}-${gap}-${size}`;
  return (
    <svg className={`pointer-events-none absolute ${className}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id={id} x="0" y="0" width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={size} cy={size} r={size / 2} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Corner Bracket ───────────────────────────────────────────────────────────

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const styles: Record<string, string> = {
    tl: "top-3 left-3 rotate-0",
    tr: "top-3 right-3 rotate-90",
    bl: "bottom-3 left-3 -rotate-90",
    br: "bottom-3 right-3 rotate-180",
  };
  return (
    <svg className={`pointer-events-none absolute w-5 h-5 opacity-25 ${styles[position]}`}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 12V3h9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Contact Bar ─────────────────────────────────────────────────────────────

function ContactBar({ phone, email, address }: { phone: string; email: string; address: string }) {
  const cards = [
    { icon: "/assets/Hotline-footer.svg",    title: "الدعم وخدمة العملاء", value: email,   href: `mailto:${email}` },
    { icon: "/assets/headphone-footer.svg",  title: "فريق الدعم",          value: phone,   href: `tel:${phone}` },
    { icon: "/assets/PlaceMarker-footer.svg",title: "تفضل بزيارة مكتبنا", value: address, href: "/branches" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 lg:gap-8">
      <div className="shrink-0">
        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-medium">خدمة العملاء</p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">تحتاج مساعدة؟</h2>
        <p className="text-white/50 text-xs sm:text-sm mt-1.5 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          فريقنا متواجد لخدمتكم 7/24
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full lg:w-auto">
        {cards.map((card, i) => (
          <Link key={i} href={card.href} dir="rtl"
            className="group relative flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_70%)]" />
            <div className="shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors duration-200">
              <Image src={card.icon} alt={card.title} width={20} height={20} className="object-contain w-5 h-5 sm:w-6 sm:h-6" loading="lazy" />
            </div>
            <div className="min-w-0 relative z-10">
              <p className="text-white font-semibold text-xs sm:text-sm leading-snug">{card.title}</p>
              <p className="text-white/50 text-[10px] sm:text-xs mt-0.5 truncate group-hover:text-white/70 transition-colors duration-200">{card.value}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Payment Methods ──────────────────────────────────────────────────────────

function PaymentMethods() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
      {isVisible
        ? paymentMethods.map((p, i) => (
            <Image key={i} src={p.src} alt={p.alt} width={36} height={36}
              className="object-contain w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 hover:scale-110 transition-transform duration-200" loading="lazy" />
          ))
        : paymentMethods.map((_, i) => (
            <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gray-200 rounded animate-pulse" />
          ))}
    </div>
  );
}

// ─── Social Icons ─────────────────────────────────────────────────────────────

function SocialRow({ socialMediaData }: { socialMediaData?: Record<string, { name: string; url: string }> }) {
  const links = socialMediaData
    ? Object.entries(socialMediaData).filter(([, d]) => d?.url).map(([key, d]) => ({
        key, title: d.name, url: d.url,
        icon: socialIcons[key] || socialIcons[key.toLowerCase()] || <FaFacebookF />,
      }))
    : [];

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
      {links.map((s, i) => (
        <Link key={i} href={s.url ?? "#"} target="_blank" rel="noopener noreferrer"
          aria-label={s.title || "Social media link"}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm bg-primary/10 border border-primary/40 text-primary-500 hover:bg-primary  hover:border-primary  hover:text-white transition-all duration-300 hover:-translate-y-0.5"
        >
          {s.icon}
        </Link>
      ))}
    </div>
  );
}

// ─── Links Column (desktop) ───────────────────────────────────────────────────

function LinksColumn({ title, links }: { title: string; links: { title: string; url: string }[] }) {
  return (
    <div>
      <h3 className="text-primary font-bold text-sm sm:text-md uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
        <span className="w-1 h-3.5 sm:h-4 rounded-full bg-primary inline-block" />
        {title}
      </h3>
      <ul className="flex flex-col gap-2 sm:gap-2.5">
        {links.map((link, i) => (
          <li key={i}>
            <Link href={link.url}
              className="text-gray-500 text-xs sm:text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group">
              <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-200 block" />
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Accordion Links (mobile) ─────────────────────────────────────────────────

function AccordionLinks({ title, links }: { title: string; links: { title: string; url: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between py-3 text-primary font-bold text-sm"
        aria-expanded={open}
      >
        <span>{title}</span>
        <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul className="pb-3 flex flex-col gap-2.5 pr-2">
          {links.map((link, i) => (
            <li key={i}>
              <Link href={link.url} className="text-gray-500 text-sm hover:text-primary transition-colors duration-200">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── SSL Badge ────────────────────────────────────────────────────────────────

function SSLBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? "flex items-center gap-2 p-3 rounded-xl" : "flex flex-col gap-2 p-4 rounded-2xl"} bg-white border border-gray-200 shadow-sm`}>
      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <div>
        <p className="text-gray-800 text-xs font-semibold">دفع آمن ومشفر</p>
        {!compact && <p className="text-gray-400 text-xs leading-relaxed mt-0.5">جميع المعاملات محمية بأعلى معايير التشفير SSL</p>}
        {compact && <p className="text-gray-400 text-[10px]">محمية بمعايير التشفير SSL</p>}
      </div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer({ settings }: { settings: GlobalSettings }) {
  const mainPhone = settings?.data?.contactInfo?.phones?.[0];
  const phoneStr  = mainPhone ? `${mainPhone.countryCode}${mainPhone.number}` : "+966543349495";
  const mainEmail = settings?.data?.contactInfo?.emails?.[0]?.email ?? "info@zahabweawdeh.com";
  const mainAddress = (settings?.data?.contactInfo?.addresses?.[0] as string) ?? "المملكة العربية السعودية";
  const socialMediaData = settings?.data?.socialMedia as unknown as Record<string, { name: string; url: string }> | undefined;

const dotCorners = [
  {
    pos: "top-0 left-0",
    grad: "bg-[radial-gradient(circle_at_top_left,transparent_60%,#F9FAFB_100%)]"
  },
  {
    pos: "top-0 right-0",
    grad: "bg-[radial-gradient(circle_at_top_right,transparent_60%,#F9FAFB_100%)]"
  },
  {
    pos: "bottom-0 left-0",
    grad: "bg-[radial-gradient(circle_at_bottom_left,transparent_60%,#F9FAFB_100%)]"
  },
  {
    pos: "bottom-0 right-0",
    grad: "bg-[radial-gradient(circle_at_bottom_right,transparent_60%,#F9FAFB_100%)]"
  },
];

  return (
    <footer className="overflow-hidden" dir="rtl">

      {/* ══════════════════ DARK ══════════════════ */}
      <div className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(160deg,#050505 0%,#1a0505 45%,#320101 100%)" }}
      >
        <div className="absolute top-0 right-0 w-36 sm:w-48 h-36 sm:h-48 overflow-hidden">
          <DotsPattern color="rgba(255,255,255,0.10)" gap={18} size={2.5} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,transparent_30%,#1a0505_80%)]" />
        </div>
        <div className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 overflow-hidden">
          <DotsPattern color="rgba(255,255,255,0.10)" gap={18} size={2.5} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,transparent_30%,#1a0505_80%)]" />
        </div>
        <div className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="text-white absolute inset-0 pointer-events-none">
          <CornerBracket position="tl" /><CornerBracket position="tr" />
          <CornerBracket position="bl" /><CornerBracket position="br" />
        </div>
        <div className="py-8 sm:py-10 relative z-10">
          <ContactBar phone={phoneStr} email={mainEmail} address={mainAddress} />
        </div>
      </div>

      {/* ══════════════════ LIGHT ══════════════════ */}
      <div className="bg-gray-50 border-t border-gray-200 relative overflow-hidden">

        {/* Dots corners */}
        {dotCorners.map(({ pos, grad }, i) => (
          <div key={i} className={`absolute ${pos} w-40 sm:w-56 h-40 sm:h-56 overflow-hidden pointer-events-none`}>
            <DotsPattern color="rgba(27, 27, 27, 0.22)" gap={20} size={2.5} />
            <div className={`absolute inset-0 ${grad}`} />
          </div>
        ))}

        {/* ── DESKTOP (md+) ── */}
        <div className="hidden md:block container mx-auto px-4 sm:px-6 py-12 md:py-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
            <div className="flex flex-col gap-5 col-span-2 lg:col-span-1">
              <Link href="/" className="block group w-fit">
                <div className="relative w-[100px] h-[82px] md:w-[110px] md:h-[90px]">
                  <Image src="/assets/footer-logo.webp" alt="مواسم" fill loading="lazy"
                    className="object-contain transition-transform duration-300 group-hover:scale-105" />
                </div>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                نقدم لكم أفضل تجارب السفر والسياحة بكل سهولة واحترافية، من الفنادق والرحلات إلى الباقات الشاملة.
              </p>
              <div className="w-10 h-px bg-gray-300" />
              <SocialRow socialMediaData={socialMediaData} />
            </div>
            <LinksColumn title="روابط سريعة" links={quickLinks} />
            <LinksColumn title="الدعم" links={supportLinks} />
            <div className="flex flex-col gap-6">
              <LinksColumn title="قانوني" links={legalLinks} />
              <SSLBadge />
            </div>
          </div>
        </div>

        {/* ── MOBILE (< md) ── */}
        <div className="md:hidden relative z-10">
          {/* Brand + social */}
          <div className="px-4 pt-7 pb-4 flex items-center justify-between border-b border-gray-200">
            <Link href="/" className="block group">
              <div className="relative w-[76px] h-[62px]">
                <Image src="/assets/footer-logo.webp" alt="مواسم" fill loading="lazy"
                  className="object-contain transition-transform duration-300 group-hover:scale-105" />
              </div>
            </Link>
            <SocialRow socialMediaData={socialMediaData} />
          </div>
          {/* Description */}
          <p className="px-4 py-4 text-gray-500 text-xs leading-relaxed border-b border-gray-200">
            نقدم لكم أفضل تجارب السفر والسياحة بكل سهولة واحترافية، من الفنادق والرحلات إلى الباقات الشاملة.
          </p>
          {/* Accordions */}
          <div className="px-4">
            <AccordionLinks title="روابط سريعة" links={quickLinks} />
            <AccordionLinks title="الدعم" links={supportLinks} />
            <AccordionLinks title="قانوني" links={legalLinks} />
          </div>
          {/* SSL */}
          <div className="mx-4 my-4"><SSLBadge compact /></div>
        </div>

        {/* Divider */}
        <div className="container mx-auto px-4 sm:px-6"><div className="h-px bg-gray-200" /></div>

        {/* Legal Info */}
        <div className="bg-white relative z-10">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 text-center">
              {legalInfo.map((item, i) => (
                <div key={i} className="flex flex-col gap-0.5 sm:gap-1">
                  <p className="text-gray-400 text-[10px] sm:text-xs font-medium">{item.label}</p>
                  <p className="text-primary text-[10px] sm:text-xs md:text-sm font-bold leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="container mx-auto px-4 sm:px-6"><div className="h-px bg-gray-200" /></div>

        {/* Bottom Bar */}
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 pb-5 sm:pb-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-gray-400 text-[10px] sm:text-xs text-center sm:text-right order-2 sm:order-1">
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} مواسم.
            </p>
            <span className="inline-flex items-center gap-1.5 text-gray-400 text-[10px] sm:text-xs order-3 sm:order-2">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              موثق ومرخص رسمياً
            </span>
            <div className="order-1 sm:order-3"><PaymentMethods /></div>
          </div>
        </div>

      </div>
    </footer>
  );
}