"use client";

import { Daum } from "@/types/Data/services";
import { useEffect, useState } from "react";
import { MdClose, MdOutlineHowToReg } from "react-icons/md";
import { createPortal } from "react-dom";
import Image from "next/image";
import { BiPhoneCall } from "react-icons/bi";

export default function ServiceModal({
  data,
  phone,
  children,
  className,
}: {
  data: Daum;
  phone: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(document.body);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open, mounted]);

  const modalContent = (
    <>
      {/* Trigger */}
      <div onClick={() => setOpen(true)} className={className}>
        {children}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-70">
          <div className="bg-card flex flex-col gap-4 rounded-2xl shadow-lg p-6 md:max-w-lg w-11/12 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              <MdClose className="w-5 h-5" />
            </button>
            <div className="flex items-center justify-evenly">
              <div className="icon w-20 h-20 relative flex items-center justify-center p-2 rounded-full ">
                <Image
                  src={data.imageCover ? data.imageCover : "/assets/TOUR.webp"}
                  alt={data.alt || "Service Image"}
                  fill
                  sizes="100%"
                  className=" object-cover"
                />
              </div>
              <hr className="h-12 border-r border-gray-300" />
              <div className="flex flex-col w-1/2">
                <h2 className="text-2xl text-[var(--primary-color)] font-bold ">
                  {data.name}
                </h2>
                <p className="text-gray-600">{data.summary}</p>
              </div>
            </div>
            <hr className=" w-full text-gray-300" />
            <div className="flex flex-col">
              <p className="flex gap-2 text-[var(--primary-color)] font-bold">
                <MdOutlineHowToReg className="w-5 h-5 " />
                {"طريقة الاستخدام"}
              </p>
              <p className="text-gray-600">{data.method}</p>
            </div>
            <hr className=" w-full text-gray-300" />
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl w-full hover:bg-gray-200 transition"
            >
              <div className="flex flex-col items-start w-full">
                <p className="flex items-center gap-2 text-[var(--primary-color)] font-bold">
                  <BiPhoneCall className="w-4 h-4 " />
                  {"تواصل معنا"}
                </p>
                <p dir="ltr">{phone}</p>
              </div>
              <Image
                src="/assets/Whatsapp.svg"
                alt="whatsapp"
                width={24}
                height={24}
                className="w-8 h-8 object-contain"
              />
            </a>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={className}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>

      {mounted && open && createPortal(modalContent, mounted)}
    </>
  );
}
