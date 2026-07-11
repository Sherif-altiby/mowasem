import ImageHandleComponent from "@/components/common/ImageHandleComponent/ImageHandleComponent";
import { Daum } from "@/types/Data/packageTypes";
import Link from "next/link";
import { HiArrowUpLeft } from "react-icons/hi2";

export default function PackageTypeCard({ data }: { data: Daum }) {
  const imgSrc =
    data.imageCover && data.imageCover !== "data"
      ? data.imageCover
      : "/assets/TOUR.webp";
  return (
    <Link
      href={`/package-types/${data.slug}`}
      className="group relative flex items-end rounded-3xl overflow-hidden h-92.5 md:h-128 w-full shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)]"
      dir="rtl"
    >
      <ImageHandleComponent
        src={imgSrc}
        alt={data.alt || data.name}
        fill
        className="absolute inset-0 object-cover object-center -z-10 group-hover:scale-110 transition-transform duration-500 ease-in-out"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      <div className="relative z-10 p-5 text-white flex flex-col gap-3 w-full xs:min-h-56">
        <h2 className="text-2xl xs:text-3xl font-bold leading-snug">
          {data.name}
        </h2>
        <div
          className="text-sm xs:text-base leading-relaxed text-white/90 line-clamp-4 flex-1"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>

      <div className="absolute top-5 left-5 bg-card rounded-full p-4 group/card hover:bg-primary transition-colors duration-300 ease-in-out">
        <HiArrowUpLeft
          className="text-2xl group-hover/card:text-white! transition-colors duration-300 ease-in-out"
          color="#00276C"
        />
      </div>
    </Link>
  );
}
