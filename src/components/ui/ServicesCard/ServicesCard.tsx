import { Daum } from "@/types/Data/services";
import Image from "next/image";
import React from "react";

const ServiceCard = ({ data }: { data: Daum }) => {
  return (
    <div className="cursor-pointer flex flex-col gap-4 items-center ">
      <div className="image relative w-[100px] h-[100px] rounded-full overflow-hidden">
        <Image
          src={data?.imageCover}
          alt=""
          fill
          sizes="100%"
          className="object-cover filter group-hover:drop-shadow-lg transition-all duration-300"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold text-[var(--primary-color)] text-c enter truncate whitespace-break-spaces">
          {data?.name}
        </h3>
      </div>
    </div>
  );
};

export default ServiceCard;
