import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";

import HotelDetailsSection from "@/components/page-components/HotelDetails/HotelDetailsSection/HotelDetailsSection";
import { getSingleHotel } from "@/services/PagesData/hotelsService";
import { Metadata } from "next";
import { mapSeoToMetadata } from "@/helper/getSeoMetadata";
import PageSection from "@/components/layout/PageSection/PageSection";
import HotelErrorState from "./HotelErrorState";
import { unstable_cache } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

// Cache the hotel data to avoid duplicate API calls
const getCachedHotel = unstable_cache(
  async (hotelId: string) => getSingleHotel(hotelId),
  ["hotel-details"],
  { revalidate: 300, tags: ["hotel"] }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}): Promise<Metadata> {
  const { hotelId } = await params;
  try {
    const hotelDetails = await getCachedHotel(hotelId);
    const hotel = hotelDetails?.data?.hotel;
    return mapSeoToMetadata(hotel?.seo, "hotels", hotelId);
  } catch {
    return { title: "Hotel" };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;
  let fetchError = false;
  let data;
  try {
    data = await getCachedHotel(hotelId);
  } catch (error) {
    console.error("Failed to fetch hotel:", error);
    fetchError = true;
  }

  const hotel = data?.data?.hotel;


  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "الفنادق",
        item: `${BASE_URL}/hotels`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: hotel?.hotel_name || "فندق",
        item: `${BASE_URL}/hotels/${hotelId}`,
      },
    ],
  };

  // WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: hotel?.seo?.metaTitle || hotel?.hotel_name || "فندق",
    description: hotel?.seo?.metaDescription || hotel?.overview || "",
    url: `${BASE_URL}/hotels/${hotelId}`,
  };

  // Hotel Schema
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel?.seo?.metaTitle || hotel?.hotel_name || "فندق",
    description: hotel?.seo?.metaDescription || hotel?.overview || "",
    image: hotel?.imageCover || "",
    url: `${BASE_URL}/hotels/${hotelId}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
    },
  };
  if (fetchError) {
    return (
      <PageSection>
        <HotelErrorState type="error" />
      </PageSection>
    );
  }
  if (!hotel) {
    return (
      <PageSection>
        <HotelErrorState type="notFound" />
      </PageSection>
    );
  }
  return (
    <PageSection>
      <Breadcrumb
        items={[
          { href: "/", label: "الرئيسية" },
          { href: "/hotels", label: "الفنادق" },
          { href: `/hotels/${hotelId}`, label: hotel?.hotel_name || "فندق" },
        ]}
      />
      <div className="details-page-layout container">
        <HotelDetailsSection data={hotel} />
      </div>

      {/* SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
    </PageSection>
  );
}
