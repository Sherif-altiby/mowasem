import CityDetailsSection from "@/components/page-components/CityDetails/CityDetailsSection/CityDetailsSection";
import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { getCityBySlug } from "@/services/PagesData/citiesService";
import { Metadata } from "next";
import { mapSeoToMetadata } from "@/helper/getSeoMetadata";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const city = await getCityBySlug(slug);
    return mapSeoToMetadata(city?.data?.city?.seo, "cities", slug);
  } catch {
    return { title: "City" };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data;
  try {
    data = await getCityBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch city:", error);
  }
  const city = data?.data?.city;

  if (!city) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold">
          عذراً، لم نتمكن من العثور على المدينة.
        </h2>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: city.seo?.metaTitle || city.name,
    description: city.seo?.metaDescription || city.descText,
    image: city.imageCover,
    url: `${baseUrl}/cities/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "المدن السياحية", item: `${baseUrl}/cities` },
      { "@type": "ListItem", position: 3, name: city.name, item: `${baseUrl}/cities/${slug}` },
    ],
  };

  type CityWeather = NonNullable<typeof data>["data"]["cityWeather"];

  return (
    <div className="container pt-42">
      <Script
        id="city-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([placeSchema, breadcrumbSchema]),
        }}
      />

      <Breadcrumb
        items={[
          { href: "/cities", label: "المدن السياحية" },
          { href: `/cities/${slug}`, label: city.name },
        ]}
      />

      <div className="details-page-layout container ">
        <CityDetailsSection
          cityWeather={data?.data?.cityWeather as CityWeather}
          data={city}
        />
      </div>
    </div>
  );
}
