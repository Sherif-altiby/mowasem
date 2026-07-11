import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const ADD_REVIEW_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJ2UKT-vbSTkYRFbrEsC_t73s";

function GoogleLogo() {
  return (
    <div className="p-1 rounded-[8px] md:rounded-[10px] bg-white shrink-0 w-fit">
      <Image
        src="/assets/google.png"
        alt="Google"
        width={22}
        height={22}
        className="object-contain w-4 h-4 md:w-auto md:h-auto"
      />
    </div>
  );
}

export default function AddReviewCard() {
  return (
    <div
      dir="rtl"
      className="
relative overflow-hidden
before:absolute 
before:-right-10 sm:before:-right-20 before:-top-10 sm:before:-top-20
before:w-40 sm:before:w-80 before:h-40 sm:before:h-80
before:pointer-events-none
before:rounded-full
before:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.35),_transparent_65%)]
after:pointer-events-none
after:absolute
after:-left-8 sm:after:-left-16 after:-bottom-10 sm:after:-bottom-20
after:w-32 sm:after:w-64 after:h-32 sm:after:h-64
after:rounded-full
after:bg-[radial-gradient(circle,_rgba(255,255,255,0.15),_transparent_70%)]

w-full bg-primary rounded-[16px] md:rounded-[18px]
px-4 sm:px-5 md:px-8 py-4 sm:py-5 md:py-6
text-white flex flex-col md:flex-row md:items-center
gap-4 md:gap-8
"
    >
      {/* Score */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <span className="font-semibold text-[32px] sm:text-[36px] md:text-[44px] leading-none text-white">
          4.9
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="white" stroke="none" />
            ))}
          </div>
          <GoogleLogo />
        </div>
      </div>

      {/* Divider */}
      <span className="hidden md:block w-px h-12 bg-white/15 shrink-0" />

      {/* Description */}
      <p className="text-[12px] sm:text-[13px] md:text-[15px] leading-[150%] sm:leading-[160%] text-white/85 flex-1">
        تقييم ممتاز استناداً إلى +1,248 مراجعة موثّقة من عملائنا وتجارب سفر
        ناجحة من الحجز وحتى العودة.
      </p>

      {/* CTA Button */}
      <Link
        href={ADD_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 text-center font-medium text-[13px] sm:text-[14px] md:text-[16px] text-primary bg-white rounded-[50px] py-[8px] sm:py-[10px] px-5 sm:px-6 transition-opacity hover:opacity-90 whitespace-nowrap"
      >
        اكتب تقييمك الآن
      </Link>
    </div>
  );
}