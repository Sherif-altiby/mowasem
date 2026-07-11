export const dynamic = "force-dynamic";
import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import OffersCard from "@/components/ui/OffersCard/OffersCard";
import { getOffers } from "@/services/PagesData/offersServices";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getSeoPage } from "@/services/Seo/seoPage";
import { getGlobalSettings } from "@/services/PagesData/settingsService";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import { Phone } from "@/types/Data/globalSettings";
import Script from "next/script";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export async function generateMetadata() {
  return getSeoMetadata("offers", "offers");
}

export default async function Page() {
  let seoData = null as NormalPageSeo | null;
  let data = null;
  let settings = null;

  try {
    seoData = (await getSeoPage("offers")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch offers seo:", error);
  }

  try {
    data = await getOffers();
  } catch (error) {
    console.error("Failed to fetch offers data:", error);
  }

  try {
    settings = await getGlobalSettings();
  } catch (error) {
    console.error("Failed to fetch settings:", error);
  }

  const offers = data?.data?.data || [];
  
  // Get main phone number from settings
  const mainPhoneNumber = settings?.data?.contactInfo?.phones?.find(
    (phone: Phone) => phone.isPrimary || phone.isWhatsApp
  )?.number || "+966501234567";
 
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
        name: "عروضنا",
        item: `${BASE_URL}/offers`,
      },
    ],
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoData?.data?.seo?.metaTitle || "عروضنا",
    description: seoData?.data?.seo?.metaDescription || "أفضل العروض السياحية",
    url: `${BASE_URL}/offers`,
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      url: BASE_URL,
      name: "مواسم",
    },
  };

  // ItemList Schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "قائمة العروض",
    itemListElement: offers.map((offer, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: offer.name,
      description: offer.description,
      url: `${BASE_URL}/offers`,
      price: offer.price,
    })),
  };
 
  return (
    <div className="container pt-4">
      <Breadcrumb items={[{ href: "/offers", label: "عروضنا" }]} />
      {offers.length > 0 ? (
        <div className="secondary-page-layout">
          <section className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {seoData?.data?.title || "عروضنا"}
            </h1>
            <p className="text-lg text-center">
              {seoData?.data?.description ||
                "مجموعة العروض المميزه التي نقدمها لك"}
            </p>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, i) => (
              <OffersCard data={offer} phone={mainPhoneNumber} key={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="secondary-page-layout">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="group relative bg-card border border-gray-100 rounded-3xl overflow-hidden h-full w-full shadow-lg animate-pulse"
              >
                {/* Image Section */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-200" />

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="mb-4 space-y-3">
                    {/* Title */}
                    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  </div>

                  {/* Price and Action Section */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-6 w-20 bg-gray-300 rounded"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>

                    {/* WhatsApp Button Placeholder */}
                    <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                  </div>

                  {/* CTA Placeholder */}
                  <div className="h-6 w-full bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Schemas */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}
