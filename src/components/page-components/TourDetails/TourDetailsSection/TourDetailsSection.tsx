import DetailsContactSection from "@/components/common/DetailsContactSection/DetailsContactSection";
import React from "react";
import TourContentSection from "./TourContentSection/TourContentSection";
import { Data } from "@/types/Data/tourDetails";

export default function TourDetailsSection({data}:{data: Data}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
      {/* المحتوى الرئيسي */}
      <TourContentSection data={data} />
      {/* الشريط الجانبي للتواصل */}
      <DetailsContactSection />
    </div>
  );
}

