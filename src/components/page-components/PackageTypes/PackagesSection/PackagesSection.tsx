import Script from "next/script";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { getPackagesPackageType } from "@/services/PagesData/packageTypesService";
import React from "react";
import Link from "next/link";
import PageSection from "@/components/layout/PageSection/PageSection";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import ImageHandleComponent from "@/components/common/ImageHandleComponent/ImageHandleComponent";

export default async function PackagesSection({ slug }: { slug: string[] }) {
  const data = await getPackagesPackageType(slug[0]);
  if (!data) return null;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const countriesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "افضل الباقات السياحية",
    itemListElement: (data?.data?.packages || []).map((c, i) => ({
      "@type": "ListItem",
      name: c?.seo?.metaTitle || "باقة سياحية",
      image: c?.imageCover || "",
      description: c?.descText || "",
      position: i + 1,
      url: `${baseUrl}/package-types/${slug[0]}/${c?.slug || ""}`,
    })),
  };

  return (
    <PageSection>
      <Script
        id="countries-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(countriesSchema) }}
      />
      <Breadcrumb
        items={[
          { href: "/", label: "الرئيسية" },
          { href: "/package-types", label: "الباقات السياحية" },
          { href: `/package-types/${slug[0]}`, label: "الدول" },
        ]}
      />
      <div className="secondary-page-layout">
        <SectionHeader
          title={data?.data?.packageType?.name || ""}
          desc={data?.data?.packageType?.descText || ""}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data?.data?.packages || []).map((data, i) => (
            <Link
              key={i}
              href={`/package-types/${slug[0]}/${data?.slug}`}
              className="group relative flex flex-col rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg h-72 md:h-[360px] w-full"
            >
              {/* Image */}
              <ImageHandleComponent
                src={
                  data?.imageCover && data.imageCover !== "data"
                    ? data.imageCover
                    : "/assets/placeholder.png"
                }
                alt={data?.alt || data?.name || ""}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="absolute inset-0 object-cover object-center z-0 group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-90 transition-opacity duration-300" />

              {/* Top Left Badge */}
              <div className="absolute top-4 left-4 md:top-5 md:left-5 z-20">
                <div className="px-4 md:px-5 py-1.5 md:py-2 rounded-[30px] bg-[#1A1A1A]/40 backdrop-blur-md text-white border border-white/20 text-xs md:text-sm font-medium shadow-sm">
                  {data?.country?.name || "الأفضل مبيعًا"}
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-20 flex flex-col justify-end gap-2 p-5 md:p-6 h-full text-right mt-auto w-full">
                <h3 className="text-white text-2xl md:text-[28px] font-bold leading-snug mb-1 drop-shadow-lg">
                  {data?.name}
                </h3>
                {data?.cities && data.cities.length > 0 ? (
                  <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed drop-shadow-md">
                    {data.cities
                      .map((city: { name: string }) => city.name)
                      .join("، ")}
                  </p>
                ) : data?.descText ? (
                  <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed line-clamp-1 drop-shadow-md">
                    {data.descText}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
