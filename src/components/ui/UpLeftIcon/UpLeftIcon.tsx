"use client";
import { BsArrowUpLeft } from "react-icons/bs";

const UpLeftIcon = ({
  href,
  color,
  iconColor,
}: {
  href: string;
  color?: string;
  iconColor?: string;
}) => {
  return (
    <button
      type="button"
      onClick={() => window.open(href, "_blank")}
      className={`
        flex items-center justify-center
        w-8 h-8 md:w-10 md:h-10 rounded-[12px] md:rounded-[16px]
        border border-${color} bg-transparent
        cursor-pointer outline-none
        p-2.5
      `}
      aria-label="للمزيد من التفاصيل"
    >
      <BsArrowUpLeft
        style={{ width: 18, height: 18 }}
        className={`text-${iconColor || color}`}
      />
    </button>
  );
};

export default UpLeftIcon;
