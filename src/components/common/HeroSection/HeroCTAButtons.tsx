import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { GiRocketFlight } from "react-icons/gi";

interface HeroCTAButtonsProps {
  mainPhoneNumber: string;
}

export default function HeroCTAButtons({ mainPhoneNumber }: HeroCTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Link
        href="/offers"
        className="group relative overflow-hidden bg-card text-primary font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          استكشف العروض
          <GiRocketFlight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
        </span>
        <div className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      </Link>

      <Link
        href={`https://wa.me/${mainPhoneNumber}?text=${encodeURIComponent(
          "مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا، كيف يمكننا مساعدتك؟"
        )}`}
        target="_blank"
        className="group relative overflow-hidden bg-green-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <FaWhatsapp className="w-6 h-6" />
          تواصل معنا
        </span>
        <div className="absolute inset-0 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      </Link>
    </div>
  );
}
