"use client";

import { useRef, useState } from "react";
import { Handshake } from "lucide-react";

import ServiceCard, { type Service } from "../Home/ServiceSection/ServiceCard";
import ServiceModalLazy from "../Home/ServiceSection/ServiceModalLazy";

type ServicesProps = {
  services: Service[];
  servicesPage?: boolean;
};

export default function ServiceSection({
  services,
  // servicesPage = false,
}: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const dragged = useRef(false);

  // const hasLargeGap = services.length >= 8;

  if (!services.length) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <Handshake className="w-16 h-16 text-primary" />
          <p className="text-primary text-sm md:text-[28px] font-semibold md:font-bold">
            لا توجد خدمات متاحة حاليًا
          </p>
        </div>
    );
  }

  return (
    <section className="  max-w-[1099px] mx-auto"  >
     <div className="flex flex-wrap justify-around items-center gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            isLast={index === services.length - 1}
            // totalCount={services.length}
            // servicesPage={servicesPage}
            // hasLargGap={hasLargeGap}
            onSelect={setSelectedService}
            dragged={dragged}
          />
        ))}
      </div>

      <ServiceModalLazy
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
