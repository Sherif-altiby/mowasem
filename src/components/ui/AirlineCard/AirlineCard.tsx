import { Daum } from "@/types/Data/airlines";
import Image from "next/image";

export default function AirlineCard({ data }: { data: Daum }) {
  return (
    <div className="relative h-64 w-full mx-auto overflow-hidden transition-all duration-500 transform shadow-lg cursor-pointer group rounded-2xl hover:shadow-2xl hover:scale-105">
      <Image
        src={data?.imageCover}
        alt={data.alt || data.name}
       fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={70}
          loading="lazy"
        className="absolute inset-0 object-cover transform group-hover:scale-110 group-hover:brightness-90 transition-transform duration-700 ease-out"
      />
      {/* الطبقة المظلمة للنص */}
      <div className="absolute inset-0 transition-all duration-500 bg-black/20 group-hover:bg-black/40"></div>
      {/* المحتوى */}
      <div className="relative flex flex-col justify-end h-full p-6">
        <div className="transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
          <h3
            className="mb-2 text-3xl font-bold text-white font-arabic drop-shadow-lg"
            dir="rtl"
          >
            {data.name}{" "}
          </h3>
        </div>
      </div>
      {/* تأثيرات الإضاءة */}
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-transparent via-transparent to-white/10 group-hover:opacity-100"></div>
      <div className="absolute w-2 h-2 transition-all duration-500 bg-primary rounded-full opacity-0 top-4 right-4 group-hover:opacity-60 group-hover:scale-150"></div>
      <div className="absolute w-1 h-1 transition-all duration-700 bg-primary/50 rounded-full opacity-0 top-6 right-8 group-hover:opacity-40 group-hover:scale-200"></div>
      {/* حدود متوهجة */}
      <div className="absolute inset-0 transition-all duration-500 border-2 border-white/0 group-hover:border-white/30 rounded-2xl"></div>
    </div>
  );
}
