import Image from "next/image";

interface TourInclusionsProps {
  includes?: string[];
}

const TourInclusions = ({ includes = [] }: TourInclusionsProps) => {
  if (!includes || includes.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6">
      <h2 className="text-lg md:text-2xl lg:text-[32px] font-bold text-[#1A1A1A] w-full text-right">
        تشمل الجولة
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 md:gap-x-8 md:gap-y-6 w-full">
        {includes.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-2 md:gap-4 w-full"
          >
            <Image
              src="/assets/icons/tour-checkmark.svg"
              alt="check"
              width={48}
              height={48}
              className="w-5 h-5 md:w-6 md:w-8 md:h-8 shrink-0"
            />
            <span className="text-[#1A1A1A] font-medium text-xs md:text-sm lg:text-[18px]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourInclusions;
