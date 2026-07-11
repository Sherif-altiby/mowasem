import React from "react";
import TourSlider from "./TourSlider";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import SectionButton from "../shared/SectionButton";
import { Daum as TourDaum } from "@/types/Data/tours";

type TourImage = {
  isCover?: boolean;
  url?: string;
};

export function getCoverImage(tour: TourDaum): string | null {
  const img = tour?.images?.[0];
  return (
    (typeof img === "string" ? img : img?.url) ||
    tour?.rawViatorData?.images?.find((i: TourImage) => i.isCover)?.url ||
    tour?.rawViatorData?.images?.[0]?.url ||
    tour?.seo?.ogImage ||
    tour?.coverImage?.url ||
    null
  );
}

export default function ToursSection({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle: string;
  data: { tours?: TourDaum[] };
}) {
  const toursWithImages = (data?.tours ?? []).filter(
    (tour: TourDaum) => !!getCoverImage(tour)
  );

  if (toursWithImages.length === 0) return null;

  return (
    <div className="main-page-section container mx-auto !pe-0 md:pe-auto">
      <SectionHeader
        title={title}
        desc={subtitle}
        className="max-w-6xl mx-auto !pe-[25px] md:pe-auto"
      />
      <div className="relative ">
        <TourSlider data={toursWithImages} />
      </div>
      <SectionButton href="/tours" label="اكتشف جميع الرحلات" />
    </div>
  );
}
