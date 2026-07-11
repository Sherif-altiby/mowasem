"use client";

import { Share2, Copy, MessageCircle, Share } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  title: string;
};

export default function ShareButton({ title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const url = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("تم نسخ الرابط");
    setIsOpen(false);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${title} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setIsOpen(false);
  };

  const nativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        toast.error("المتصفح لا يدعم المشاركة");
      }
    } catch {
      toast.error("تم إلغاء المشاركة");
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl  shadow-[0px_1px_4px_0px_#00000040] text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        <Share2 size={16} />
        شارك
      </button>

      {isOpen && (
        <div
          dir="rtl"
          className="absolute top-[calc(100%+8px)] left-0 w-56 bg-card border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-xs text-gray-400">مشاركة المقال</p>
          </div>

          {/* Actions */}
          <div className="p-1.5 flex flex-col gap-0.5">
            <button
              onClick={copyLink}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm text-right w-full transition-colors"
            >
              <Copy size={16} className="text-gray-400 shrink-0" />
              نسخ الرابط
            </button>

            <button
              onClick={shareWhatsApp}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm text-right w-full transition-colors"
            >
              <MessageCircle size={16} className="text-[#25D366] shrink-0" />
              واتساب
            </button>

            <button
              onClick={nativeShare}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm text-right w-full transition-colors"
            >
              <Share size={16} className="text-gray-400 shrink-0" />
              مشاركة النظام
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
