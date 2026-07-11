export const dynamic = "force-dynamic";
import PageSection from "@/components/layout/PageSection/PageSection";
import PackageTypeCard from "@/components/ui/PackageTypeCard/PackageTypeCard";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getPackageTypes } from "@/services/PagesData/packageTypesService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { PackageTypes } from "@/types/Data/packageTypes";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import Script from "next/script";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";

export async function generateMetadata() {
  return getSeoMetadata("dlyl-albaqat", "package-types");
}
type PackageTypeItem = PackageTypes["data"]["data"][number];

export default async function Page() {
  let seoData = null as NormalPageSeo | null;
  let data: PackageTypes | null = null;

  try {
    seoData = (await getSeoPage("package-types")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch package-types seo:", error);
  }

  try {
    data = (await getPackageTypes()) as PackageTypes;
  } catch (error) {
    console.error("Failed to fetch package-types:", error);
  }

  const packages = data?.data?.data || [];
console.log("PACKAGES: ", packages);
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "الباقات السياحية",
        item: `${baseUrl}/package-types`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${baseUrl}/package-types`,
    name: seoData?.data?.seo?.metaTitle,
    description: seoData?.data?.seo?.metaDescription,
    inLanguage: "ar",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "ما هي الباقات السياحية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "هي عروض تشمل خدمات السفر والإقامة والتنقل مصممة لتسهيل رحلتك.",
        },
      },
      {
        "@type": "Question",
        name: "هل يمكن تخصيص الباقات السياحية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "نعم، يمكنك اختيار باقة مناسبة أو تعديلها حسب احتياجاتك.",
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageSection>
        {/* Page Content */}
        {packages.length > 0 ? (
          <div className="secondary-page-layout">
            <SectionHeader
              title={seoData?.data?.title || "الباقات السياحية"}
              desc={seoData?.data?.description || ""}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
              {packages.map((item: PackageTypeItem, i: number) => (
                <PackageTypeCard data={item} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="secondary-page-layout container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="relative w-full h-[350px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg animate-pulse bg-gray-200"
                >
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 bg-gray-300" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="relative z-20 flex flex-col justify-end items-center text-center gap-2 h-full p-6">
                    <div className="h-8 w-32 bg-gray-400/60 rounded-full" />
                    <div className="h-6 w-40 bg-gray-400/40 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </PageSection>
    </>
  );
}
