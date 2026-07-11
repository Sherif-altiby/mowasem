"use client";

import Link from "next/link";
import Image from "next/image";
import { Send, Target, MessageCircle, Eye } from "lucide-react";
import AnimatedNumber from "@/components/common/AnimatedNum/AnimatedNum";
import linkedinImg from "@/../public/assets/icons/about-linkedin.svg";
import snapchatImg from "@/../public/assets/icons/about-snapchat.svg";
import facebookImg from "@/../public/assets/icons/about-facebook.svg";
import instagramImg from "@/../public/assets/icons/about-instagram.svg";

const socialmedia = [
  { img: linkedinImg, alt: "linkedin", href: "#" },
  { img: snapchatImg, alt: "snapchat", href: "#" },
  { img: facebookImg, alt: "facebook", href: "#" },
  { img: instagramImg, alt: "instagram", href: "#" },
];

const heroData = [
  {
    icon: <Target className="w-6 h-6" />,
    label: "مهمتنا",
    title: "تسهيل السفر لجميع العملاء",
    desc: "خيارات متنوعة وخدمات موثوقة تجعل كل رحلة أكثر راحة ومتعة، بغض النظر عن الوجهة أو الميزانية.",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "رسالتنا",
    title: "خدمات متكاملة بأسعار مناسبة",
    desc: "تجربة حجز بسيطة وشاملة تساعد عملاءنا على التخطيط لرحلاتهم بثقة وسهولة تامة.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    label: "رؤيتنا",
    title: "الخيار الأول للمسافرين",
    desc: "أن نكون المنصة الأولى التي يلجأ إليها المسافرون الباحثون عن تجربة سفر سهلة وموثوقة.",
  },
];

const AboutHero = () => {
  return (
    <section dir="rtl">
      {/* ── HERO ── */}
      <div className="relative min-h-[580px] bg-primary overflow-hidden flex flex-col justify-between pt-40 pb-16">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,.13) 0%, transparent 70%)",
            top: -160,
            right: -120,
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-white text-sm font-medium mb-8">
            ✈ مواسم للسفر والسياحة
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            {/* Title block */}
            <div className="flex-1">
              <h1 className="text-[clamp(42px,6vw,80px)] font-black text-[#E8DFC8] leading-[1.05] tracking-tight mb-6">
                نُرافقك في
                <br />
                <span className="text-white">كل وجهة</span>
                <span className="block font-normal text-[.6em] text-[rgba(232,223,200,.6)] tracking-normal mt-2">
                  من التخطيط حتى الوصول
                </span>
              </h1>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-6">
                {socialmedia.map((s, i) => (
                  <Link
                    href={s.href}
                    key={i}
                    className="hover:scale-110 transition-all duration-300 opacity-70 hover:opacity-100"
                  >
                    <Image src={s.img} alt={s.alt} width={36} height={36} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right block: desc + cta + stats */}
            <div className="flex-1 flex flex-col gap-8">
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md">
                نساعدك في التخطيط لرحلاتك بسهولة — من حجز الطيران والفنادق إلى
                أفضل باقات السفر. خيارات متنوعة، أسعار مناسبة، وتجربة حجز بسيطة
                تبدأ من هنا.
              </p>

              <button className="self-start flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-bold text-base px-7 py-3 rounded-full transition-all duration-200 hover:-translate-y-[1px]">
                <Send size={16} />
                تواصل معنا
              </button>

              {/* Stats */}
              <div className="flex gap-8 border-t border-white/20 pt-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[42px] font-black text-white leading-none">
                    <AnimatedNumber value={"150"} />+
                  </span>
                  <span className="text-[13px] text-white/90">وجهة سفر حول العالم</span>
                </div>
                <div className="flex flex-col gap-1 border-r border-white/15 pr-8">
                  <span className="text-[42px] font-black text-white leading-none">
                    <AnimatedNumber value={"200"} />+
                  </span>
                  <span className="text-[13px] text-white/90">رحلة محجوزة بنجاح</span>
                </div>
                <div className="flex flex-col gap-1 border-r border-white/15 pr-8">
                  <span className="text-[42px] font-black text-white leading-none">
                    <AnimatedNumber value={"98"} />%
                  </span>
                  <span className="text-[13px] text-white/90">رضا العملاء</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MISSION / VISION / MESSAGE ── */}
      <div className="bg-primary/5 dir-rtl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-primary/20 divide-black/10">
          {heroData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 px-8 md:px-10 py-10 md:py-12"
            >
              <div className="w-12 h-12 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <span className="text-[11px] font-bold tracking-[3px] text-primary uppercase">
                {item.label}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-primary leading-snug">
                {item.title}
              </h2>
              <p className="text-sm md:text-base text-[#4A5568] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;