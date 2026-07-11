
import dynamic from "next/dynamic";
import LazySection from "./LazySection";
import type { Service } from "../page-components/Home/ServiceSection/ServiceCard";
import type { ToursGuide } from "@/types/Data/toursGuide";

// ─── Lazy Imports ────────────────────────────────────────────────────────────

const ServiceSection  = dynamic(() => import("@/components/page-components/Home/ServiceSection/ServiceSection"));
const TourGuideSection = dynamic(() => import("@/components/page-components/Home/TourGuideSection/TourGuidesSection"));
const HotelSection    = dynamic(() => import("@/components/page-components/Home/HotelSection/HotelSection"));
const ToursSection    = dynamic(() => import("@/components/page-components/Home/TourSection/ToursSection"));
const BlogSection     = dynamic(() => import("@/components/page-components/Home/BlogSection/BlogSection"));
const ReviewSection   = dynamic(() => import("@/components/page-components/Home/ReviewSection/ReviewSection"));

// ─── Skeleton Imports ─────────────────────────────────────────────────────────

const HotelSectionSkeleton = dynamic(() => import("@/components/page-components/Home/HotelSection/HotelSectionSkeleton"));
const ToursSectionSkeleton = dynamic(() => import("@/components/page-components/Home/TourSection/ToursSectionSkeleton"));
const BlogSectionSkeleton = dynamic(() => import("@/components/page-components/Home/BlogSection/BlogSectionSkeleton"));
const ReviewSectionSkeleton = dynamic(() => import("@/components/page-components/Home/ReviewSection/ReviewSectionSkeleton"));

// ─── Types ───────────────────────────────────────────────────────────────────

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

// ─── Shared Skeleton ─────────────────────────────────────────────────────────

const SectionSkeleton = ({ height = "min-h-[80vh]" }: { height?: string }) => (
  <div className={`${height} w-full animate-pulse bg-gray-100 rounded-3xl mb-8`} />
);

// ─── Shared Wrapper ──────────────────────────────────────────────────────────

const LAZY_CONFIG = { rootMargin: "200px", threshold: 0.1 } as const;

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <LazySection fallback={<SectionSkeleton />} {...LAZY_CONFIG}>
    {children}
  </LazySection>
);

// ─── Section Loaders ─────────────────────────────────────────────────────────

export const ServiceLoader = ({ services }: { services: Service[] }) => (
  <ServiceSection services={services} />
);

export const TourGuideLoader = ({ data }: { data?: ToursGuide }) =>
  data ? (
    <Lazy>
      <TourGuideSection data={data} />
    </Lazy>
  ) : null;

export const HotelLoader = ({ title, subtitle, data }: SectionHeadingProps) => (
  <LazySection fallback={<HotelSectionSkeleton />} {...LAZY_CONFIG}>
    <HotelSection title={title} subtitle={subtitle} data={data} />
  </LazySection>
);

export const ToursLoader = ({ title, subtitle, data }: SectionHeadingProps) => (
  <LazySection fallback={<ToursSectionSkeleton />} {...LAZY_CONFIG}>
    <ToursSection title={title} subtitle={subtitle} data={data} />
  </LazySection>
);

export const BlogLoader = ({ title, subtitle, data }: SectionHeadingProps) => (
  <LazySection fallback={<BlogSectionSkeleton />} {...LAZY_CONFIG}>
    <BlogSection title={title} subtitle={subtitle} data={data} />
  </LazySection>
);

export const ReviewLoader = ({ title, subtitle }: SectionHeadingProps) => (
  <LazySection fallback={<ReviewSectionSkeleton />} {...LAZY_CONFIG}>
    <ReviewSection title={title} subtitle={subtitle} />
  </LazySection>
);
