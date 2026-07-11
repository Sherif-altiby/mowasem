import { I_breadcrumbItem } from "@/types/global";
import Link from "next/link";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Breadcrumb = ({ items }: { items: I_breadcrumbItem[] }) => {
  return (
    <nav className="flex items-center flex-wrap gap-y-1 text-sm text-gray-600 px-2 sm:px-0">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center min-w-0">
            <Link
              href={item.href}
              className={`transition-colors text-sm md:text-lg hover:text-primary ${
                isLast
                  ? "text-primary font-semibold"
                  : "text-[#1A1A1A] font-medium whitespace-nowrap"
              }`}
            >
              {item.label}
            </Link>

            {!isLast && (
              <span className="mx-1 sm:mx-2 shrink-0 text-gray-400">
                <MdKeyboardDoubleArrowLeft size={14} />
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
