export const dynamic = "force-dynamic";
import InfoList from "@/components/common/InfoList/InfoList";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getSeoPage } from "@/services/Seo/seoPage";
import { FaqSeo } from "@/types/Seo/FAQ";
import React from "react";
import Script from "next/script";

export async function generateMetadata() {
  return getSeoMetadata("alaselh-alshaeah", "FAQ");
}

export default async function FAQPage() {
  let data = null as FaqSeo | null;
  try {
    data = (await getSeoPage("alaselh-alshaeah")) as FaqSeo;
  } catch (error) {
    console.error("Failed to fetch FAQ seo:", error);
  }

  const faqData = data?.data?.sections?.faqData || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: data?.data?.seo?.metaTitle || "الأسئلة الشائعة",
    description: data?.data?.seo?.metaDescription || "الأسئلة الشائعة",
    url: `${process.env.NEXT_PUBLIC_URL}/FAQ`,
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.subtitle,
      },
    })),
  };

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
        name: "الأسئلة الشائعة",
        item: `${process.env.NEXT_PUBLIC_URL}/FAQ`,
      },
    ],
  };

  return (
    <>
      <InfoList
        title={data?.data?.title || "الأسئلة الشائعة"}
        subtitle={data?.data?.description || "تعرف على الأسئلة الشائعة"}
        data={faqData}
      />

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
