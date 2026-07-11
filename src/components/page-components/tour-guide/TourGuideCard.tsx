import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TourGuideCard = ({ country }: { country: any }) => {
  return (
    <Link
      href={`/tour-guide/${country.slug}`}
      className="relative overflow-hidden p-2 min-h-72 rounded-xl border border-gray-200 shadow-[0_4px_12px_0_rgba(0,0,0,0.12)] hover:shadow-md transition-all duration-400 flex flex-col hover:scale-[102%] cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-56 rounded-xl overflow-hidden">
        <Image
          src={country.imageCover?.url || "/assets/placeholder.png"}
          alt={country.imageCover?.alt || country.name}
          fill
          className="object-cover"
        />

        {country.isPopular && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-linear-to-r from-[#FFC100] to-[#FF476C] backdrop-blur-xs border border-white/30 text-base font-medium text-white px-4 py-1.5 rounded-full">
            <span>رائجة حاليا</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between gap-3 flex-1 p-4">
        <h2 className="text-2xl font-semibold">{country.name}</h2>

        <p className="text-lg">{country.shortDescription}</p>

        <div className="flex items-center gap-1 mt-5 text-[#404040]">
          <MapPin size={20} />
          <span className="text-lg font-medium">{country.continent}</span>
        </div>
      </div>
    </Link>
  );
};

export default TourGuideCard;
