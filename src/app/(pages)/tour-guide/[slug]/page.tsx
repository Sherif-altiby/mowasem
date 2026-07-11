import React from "react";
import Script from "next/script";
import { getTourGuideBySlug } from "@/services/PagesData/tourGuidesService";
import { Metadata } from "next";
import { mapSeoToMetadata } from "@/helper/getSeoMetadata";
import CountryHero from "@/components/page-components/tour-guide/CountryHero";
import CountryOverview from "@/components/page-components/tour-guide/CountryOverview";
import CountryPlaces from "@/components/page-components/tour-guide/CountryPlaces";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const tourGuide = await getTourGuideBySlug(slug);
    return mapSeoToMetadata(tourGuide?.data?.seo, "tour-guide", slug);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { title: "Tour Guide" };
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
    data = await getTourGuideBySlug(slug);
    console.log("TOUR GUIDE: ", data);
  } catch (error) {
    console.error("Failed to fetch tour guide:", error);
  }

  const guide = data?.data;

  if (!guide) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold">
          عذراً، لم نتمكن من العثور على الدليل السياحي.
        </h2>
      </div>
    );
  }

  // إعداد Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristGuide",
    name: guide.country.name,
    description: guide.country.description,

    url: `${process.env.NEXT_PUBLIC_URL}/tour-guide/${slug}`,
    image: "",
  };

  
  console.log("COUNTRY", guide);

  return (
    <>
      <Script
        id="tourguide-details-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen mt-[-88px]">
      {/* Hero Section */}
      <CountryHero
        imageCover={guide.country.imageCover?.url || "/assets/CITY.webp"}
        countryName={guide.country.name}
        description={guide.country.description}
      />

      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div className="border border-primary/20 rounded-3xl p-6 md:p-12 lg:p-16 my-12">
          <CountryOverview desc={guide.country.description || "لا يوجد وصف"} />

          <div id="places" className="pt-12">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <CountryPlaces guides={guide as any} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
