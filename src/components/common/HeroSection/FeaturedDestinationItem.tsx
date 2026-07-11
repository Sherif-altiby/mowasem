import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

interface FeaturedDestinationItemProps {
  icon: React.ReactNode;
  title: string;
  location: string;
  rating: string;
}

export default function FeaturedDestinationItem({
  icon,
  title,
  location,
  rating,
}: FeaturedDestinationItemProps) {
  return (
    <div className="flex items-center gap-4 bg-card/5 border border-white/10 p-3 rounded-xl hover:bg-card/10 transition cursor-pointer group/item">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-inner" style={{ background: "rgba(255,255,255,0.05)" }}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-white font-bold text-sm group-hover/item:text-yellow-400 transition-colors">{title}</h4>
        <div className="flex items-center gap-1 text-xs text-gray-300">
          <FaMapMarkerAlt className="text-red-400" />
          <span>{location}</span>
        </div>
      </div>
      <div className="">
        <div className="flex gap-1 text-xs text-gray-400 justify-end">
          <FaStar className="text-yellow-500" />
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
}
