import React from "react";
import TourGuideContentSection from "./TourGuideContentSection/TourGuideContentSection";
import DetailsContactSection from "@/components/common/DetailsContactSection/DetailsContactSection";
import { Data } from "@/types/Data/tourGuideDetails";

export default function TourGuideDetailsSection({ data }:{data: Data}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
      {/* المحتوى الرئيسي */}
      <TourGuideContentSection data={data} />
      {/* الشريط الجانبي للتواصل */}
      <DetailsContactSection />
    </div>
  );
}
