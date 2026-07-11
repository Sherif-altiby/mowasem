import Link from "next/link";
import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { HiMiniSlash } from "react-icons/hi2";

type BreadcrumbProps = {
  items: {
    href: string;
    label: string;
  }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb " className="px-4 md:px-0">
      <ol className="flex items-center gap-1 text-sm text-gray-700">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="block text-primary transition-colors hover:text-gray-900"
            aria-label="الصفحة الرئيسية"
          >
            <GrHomeRounded />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Separator */}
              <li>
                <HiMiniSlash />
              </li>

              {/* Link or plain text */}
              <li>
                {isLast ? (
                  <span className="text-xs text-gray-500">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-xs transition-colors hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
