import { Daum } from "@/types/Data/services";
import Image from "next/image";
import React from "react";

export default function ServiceMobileCard({ data }: { data: Daum }) {
  return (
    <div className="cursor-pointer flex flex-col gap-4 items-center ">
      <div className="image relative w-[70px] h-[70px] rounded-full overflow-hidden">
        <Image
          src={data?.imageCover}
          alt={data?.alt || data.name}
          fill
          sizes="100%"
          className="object-cover filter group-hover:drop-shadow-lg transition-all duration-300"
        />
      </div>
      <div>
        <h3 className="text-xs font-bold text-[var(--primary-color)] text-center truncate whitespace-normal">
          {data?.name}
        </h3>
      </div>
    </div>
  );
}
