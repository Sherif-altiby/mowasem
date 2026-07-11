"use client";

import dynamic from "next/dynamic";
import whatsappImg from "@/../public/assets/Whatsapp.svg";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "./ServiceCard";

// Only loaded when modal is actually opened
const ServiceModal = dynamic(
  () => import("@/components/ui/ServiceModal/ServiceModal"),
  { ssr: false }
);

interface ServiceModalLazyProps {
  service: Service | null;
  onClose: () => void;
}

export default function ServiceModalLazy({ service, onClose }: ServiceModalLazyProps) {
  // Don't render at all until a service is selected — prevents bundle load on mount
  if (!service) return null;

  return (
    <ServiceModal
      isOpen={true}
      onClose={onClose}
      title={service.name}
      key={service.id}
    >
      <p className="leading-relaxed border-b border-gray-400 pb-5">
        {service.description}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
        <Link
          className="cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2
             bg-green-500 text-white text-lg font-medium rounded-2xl px-10 py-3
             w-full sm:w-auto hover:bg-green-600 transition"
          href={`https://wa.me/01234567890?text=مرحبًا، أود الاستفسار عن خدمة ${service.name} التي تقدمونها.`}
          target="_blank"
        >
          <Image src={whatsappImg} alt="whatsapp icon" width={24} height={24} draggable={false} />
          تواصل معنا واتساب
        </Link>
        <button
          className="cursor-pointer inline-flex items-center justify-center
             text-lg font-medium text-foreground border border-gray-400 rounded-2xl
             px-12 py-3 w-full hover:bg-gray-100 transition"
          onClick={onClose}
          aria-label="Cancel"
        >
          الغاء
        </button>
      </div>
    </ServiceModal>
  );
}
