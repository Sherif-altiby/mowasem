import Image from "next/image";
import Link from "next/link";
export default function WhatsappContact({
  phone = "+966501234567",
}: {
  phone?: string | number;
}) {
  return (
    <Link
      href={`https://wa.me/${phone}?text=${encodeURIComponent(
        "مرحباً 👋 معك شركة مواسم للسياحة والسفر ✈️ يسعدنا تواصلك معنا، كيف يمكننا مساعدتك؟",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل مع الدعم الفني على واتساب"
      className="group rounded-full bg-white/10 backdrop-blur-md border border-white/20 hidden lg:flex gap-2 xl:gap-3 items-center transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] hover:scale-105 cursor-pointer px-4 lg:px-5 xl:px-6 py-1.5 lg:py-2 xl:py-2"
    >
      <Image
        src={"/assets/Whatsapp.svg"}
        alt="whatsapp"
        width={32}
        height={32}
        className="w-5 h-5 md:w-6 md:h-6 xl:w-7 xl:h-7 transition-transform duration-300 group-hover:scale-110"
      />
      <div className="flex flex-col items-start whitespace-nowrap relative z-10">
        <span className="text-sm lg:text-sm xl:text-base font-medium text-white/90 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
          تواصل واتساب
        </span>
      </div>
    </Link>
  );
}
