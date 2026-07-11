export const dynamic = "force-dynamic";
import { getSeoPage } from "@/services/Seo/seoPage";
import React from "react";
import Script from "next/script";
import InfoList from "@/components/common/InfoList/InfoList";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { PrivacySeo } from "@/types/Seo/privacy"; // We can reuse this type or create a generic one

export async function generateMetadata() {
  return getSeoMetadata("help", "مركز المساعدة");
}

export default async function HelpPage() {
  let data = null as PrivacySeo | null;
  try {
    // Attempting to fetch "help" SEO page if it exists in the backend
    data = (await getSeoPage("help")) as PrivacySeo;
  } catch (error) {
    console.error("Failed to fetch help seo:", error);
  }

  // Use the data if available from sections.privacyData or fallback to empty array
  // Assuming the backend returns the same structure or we provide some default mock data
  const helpData = data?.data?.sections?.privacyData || [
    {
      title: "كيف يمكنني الحجز؟",
      subtitle: "يمكنك الحجز من خلال موقعنا الإلكتروني أو تطبيقنا بسهولة، فقط اختر وجهتك وتاريخ السفر واتبع الخطوات."
    },
    {
      title: "كيف يمكنني تعديل حجزي؟",
      subtitle: "يمكنك تعديل حجزك من خلال الدخول إلى حسابك واختيار 'حجوزاتي'، ثم اختيار الحجز الذي ترغب في تعديله."
    },
    {
      title: "ما هي طرق الدفع المتاحة؟",
      subtitle: "نوفر مجموعة متنوعة من طرق الدفع الآمنة، بما في ذلك البطاقات الائتمانية والتحويل البنكي."
    },
    {
      title: "كيف يمكنني التواصل مع خدمة العملاء؟",
      subtitle: "يمكنك التواصل معنا عبر الواتساب، أو البريد الإلكتروني، أو من خلال صفحة 'اتصل بنا'."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: data?.data?.seo?.metaTitle || "مركز المساعدة",
    description: data?.data?.seo?.metaDescription || "مركز المساعدة الخاص بشركة مواسم",
    url: `${process.env.NEXT_PUBLIC_URL}/help`,
    mainEntity: helpData.map((section) => ({
      "@type": "Question",
      name: section.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: section.subtitle,
      },
    })),
  };

  return (
    <>
      <Script
        id="help-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <InfoList
        title={data?.data?.title || "مركز المساعدة"}
        subtitle={data?.data?.description || "كيف يمكننا مساعدتك اليوم؟"}
        data={helpData}
      />
    </>
  );
}
