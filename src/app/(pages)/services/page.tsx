export const dynamic = "force-dynamic";
import Script from "next/script";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getServices } from "@/services/PagesData/servicesService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import ContactSection from "@/components/ui/CotnactSection/ContactSection";
import PageSection from "@/components/layout/PageSection/PageSection";
import ServiceSection from "@/components/page-components/Services/ServiceSection";

export async function generateMetadata() {
  return getSeoMetadata("services", "services");
}

export default async function Page() {
  let seoData = null as NormalPageSeo | null;
  let services = null;

  try {
    seoData = (await getSeoPage("services")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch seo data:", error);
  }

  try {
    services = await getServices();
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }

 

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoData?.data?.seo?.metaTitle || "خدماتنا",
    description:
      seoData?.data?.seo?.metaDescription ||
      "مجموعة الخدمات المميزة التي نقدمها لك",
    url: `${process.env.NEXT_PUBLIC_URL}/services`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mainEntity: (services?.data?.data || []).map((service: any) => ({
      "@type": "Service",
      name: service?.name,
      description: service?.summary,
      url: `${process.env.NEXT_PUBLIC_URL}/services`,
    })),
  };

  return (
    <>
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* محتوى الصفحة */}
      <PageSection>
        <div className="secondary-page-layout">
          <SectionHeader
            title={seoData?.data?.title || "خدماتنا"}
            desc={
              seoData?.data?.description ||
              "مجموعة الخدمات المميزه التي نقدمها لك"
            }
          />
          <ServiceSection
            services={services?.data?.data || []}
            servicesPage
          />

          {/* Contact section */}
          <ContactSection />
        </div>
      </PageSection>
    </>
  );
}
