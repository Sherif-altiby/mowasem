"use client";

import {
  FiFacebook as Facebook,
  FiInstagram as Instagram,
  FiCopy as Copy,
} from "react-icons/fi";

import toast from "react-hot-toast";

const ShareLinks = ({ blogDescription }: { blogDescription: string }) => {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("تم نسخ المقالة بنجاح");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("فشل نسخ المقالة");
    }
  };

  return (
    <div className="hidden md:flex items-center gap-3">
      <button
        onClick={() => handleCopy(blogDescription)}
        className="w-10 h-10 rounded-[6px] p-2 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center text-[#1A1A1A] hover:text-[#1A1A1A]/80 transition-colors bg-card"
      >
        <Copy size={18} />
      </button>
      <button className="w-10 h-10 rounded-[6px] p-2 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center text-pink-600 hover:text-pink-600/80 transition-colors bg-card">
        <Instagram size={18} />
      </button>
      <button className="w-10 h-10 rounded-[6px] p-2 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] flex items-center justify-center text-blue-600 hover:text-blue-600/80 transition-colors bg-card">
        <Facebook size={18} />
      </button>
    </div>
  );
};

export default ShareLinks;
