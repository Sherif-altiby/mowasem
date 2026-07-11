export const dynamic = "force-dynamic";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import CityCard from "@/components/ui/CityCard/CityCard";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getCities } from "@/services/PagesData/citiesService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { City } from "@/types/Data/cities";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import React from "react";
import Script from "next/script";

export async function generateMetadata() {
  return getSeoMetadata("alwjhat", "cities");
}

export default async function Page() {
  let data: City | null = null;
  let seoData = null as NormalPageSeo | null;

  try {
    data = (await getCities()) as City;
  } catch (error) {
    console.error("Failed to fetch cities:", error);
  }

  try {
    seoData = (await getSeoPage("cities")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch cities seo:", error);
  }

  const cities = data?.data?.data || [];
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoData?.data?.seo?.metaTitle,
    description: seoData?.data?.seo?.metaDescription,
    url: `${baseUrl}/cities`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "المدن السياحية",
          item: `${baseUrl}/cities`,
        },
      ],
    },
    mainEntity: cities.map((city) => ({
      "@type": "Place",
      name: city?.seo?.metaTitle,
      description: city.seo.metaDescription,
      image: city.imageCover,
      url: `${baseUrl}/cities/${city.slug}`,
    })),
  };

  return (
    <div className="container pt-4">
      <Script
        id="cities-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumb items={[{ href: "/cities", label: "المدن السياحية" }]} />
      {cities.length > 0 ? (
        <div className="secondary-page-layout">
          <section className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {seoData?.data?.title || "المدن السياحية"}
            </h1>
            <p className="text-lg text-center">
              {seoData?.data?.description || "استكشف أشهر المدن السياحية"}
            </p>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((data, i) => (
              <CityCard data={data} key={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="secondary-page-layout">
          <div className="flex flex-col items-center justify-center py-20 text-center w-full">
            <h3 className="text-2xl font-semibold text-gray-700">
              عذراً، لا توجد مدن
            </h3>
            <p className="text-gray-500 mt-2">
              لا توجد مدن متطابقة حالياً، يرجى المحاولة لاحقاً
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
