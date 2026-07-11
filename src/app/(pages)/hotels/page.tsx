import HotelCard from "@/components/ui/HotelCard/HotelCard";
import React from "react";
import { getHotels } from "@/services/PagesData/hotelsService";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getSeoPage } from "@/services/Seo/seoPage";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import Script from "next/script";
import PageSection from "@/components/layout/PageSection/PageSection";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import HotelSearch from "@/components/page-components/Hotels/HotelSearch";
import { getHotelCountries } from "@/services/PagesData/hotelsService";
import { getCities } from "@/services/PagesData/citiesService";
import HotelPagination from "@/components/page-components/Hotels/HotelPagination";
import { Hotels, Daum as HotelDaum } from "@/types/Data/hotels";
import { Daum as CityDaum } from "@/types/Data/cities";

export async function generateMetadata() {
  return getSeoMetadata("hotels", "hotels");
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let data: Hotels | null = null;

  const resolvedParams = await searchParams;
  const q = typeof resolvedParams?.q === "string" ? resolvedParams.q : "";
  const cityName = typeof resolvedParams?.city === "string" ? resolvedParams.city : "";
  const countryName = typeof resolvedParams?.country === "string" ? resolvedParams.country : "";
  const page = typeof resolvedParams?.page === "string" ? Number(resolvedParams.page) : 1;
  const limit = typeof resolvedParams?.limit === "string" ? Number(resolvedParams.limit) : 10;

  // Load SEO, countries, and cities in parallel for faster performance
  const [seoDataResult, countriesResult, citiesResult] = await Promise.allSettled([
    getSeoPage("hotels") as Promise<NormalPageSeo>,
    getHotelCountries(),
    getCities(),
  ]);

  const seoData = seoDataResult.status === "fulfilled" ? seoDataResult.value : null;
  let hotelsCountries = countriesResult.status === "fulfilled" ? countriesResult.value?.data || [] : [];
  const citiesData = citiesResult.status === "fulfilled" ? (citiesResult.value?.data?.data || []) : [];

  if (hotelsCountries.length === 0 && citiesData.length > 0) {
    const uniqueCountries = new Map();
    citiesData.forEach((city: CityDaum) => {
      if (city.country && city.country._id) {
        if (!uniqueCountries.has(city.country._id)) {
          uniqueCountries.set(city.country._id, {
            country: city.country._id,
            label: city.country.name
          });
        }
      }
    });
    hotelsCountries = Array.from(uniqueCountries.values());
  }

  let countryId = "";
  let cityId = "";

  if (countryName) {
    const matchedCountry = hotelsCountries.find((c: { country: string; label: string }) => c.label === countryName || c.country === countryName);
    if (matchedCountry) countryId = matchedCountry.country;
  }

  if (cityName) {
    const matchedCity = citiesData.find((c: CityDaum) => c.name === cityName);
    if (matchedCity) cityId = matchedCity._id;
  }

  try {
    data = await getHotels({ city: cityId, country: countryId, page, limit, q });
  } catch (error) {
    console.error("Failed to fetch hotels:", error);
    data = null;
  }

  const hotels = data?.data?.hotels || [];
  const pagination = data?.pagination;

  console.log("hotels", data);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: process.env.NEXT_PUBLIC_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "الفنادق",
        item: `${process.env.NEXT_PUBLIC_URL}/hotels`,
      },
    ],
  };

  // WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoData?.data?.seo?.metaTitle || "الفنادق",
    description: seoData?.data?.seo?.metaDescription || "مجموعة من الفنادق",
    url: `${process.env.NEXT_PUBLIC_URL}/hotels`,
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      url: process.env.NEXT_PUBLIC_URL,
      name: "مواسم",
    },
  };

  // Hotels ItemList Schema
  const hotelsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "قائمة الفنادق",
    url: `${process.env.NEXT_PUBLIC_URL}/hotels`,
    itemListElement: (hotels || []).map((hotel: HotelDaum, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${process.env.NEXT_PUBLIC_URL}/hotels/${hotel?.slug || ""}`,
      name: hotel?.name || "فندق",
    })),
  };

  return (
    <PageSection>
      {hotels.length > 0 ? (
        <div className="secondary-page-layout gap-y-6! md:gap-y-13!">
          <HotelSearch countries={hotelsCountries} cities={citiesData} />

          <SectionHeader
            title={seoData?.data?.title || "قائمة الفنادق"}
            desc={seoData?.data?.description || "مجموعة من الفنادق"}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hotels.map((hotel: HotelDaum, i: number) => (
              <HotelCard data={hotel} key={i} />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <HotelPagination pagination={pagination} />
          )}
        </div>
      ) : (
        <div className="secondary-page-layout container">
          <HotelSearch countries={hotelsCountries} cities={citiesData} />
          <div className="flex flex-col items-center justify-center py-20 text-center w-full">
            <h3 className="text-2xl font-semibold text-gray-700">
              عذراً، لا توجد فنادق
            </h3>
            <p className="text-gray-500 mt-2">
              لا توجد فنادق متطابقة حالياً، يرجى المحاولة لاحقاً
            </p>
          </div>
        </div>
      )}

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <Script
        id="hotels-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelsSchema) }}
      />
    </PageSection>
  );
}
