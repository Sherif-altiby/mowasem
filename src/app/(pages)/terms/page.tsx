export const dynamic = "force-dynamic";
import Script from "next/script";
import InfoList from "@/components/common/InfoList/InfoList";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getSeoPage } from "@/services/Seo/seoPage";
import { TermsSeo } from "@/types/Seo/terms";

export async function generateMetadata() {
  return getSeoMetadata("alshrwt-walahkam", "terms");
}

export default async function Page() {
  let data = null as TermsSeo | null;
  try {
    data = (await getSeoPage("terms")) as TermsSeo;
  } catch (error) {
    console.error("Failed to fetch Terms seo:", error);
  }
  const termsData = data?.data?.sections?.termsData || [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "TermsOfService",
    "name": data?.data?.seo?.metaTitle || "الشروط والأحكام",
    "description": data?.data?.seo?.metaDescription || "الشروط والأحكام الخاصة بنا",
    "url": `${process.env.NEXT_PUBLIC_URL}/terms`,
    "mainEntity": termsData.map((section) => ({
      "@type": "CreativeWork",
      "headline": section.title,
      "text": section.subtitle
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id="terms-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* محتوى الصفحة */}
      <InfoList
        title={data?.data?.title || "الشروط والأحكام"}
        subtitle={data?.data?.description || "تعرف على الشروط والأحكام"}
        data={termsData}
      />
    </>
  );
}
