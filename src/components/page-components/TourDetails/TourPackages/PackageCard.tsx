import { LuInfo } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";

type PackageCardProps = {
  name: string;
  inclusions: string[];
  exclusions: string[];
  howToUse?: string[];
  price?: number | null;
  currency?: string | null;
  isSelected: boolean;
  onClick: () => void;
};

const PackageCard = ({
  name,
  inclusions,
  exclusions,
  howToUse,
  price,
  currency,
  isSelected,
  onClick,
}: PackageCardProps) => {
  return (
    <label
      onClick={onClick}
      className={`w-full cursor-pointer flex flex-col gap-3 md:gap-4 p-4 md:p-6 rounded-2xl border transition-all duration-200 bg-card select-none ${isSelected
        ? "border-[#141B34] shadow-[0_2px_15px_0_rgba(0,0,0,0.12)]"
        : "border-[#E8E8E8] hover:border-[#BDBDBD]"
        }`}
    >
      <input
        type="radio"
        name="package"
        className="sr-only"
        checked={isSelected}
        onChange={onClick}
      />

      <div className="flex items-center justify-between">
        <span className="text-[#1A1A1A] transition-colors">
          <LuInfo size={16} className="md:size-[22px]" />
        </span>
        <span className="text-[#141B34] bg-[#F2F2F7] p-2 md:p-3 rounded-full">
          <BsBoxSeam size={16} className="md:size-[22px]" />
        </span>
      </div>

      <p className="text-[#1A1A1A] font-bold text-base md:text-[22px] text-right leading-snug">
        {name}
      </p>

      {inclusions && inclusions.length > 0 && (
        <div className="text-[#575859] text-[10px] md:text-xs lg:text-sm text-right leading-relaxed">
          <p className="font-semibold mb-1">يشمل:</p>
          <ul className="list-disc list-inside space-y-1">
            {inclusions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {exclusions && exclusions.length > 0 && (
        <div className="text-[#575859] text-[10px] md:text-xs text-right leading-relaxed">
          <p className="font-semibold mb-1">لا يشمل:</p>
          <ul className="list-disc list-inside space-y-1">
            {exclusions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {howToUse && howToUse.length > 0 && (
        <div className="text-[#575859] text-[10px] md:text-xs text-right leading-relaxed">
          <p className="font-semibold mb-1">طريقة الاستخدام:</p>
          <ul className="list-disc list-inside space-y-1">
            {howToUse.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-auto">
        <div
          className="flex items-center gap-1.5 bg-primary/10 text-primary font-bold text-sm md:text-base lg:text-xl px-4 md:px-5 py-2 rounded-3xl"
          dir="ltr"
        >
          <span>&#65020;</span>
          <span>{price?.toString() || "0"}</span>
          <span className="text-[10px] md:text-xs lg:text-sm">{currency}</span>
        </div>
        <p className="text-[#575859] text-[10px] md:text-xs lg:text-sm font-medium text-right">
          (شامل ضريبة القيمة المضافة)
        </p>
      </div>
    </label>
  );
};

export default PackageCard;
