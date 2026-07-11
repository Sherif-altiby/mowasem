import Link from "next/link";
import { Star, Quote } from "lucide-react";
import ImageHandleComponent from "@/components/common/ImageHandleComponent/ImageHandleComponent";
import { memo, useMemo } from "react";

interface ReviewCardProps {
  name: string;
  reviewerImage: string;
  rating: number;
  reviewText: string;
  reviewUrl: string;
  reviewTime?: string;
}

const GoogleLogo = memo(function GoogleLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="shrink-0 w-3.5 h-3.5 md:w-[22px] md:h-[22px]"
      aria-label="Google"
    >
      <path fill="#FFC107" d="M43.6 20.08H42V20H24v8h11.3C33.65 32.56 29.19 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.16 7.96 3.04l5.66-5.66C34.18 6.53 29.37 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.4-3.92z" />
      <path fill="#FF3D00" d="M6.3 14.69l6.57 4.82C14.47 16.04 18.96 13 24 13c3.06 0 5.84 1.16 7.96 3.04l5.66-5.66C34.18 6.53 29.37 4 24 4 16.32 4 9.66 8.34 6.3 14.69z" />
      <path fill="#4CAF50" d="M24 44c5.17 0 9.86-1.97 13.4-5.2l-6.19-5.24A11.93 11.93 0 0 1 24 36c-5.17 0-9.61-3.42-11.28-8.16l-6.52 5.02C9.53 39.6 16.23 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.08H42V20H24v8h11.3a12.04 12.04 0 0 1-4.07 5.56l6.19 5.24C36.97 39.24 44 34 44 24c0-1.34-.14-2.65-.4-3.92z" />
    </svg>
  );
});

const ReviewCard = memo(function ReviewCard({
  name,
  reviewerImage,
  rating,
  reviewText,
  reviewUrl,
  reviewTime,
}: ReviewCardProps) {
  const clampedRating = Math.min(5, Math.max(0, Math.round(rating)));

  const stars = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3 h-3 md:w-5 md:h-5"
          fill={i < clampedRating ? "#E8A845" : "#E5E1D8"}
          stroke="none"
        />
      )),
    [clampedRating]
  );

  return (
    <div
      className="
        relative overflow-hidden
        flex flex-col justify-between gap-y-2 md:gap-y-3
        w-[200px] sm:w-[240px] md:w-[480px]
        shrink-0 h-full
        min-h-[170px] sm:min-h-[200px] md:min-h-[322px]
        bg-white border border-[#E5E7EB]
        rounded-2xl md:rounded-[18px]
        p-3 sm:p-3.5 md:p-6
        text-[#1A1A1A] transition-all
      "
      dir="rtl"
    >
      {/* Decorative quote */}
      <Quote
        className="absolute -top-1 -left-1 w-10 h-10 md:w-20 md:h-20 text-primary/[0.05] rotate-180"
        strokeWidth={0}
        fill="currentColor"
      />

      {/* Top: profile + name + stars */}
      <div className="relative flex flex-row items-center gap-2 md:gap-4">
        <div className="relative shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-[54px] md:h-[54px] rounded-full overflow-hidden ring-2 ring-[#E8A845]/30">
          <ImageHandleComponent
            src={reviewerImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 40px, 54px"
            className="object-cover"
            unoptimized
            placeholder="/assets/placeholder-profile.png"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-[11px] sm:text-[13px] md:text-[20px] leading-tight text-right text-[#0B0E14] line-clamp-1">
            {name}
          </span>
          <div className="flex flex-row gap-0.5 md:gap-2">
            {stars}
          </div>
        </div>
      </div>

      {/* Review text */}
      <p className="relative mt-1.5 md:mt-4 font-medium text-[9px] sm:text-[11px] md:text-[14px] leading-[155%] text-right text-[#3C3E42] line-clamp-3 md:line-clamp-6 break-words overflow-hidden">
        {reviewText}
      </p>

      {/* Divider */}
      <span className="block h-px bg-[#ECE7DA]" />

      {/* Bottom: time + Google link */}
      <div className="flex flex-row items-center justify-between">
        <Link
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 md:gap-1.5 transition-opacity hover:opacity-75"
        >
          <GoogleLogo />
          <span className="font-medium text-[9px] sm:text-[11px] md:text-[18px] leading-tight text-right text-[#0B0E14]">
            عرض على <span className="font-normal">Google</span>
          </span>
        </Link>

        {reviewTime && (
          <span
            className="font-medium text-[9px] sm:text-[11px] md:text-[20px] leading-tight text-right text-[#9C9A91]"
            dir="ltr"
          >
            {reviewTime}
          </span>
        )}
      </div>
    </div>
  );
});

export default ReviewCard;