"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FaHouse, FaHotel, FaPlaneDeparture, FaCity, FaSuitcase, FaMapPin, FaUserTie } from "react-icons/fa6";
import { MdDesignServices } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbSmartHome, TbCompass, TbBriefcase, TbGridDots, TbPlane } from "react-icons/tb";
import Image from "next/image";

/* ── Drawer links ── */
const NavLinks = [
  { title: "الرئيسية", url: "/", icon: <FaHouse /> },
  { title: "الفنادق", url: "/hotels", icon: <FaHotel /> },
  { title: "الطيران", url: "/flights", icon: <FaPlaneDeparture /> },
  { title: "المدن", url: "/cities", icon: <FaCity /> },
  { title: "الباقات", url: "/package-types", icon: <FaSuitcase /> },
  { title: "الجولات", url: "/tours", icon: <FaMapPin /> },
  { title: "الدليل السياحي", url: "/tour-guide", icon: <FaUserTie /> },
  { title: "خدماتنا", url: "/services", icon: <MdDesignServices /> },
  { title: "عروضنا", url: "/offers", icon: <RiDiscountPercentFill /> },
];

/* ── Constants ── */
const ITEM_HEIGHT = 48;
const ITEM_GAP = 8;
const NAV_PT = 16;
const BAR_H = 78;
const NOTCH_W = 160;
const NOTCH_H = 20;
const FAB_SIZE = 61;

 
const COL_CENTERS = [0, 1, 2, 3, 4, 5].map((n) => (n + 0.5) / 6);

type TabKey = "home" | "hotels" | "tours" | "packages" | "flights" | "more";

const TABS: { key: TabKey; href: string | null; Icon: React.ElementType; label: string }[] = [
  { key: "home", href: "/", Icon: TbSmartHome, label: "الرئيسية" },
  { key: "hotels", href: "/hotels", Icon: FaHotel, label: "الفنادق" },
  { key: "tours", href: "/tours", Icon: TbCompass, label: "الجولات" },
  { key: "packages", href: "/package-types", Icon: TbBriefcase, label: "الباقات" },
  { key: "flights", href: "/flights", Icon: TbPlane, label: "الطيران" },
  { key: "more", href: null, Icon: TbGridDots, label: "المزيد" },
];

const TAB_COL: Record<TabKey, number> = {
  home: 0, hotels: 1, tours: 2, packages: 3, flights: 4, more: 5
};
/* ── SVG arch path (120 × 28, lower bell curve) ── */

const ARCH_PATH =
  "M0,20 L18,20 " +
  "C 32,20 38,20 52,10 " +
  "C 60,4  64,0  80,0  " +
  "C 96,0  100,4 108,10 " +
  "C 122,20 128,20 142,20 " +
  "L160,20 Z";
/* ── CSS ── */
const CSS = `
@keyframes _bnav-in {
  0%   { transform: translateY(110%); }
  60%  { transform: translateY(-6px);  }
  80%  { transform: translateY(3px);   }
  100% { transform: translateY(0);     }
}
@keyframes _bnav-fab-drop {
  0%   { opacity:0; transform: translateX(-50%) scale(0) rotate(-160deg); }
  60%  { opacity:1; transform: translateX(-50%) scale(1.14) rotate(10deg); }
  80%  {            transform: translateX(-50%) scale(.93) rotate(-5deg); }
  100% {            transform: translateX(-50%) scale(1) rotate(0deg); }
}
@keyframes _bnav-fab-tap {
  0%   { transform: translateX(-50%) scale(1);   }
  28%  { transform: translateX(-50%) scale(.82); }
  58%  { transform: translateX(-50%) scale(1.1); }
  80%  { transform: translateX(-50%) scale(.97); }
  100% { transform: translateX(-50%) scale(1);   }
}
@keyframes _bnav-float {
  0%,100% { transform: translateX(-50%) translateY(0);    }
  50%     { transform: translateX(-50%) translateY(-5px); }
}
@keyframes _bnav-icon-up {
  0%   { transform: scale(1)    translateY(0);    }
  40%  { transform: scale(1.25) translateY(-6px); }
  70%  { transform: scale(.95)  translateY(-1px); }
  100% { transform: scale(1.1)  translateY(-3px); }
}
@keyframes _bnav-tab-tap {
  0%   { transform: scale(1);   }
  30%  { transform: scale(.82); }
  60%  { transform: scale(1.1); }
  100% { transform: scale(1);   }
}
@keyframes _bnav-dot-in {
  from { opacity:0; transform: scaleX(0); }
  to   { opacity:1; transform: scaleX(1); }
}
@keyframes _bnav-glow {
  0%,100% { box-shadow: 0 6px 20px rgba(10,27,77,.35), 0 0 0 0   rgba(10,27,77,.25); }
  50%     { box-shadow: 0 8px 28px rgba(10,27,77,.45), 0 0 0 10px rgba(10,27,77,0);  }
}
.bnav-bar  { animation: _bnav-in .55s cubic-bezier(.34,1.56,.64,1) both; }
.bnav-notch {
  transition: left .42s cubic-bezier(.34,1.56,.64,1);
  will-change: left;
}
.bnav-fab {
  transition: left .42s cubic-bezier(.34,1.56,.64,1);
  will-change: left;
  animation: _bnav-fab-drop .65s cubic-bezier(.34,1.56,.64,1) .05s both,
             _bnav-float 3s ease-in-out 1s infinite;
}
.bnav-fab-tap {
  animation: _bnav-fab-tap .38s cubic-bezier(.34,1.56,.64,1) both !important;
}
.bnav-fab-glow { animation: _bnav-glow 2s ease-in-out infinite; }
.bnav-tab { transition: transform .18s cubic-bezier(.34,1.56,.64,1); }
.bnav-tab:active { animation: _bnav-tab-tap .3s cubic-bezier(.34,1.56,.64,1) both; }
.bnav-icon-active { animation: _bnav-icon-up .4s cubic-bezier(.34,1.56,.64,1) forwards; }
`;

/* ── Component ── */
export default function BottomNav({
  variant = "all",
  phone,
}: {
  variant?: "top" | "bottom" | "all";
  phone?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  const [fabTap, setFabTap] = useState(false);
  const [notchX, setNotchX] = useState<number | null>(null);
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  const activeTab: TabKey =
    pathname === "/" ? "home"
      : isActive("/hotels") ? "hotels"
        : isActive("/tours") ? "tours"
          : isActive("/package-types") ? "packages"
            : isActive("/flights") ? "flights"
              : "more";

  /* compute notch X from barRef */
  const computeX = useCallback(() => {
    if (!barRef.current) return;
    const w = barRef.current.getBoundingClientRect().width;
    const isRtl = window.getComputedStyle(barRef.current).direction === "rtl";
    const center = COL_CENTERS[TAB_COL[activeTab]];
    setNotchX((isRtl ? 1 - center : center) * w);
  }, [activeTab]);

  useEffect(() => { computeX(); }, [computeX]);
  useEffect(() => {
    const ro = new ResizeObserver(computeX);
    if (barRef.current) ro.observe(barRef.current);
    return () => ro.disconnect();
  }, [computeX]);

  const handleTap = () => {
    setFabTap(false);
    requestAnimationFrame(() => setFabTap(true));
    setTimeout(() => setFabTap(false), 420);
  };

  /* drawer sliding indicator */
  const navActiveIdx = NavLinks.findIndex(l =>
    l.url === "/" ? pathname === "/" : isActive(l.url)
  );
  const indIdx = hovIdx !== null ? hovIdx : navActiveIdx;
  const slideY = indIdx !== -1 ? indIdx * (ITEM_HEIGHT + ITEM_GAP) : 0;

  const ActiveIcon = TABS.find(t => t.key === activeTab)?.Icon ?? TbSmartHome;

  /* ── Drawer ── */
  const drawer = (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[75vw] z-[9999] transition-all duration-300 ease-out ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        style={{ background: "rgba(255,255,255,.98)", backdropFilter: "blur(24px)" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-[#0a1b4d]">القائمة</span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" aria-label="إغلاق القائمة">
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <nav
          className="relative flex flex-col gap-2 p-4 overflow-y-auto pb-28"
          style={{ height: "calc(100vh - 73px)" }}
          onMouseLeave={() => setHovIdx(null)}
        >
          {indIdx !== -1 && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: NAV_PT, right: 16, left: 16,
                height: ITEM_HEIGHT, borderRadius: 12,
                pointerEvents: "none", willChange: "transform, background-color",
                transform: `translateY(${slideY}px)`,
                transition:
                  hovIdx !== null
                    ? "transform 320ms cubic-bezier(.34,1.56,.64,1), background-color 180ms ease"
                    : "transform 280ms cubic-bezier(.25,.46,.45,.94), background-color 200ms ease",
                backgroundColor: hovIdx !== null ? "rgba(10,27,77,.07)" : "#1c1c2e",
              }}
            />
          )}
          {NavLinks.map((link, idx) => {
            const active = link.url === "/" ? pathname === "/" : isActive(link.url);
            const isHov = hovIdx === idx;
            return (
              <Link
                key={idx}
                href={link.url}
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setHovIdx(idx)}
                className="relative flex items-center gap-4 px-4 rounded-xl font-medium z-10"
                style={{
                  height: ITEM_HEIGHT,
                  color: active && hovIdx === null ? "white" : isHov ? "#1c1c2e" : "#6B7280",
                  transition: "color 200ms ease",
                }}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="flex-1 text-right">{link.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );

  return (
    <>
      {/* WhatsApp */}
      {(variant === "top" || variant === "all") && (
        <Link
          href={`https://wa.me/${phone}?text=${encodeURIComponent(
            "مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا، كيف يمكننا مساعدتك؟"
          )}`}
          target="_blank" rel="noopener noreferrer"
          aria-label="تواصل مع الدعم الفني على واتساب"
          className="group whats rounded-[87px] border border-white flex lg:hidden gap-2 items-center transition-all duration-500 hover:border-white/50 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer p-2 backdrop-blur-md hover:scale-105 transform px-3 py-1.5"
        >
          <Image src="/assets/Whatsapp.svg" alt="whatsapp" width={32} height={32} className="w-4 h-4" />
          <span className="text-xs font-semibold text-white group-hover:text-emerald-100 transition-colors whitespace-nowrap">
            تواصل واتساب
          </span>
        </Link>
      )}

      {/* ── Bottom Navigation Bar ── */}
      {(variant === "bottom" || variant === "all") && (
        <>
          <style dangerouslySetInnerHTML={{ __html: CSS }} />

          <div
            ref={barRef}
            // dir="ltr"
            className="bnav-bar  fixed bottom-0 left-0 right-0 z-[40] max-w-[500px] mx-auto rounded-3xl"
            style={{ overflow: "visible" }}
          >
            {/* ── Sliding arch SVG ── */}
            {notchX !== null && (
              <svg
                aria-hidden
                className="bnav-notch pointer-events-none absolute text-[#e8eaee]"

                style={{
                  bottom: BAR_H - 2,
                  left: notchX,
                  transform: "translateX(-50%)",
                  width: NOTCH_W,
                  height: NOTCH_H,
                  zIndex: 1,
                  overflow: "visible",
                }}
                viewBox={`0 0 ${NOTCH_W} ${NOTCH_H}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={ARCH_PATH} fill="#e8eaee" />
              </svg>
            )}

            {/* ── Sliding FAB ── */}
            {notchX !== null && (
              <div
                className={`bnav-fab bnav-fab-glow absolute ${fabTap ? "bnav-fab-tap" : ""}`}
                style={{
                  // bottom: BAR_H - 2 + NOTCH_H - 4 - FAB_SIZE / 2,
                  left: notchX,
                  top: 4,
                  width: FAB_SIZE,
                  height: FAB_SIZE,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0a1b4d 0%, #1a3a8f 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "translateX(-50%)",
                  zIndex: 3,
                  cursor: "pointer",
                }}
                role="button"
                aria-label={TABS.find(t => t.key === activeTab)?.label || "القائمة"}
                onClick={() => {
                  if (activeTab === "more") setIsOpen(true);
                  handleTap();
                }}
              >
                <ActiveIcon style={{ width: 30, height: 30, color: "white" }} />
              </div>
            )}

            {/* ── Dark bar ── */}
            <div
              style={{
                background: "#e8eaee",
                borderRadius: "5px 5px 0 0",
                height: BAR_H,
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="flex items-center h-full">
                {TABS.map((tab, i) => {
                  const isAct = activeTab === tab.key;

                  const handleClick =
                    tab.key === "more"
                      ? (e: React.MouseEvent) => { e.preventDefault(); setIsOpen(true); handleTap(); }
                      : handleTap;

                  return (
                    <Link
                      key={tab.key}
                      href={tab.href ?? "#"}
                      onClick={handleClick}
                      className="bnav-tab flex-1 flex flex-col items-center justify-center h-full gap-2"
                      aria-label={tab.label}
                      style={{ animationDelay: `${i * 55}ms` }}
                    >
                      <tab.Icon
                        // className={isAct ? "bnav-icon-active" : ""}
                        style={{
                          width: 28, height: 28,
                          color: "#0a1b4d",
                          // opacity: isAct ? 0 : 1,
                          transition: "color .2s ease",
                        }}
                      />
                      <span className={`text-[13px] font-medium transition-all duration-200 text-[#0a1b4d] ${isAct ? "opacity-0" : "opacity-100"}`}>{tab.label}</span>
                    </Link>
                  );
                })}
              </div>
              <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
            </div>
          </div>
        </>
      )}

      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
