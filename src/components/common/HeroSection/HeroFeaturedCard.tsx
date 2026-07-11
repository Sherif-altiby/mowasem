import { FaMosque, FaUmbrellaBeach } from "react-icons/fa";
import FeaturedDestinationItem from "./FeaturedDestinationItem";
import { MdFlightTakeoff } from "react-icons/md";
import { FaTowerObservation } from "react-icons/fa6";

export default function HeroFeaturedCard() {
  return (
    <div className="relative bg-card/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500 group">
      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/40 rounded-full blur-2xl" />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MdFlightTakeoff className="text-yellow-400 w-6 h-6" />
          وجهات مميزة
        </h3>
        <span className="bg-card/20 px-3 py-1 rounded-full text-xs text-white">
          الأكثر طلباً
        </span>
      </div>

      {/* Featured Destinations List */}

      <div className="space-y-4">
        <FeaturedDestinationItem
          icon={<FaUmbrellaBeach className="w-6 h-6 text-white" />}
          title="جزر المالديف"
          location="المحيط الهندي"
          rating="4.9"
        />
        <FeaturedDestinationItem
          icon={<FaMosque className="w-6 h-6 text-white" />}
          title="إسطنبول"
          location="تركيا"
          rating="4.8"
        />
        <FeaturedDestinationItem
          icon={<FaTowerObservation className="w-6 h-6 text-white" />}
          title="باريس"
          location="فرنسا"
          rating="4.7"
        />
      </div>

      {/* Floating Badge */}
      <div className="absolute -bottom-10 -right-10 bg-card p-4 rounded-2xl shadow-xl flex items-center gap-3 rotate-[-5deg]">
        <div className="bg-yellow-100 p-2 rounded-full">
          <MdFlightTakeoff className="text-yellow-500 w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-bold">تقييم ممتاز</p>
          <p className="text-sm font-bold text-gray-800">4.9/5 من عملائنا</p>
        </div>
      </div>
    </div>
  );
}
