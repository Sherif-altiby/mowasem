import { X } from "lucide-react";

interface TourExclusionsProps {
  excludes?: string[];
}

const TourExclusions = ({ excludes = [] }: TourExclusionsProps) => {
  if (!excludes || excludes.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6">
      <h2 className="text-lg md:text-2xl lg:text-[32px] font-bold text-[#1A1A1A] w-full text-right">
        لا تشمل الجولة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 md:gap-x-8 md:gap-y-6 w-full">
        {excludes.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-2 md:gap-4 w-full"
          >
            <div className="w-5 h-5 md:w-6 md:w-8 md:h-8 shrink-0 bg-red-100 rounded-full flex items-center justify-center">
              <X className="w-3 h-3 md:w-4 md:w-5 md:h-5 text-red-600" />
            </div>
            <span className="text-[#1A1A1A] font-medium text-xs md:text-sm lg:text-[18px]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourExclusions;
