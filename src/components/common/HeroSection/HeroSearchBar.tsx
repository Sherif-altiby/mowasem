import { Search, MapPin, Calendar, Clock, Users } from "lucide-react";
import HeroInput from "./HeroInput";
import Link from "next/link";

function ExploreButton({ className }: { className?: string }) {
  return (
    <Link
      href={"/tours"}
      className={`cursor-pointer bg-[#00246B] hover:bg-[#001b52] text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-3 transition-colors w-full md:w-auto ${className}`}
    >
      <Search size={26} className="shrink-0" />
      <span className="text-[24px] pt-1">استكشف رحلتك</span>
    </Link>
  );
}

export default function HeroSearchBar() {
  const inputsData = [
    {
      icon: <MapPin className="text-gray-500 shrink-0" size={18} />,
      label: "الوجهة",
      placeholder: "حدد وجهتك",
    },
    {
      icon: <Calendar className="text-gray-500 shrink-0" size={18} />,
      label: "تاريخ المغادرة",
      placeholder: "اثنين, 2 مارس",
    },
    {
      icon: <Clock className="text-gray-500 shrink-0" size={18} />,
      label: "المدة",
      placeholder: "مدة الرحلة",
    },
    {
      icon: <Users className="text-gray-500 shrink-0" size={18} />,
      label: "المسافرون",
      placeholder: "1 بالغ, 0 طفل",
    },
  ];

  return (
    <>
      {/* Form */}
      <div
        className="hidden! md:grid! w-full mx-auto bg-card rounded-[24px] pt-10 pb-10 px-4 gap-6 
  grid-cols-2 lg:grid-cols-5 items-end justify-items-center
  drop-shadow-[0_4px_7.3px_2px_rgba(0,0,0,0.09)]"
      >
        {inputsData.map((input, index) => (
          <HeroInput key={index} {...input} />
        ))}

        <div className="col-span-2 lg:col-span-1 flex items-end">
          <ExploreButton />
        </div>
      </div>

      {/* Mobile Button */}
      <div className="md:hidden! flex! justify-center w-fit mx-auto">
        <ExploreButton className="w-fit" />
      </div>
    </>
  );
}
