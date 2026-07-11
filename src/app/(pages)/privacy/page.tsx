export const dynamic = "force-dynamic";
import { getSeoPage } from "@/services/Seo/seoPage";
import { PrivacySeo } from "@/types/Seo/privacy";
import React from "react";
import Script from "next/script";
import InfoList from "@/components/common/InfoList/InfoList";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
export async function generateMetadata() {
  return getSeoMetadata("privacy", "privacy");
}
export default async function Page() {
  let data = null as PrivacySeo | null;
  try {
    data = (await getSeoPage("privacy")) as PrivacySeo;
  } catch (error) {
    console.error("Failed to fetch privacy seo:", error);
  }
  const privacyData = data?.data?.sections?.privacyData || [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: data?.data?.seo?.metaTitle || "سياسة الخصوصية",
    description: data?.data?.seo?.metaDescription || "سياسة الخصوصية الخاصة بنا",

    url: `${process.env.NEXT_PUBLIC_URL}/privacy`,
    mainEntity: privacyData.map((section) => ({
      "@type": "CreativeWork",
      headline: section.title,
      text: section.subtitle,
    })),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id="privacy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <InfoList
        title={data?.data?.title || "سياسة الخصوصية"}
        subtitle={data?.data?.description || "تعرف على سياسة الخصوصية"}
        data={privacyData}
      />
    </>
  );
}
