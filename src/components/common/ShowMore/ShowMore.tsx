import Link from "next/link";
import React from "react";

export default function ShowMore({ href }: { href: string }) {
  return (
    <div className="flex justify-center">
      <Link
        href={`/${href}`}
        className="flex items-center justify-center bg-primary text-white py-2 px-4 rounded-full hover:bg-primary/80 transition-all duration-300 w-1/3"
      >
        عرض المزيد
      </Link>
    </div>
  );
}
