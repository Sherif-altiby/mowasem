export const dynamic = "force-dynamic";
import { getSeoPage } from "@/services/Seo/seoPage";
import React from "react";
import Script from "next/script";
import InfoList from "@/components/common/InfoList/InfoList";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { PrivacySeo } from "@/types/Seo/privacy"; 

export async function generateMetadata() {
  return getSeoMetadata("booking-support", "دعم الحجز");
}

export default async function BookingSupportPage() {
  let data = null as PrivacySeo | null;
  try {
    data = (await getSeoPage("booking-support")) as PrivacySeo;
  } catch (error) {
    console.error("Failed to fetch booking-support seo:", error);
  }

  const supportData = data?.data?.sections?.privacyData || [
    {
      title: "كيف يمكنني تأكيد حجزي؟",
      subtitle: "بمجرد إتمام عملية الدفع بنجاح، ستتلقى رسالة تأكيد عبر البريد الإلكتروني ورسالة نصية تحتوي على رقم مرجع الحجز وتفاصيله."
    },
    {
      title: "هل يمكنني إلغاء حجزي واسترداد المبلغ؟",
      subtitle: "نعم، يمكنك إلغاء الحجز وفقاً لسياسة الإلغاء الخاصة بنا. قد تُطبق بعض الرسوم بناءً على وقت الإلغاء ونوع الخدمة المحجوزة."
    },
    {
      title: "لم أستلم رسالة تأكيد الحجز، ماذا أفعل؟",
      subtitle: "يرجى التحقق من مجلد الرسائل غير المرغوب فيها (Spam). إذا لم تجدها، يمكنك التواصل مع فريق الدعم لتزويدك برقم الحجز الخاص بك."
    },
    {
      title: "كيف يمكنني تعديل تواريخ السفر؟",
      subtitle: "يمكنك طلب تعديل تواريخ السفر من خلال التواصل مع خدمة العملاء. يخضع التعديل لتوفر الإمكانية وقد يتطلب دفع فرق السعر."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: data?.data?.seo?.metaTitle || "دعم الحجز",
    description: data?.data?.seo?.metaDescription || "دعم الحجز الخاص بشركة مواسم",
    url: `${process.env.NEXT_PUBLIC_URL}/booking-support`,
    mainEntity: supportData.map((section) => ({
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
        id="booking-support-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <InfoList
        title={data?.data?.title || "دعم الحجز"}
        subtitle={data?.data?.description || "نحن هنا لمساعدتك في كل ما يخص حجوزاتك"}
        data={supportData}
      />
    </>
  );
}
