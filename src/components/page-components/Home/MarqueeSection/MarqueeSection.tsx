"use client";

import { useEffect, useRef, Fragment } from "react";
import { gsap } from "gsap";

const SEPARATOR = "✦";

const row1Items = [
    "مكة المكرمة",
    "دبي",
    "إسطنبول",
    "كوالالمبور",
    "مراكش",
    "عمّان",
    "بالي",
    "الدوحة",
    "جدة",
    "الرياض",
];

const row2Items = [
    "وجهات مميزة",
    "سياحة فاخرة",
    "تجارب لا تُنسى",
    "رحلات حلال",
    "أفضل الأسعار",
    "احجز الآن",
    "اكتشف العالم",
    "سفر آمن",
];

function withSeparators(items: string[], id: string) {
    return items.flatMap((item, i) => [
        <span
            key={`${id}-item-${i}`}
            className="whitespace-nowrap shrink-0 font-semibold"
        >
            {item}
        </span>,

        <span
            key={`${id}-sep-${i}`}
            aria-hidden
            className="opacity-40 text-xl shrink-0 animate-pulse"
            style={{
                animation: 'glow 2s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`
            }}
        >
            {SEPARATOR}
        </span>,
    ]);
}

interface MarqueeProps {
    items: React.ReactNode[];
    direction: "ltr" | "rtl";
    speed: number;
    bgColor: string;
    textColor: string;
}

function Marquee({
    items,
    direction,
    speed,
    bgColor,
    textColor,
}: MarqueeProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const init = () => {
            const singleSetWidth = track.scrollWidth / 3;

            tweenRef.current?.kill();

            tweenRef.current = gsap.fromTo(
                track,
                {
                    x: direction === "ltr" ? -singleSetWidth : 0,
                },
                {
                    x: direction === "ltr" ? 0 : -singleSetWidth,
                    duration: singleSetWidth / speed,
                    ease: "none",
                    repeat: -1,
                }
            );
        };

        const raf = requestAnimationFrame(init);

        return () => {
            cancelAnimationFrame(raf);
            tweenRef.current?.kill();
        };
    }, [direction, speed]);

    const repeatedItems = [...items, ...items, ...items];

    return (
        <div
            className="overflow-hidden py-4 border border-black-500"
            style={{ backgroundColor: bgColor }}
            onMouseEnter={() => tweenRef.current?.pause()}
            onMouseLeave={() => tweenRef.current?.resume()}
        >
            <div
                ref={trackRef}
                className="flex items-center gap-10 whitespace-nowrap will-change-transform"
                style={{ color: textColor }}
            >
                {repeatedItems.map((item, index) => (
                    <Fragment key={index}>{item}</Fragment>
                ))}
            </div>
        </div>
    );
}

export default function MarqueeSection() {
    const band1 = withSeparators(row1Items, "b1");
    const band2 = withSeparators(row2Items, "b2");

    return (
        <>
            <style jsx>{`
                @keyframes glow {
                    0%, 100% {
                        opacity: 0.4;
                        transform: scale(1);
                        filter: brightness(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.2);
                        filter: brightness(1.5) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
                    }
                }
            `}</style>
            <section className="space-y-4">
            <Marquee
                items={band1}
                direction="ltr"
                speed={130}
                bgColor="#0907010d"
                textColor="#010209"
            />

            <Marquee
                items={band2}
                direction="rtl"
                speed={110}
                bgColor="#010209"
                textColor="#ffffff"
            />
        </section>
        </>
    );
}
