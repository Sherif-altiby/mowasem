import React from "react";
import HotelContentSection from "./HotelContentSection/HotelContentSection";
import { HotelData } from "@/types/Data/hotelDetails";

export default function HotelDetailsSection({ data }: { data: HotelData }) {
  return (
    <div className="w-full">
      <HotelContentSection data={data} />
    </div>
  );
}
