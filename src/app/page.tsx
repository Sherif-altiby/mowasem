import HeroSection from "@/components/common/HeroSection/HeroSection";
import { getSeoPage } from "@/services/Seo/seoPage";
import { HomeSeo } from "@/types/Seo/home";
import { getServices } from "@/services/PagesData/servicesService";
import { getTourGuides } from "@/services/PagesData/tourGuidesService";
import { getHotels } from "@/services/PagesData/hotelsService";
import { getTours } from "@/services/PagesData/toursService";
import { getBlogs } from "@/services/PagesData/blogsService";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { Metadata } from "next";

import {
  ServiceLoader,
  TourGuideLoader,
  HotelLoader,
  ToursLoader,
  BlogLoader,
  ReviewLoader
} from "@/components/shared/SectionLoader";

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata("home", "");
}

export default async function Home() {
  // Fetch all data in parallel on server
  const [seoData, servicesData, tourGuidesData, hotelsData, toursData, blogsData] = await Promise.all([
    getSeoPage("home"),
    getServices(),
    getTourGuides(),
    getHotels(),
    getTours(),
    getBlogs(),
  ]);

  const data = seoData as HomeSeo;

  return (
    <div className="main-page-layout">
      {/* Hero Section */}
      <HeroSection />

      {/* Service Section - SSR */}
      <ServiceLoader services={servicesData?.data?.data || []} />

      {/* Tour Guide Section - SSR */}
      <TourGuideLoader data={tourGuidesData || undefined} />

      {/* Hotel Section - SSR */}
      <HotelLoader
        title={data?.data.sections?.ourHotels?.title ?? "فنادق مميزة"}
        subtitle={
          data?.data.sections?.ourHotels?.subtitle ??
          "أفضل الفنادق بأفضل الأسعار"
        }
        data={hotelsData}
      />

      {/* Tours Section - SSR */}
      <ToursLoader
        title={data?.data.sections?.ourTours?.title ?? "جولات سياحية مميزة"}
        subtitle={
          data?.data.sections?.ourTours?.subtitle ??
          "استمتع بتجارب سياحية منظمة بعناية تناسب جميع الاهتمامات، من الجولات الثقافية والتاريخية إلى المغامرات الطبيعية والرحلات البحرية. اختر جولتك ودعنا نهتم بكافة التفاصيل لتعيش تجربة لا تُنسى."
        }
        data={toursData}
      />

      {/* Blog Section - SSR */}
      <BlogLoader
        title={"اكتشف أحدث مقالات السفر"}
        subtitle={
          "تصفح مجموعة من المقالات والنصائح التي تساعدك على التخطيط لرحلتك القادمة، واختيار أفضل الوجهات، والاستمتاع بتجربة سفر أكثر سهولة وتنظيمًا."
        }
        data={blogsData}
      />

      {/* Review Section - SSR */}
      <ReviewLoader
        title={"آراء عملائنا"}
        subtitle={
          "نفخر بثقة عملائنا وتجاربهم المميزة معنا. اطلع على تقييمات المسافرين الحقيقية عبر Google وشاهد كيف كانت رحلاتهم معنا من الحجز وحتى العودة."
        }
      />
    </div>
  );
}
