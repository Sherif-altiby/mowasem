export const dynamic = "force-dynamic";
import Script from "next/script";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getTourGuides } from "@/services/PagesData/tourGuidesService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { Daum, ToursGuide } from "@/types/Data/toursGuide";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import PageSection from "@/components/layout/PageSection/PageSection";
import TourGuideSearch from "@/components/page-components/tour-guide/TourGuideSearch";


export async function generateMetadata() {
  return getSeoMetadata("tourguide", "tour-guide");
}

export default async function Page() {
  let seoData: NormalPageSeo | null = null;
  let data: ToursGuide | null = null;

  try {
    seoData = (await getSeoPage("tourguide")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch tourguide seo:", error);
  }

  try {
    data = (await getTourGuides()) as ToursGuide;
    console.log("COUNTREIS: ", data);
  } catch (error) {
    console.error("Failed to fetch tour guides:", error);
  }

  const guides: Daum[] = data?.data ?? [];
console.log("GUIDES: ", guides);
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: seoData?.data?.seo?.metaTitle || "الدليل السياحي",
    description: seoData?.data?.seo?.metaDescription || "دليل سياحي",
    url: `${process.env.NEXT_PUBLIC_URL}/tour-guide`,
    itemListElement: guides.map((guide: Daum, index: number) => ({
      "@type": "TouristGuide",
      position: index + 1,
      name: guide?.country?.name,
      description: guide.introduction ?? "",
      url: `${process.env.NEXT_PUBLIC_URL}/tour-guide/${guide?.country?.slug}`,
    })),
  };

  return (
    <>  
      {/* JSON-LD Schema */}
      <Script
        id="tourguides-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Page content */}
      <PageSection>
        <div className="secondary-page-layout">
          <TourGuideSearch guides={guides} seoData={seoData} />
        </div>
      </PageSection>
    </>
  );
}
