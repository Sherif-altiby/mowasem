import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getGlobalSettings } from "@/services/PagesData/settingsService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { AboutSeo } from "@/types/Seo/about";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import AboutHero from "@/components/page-components/about/AboutHero";
import { unstable_cache } from "next/cache";
import { PlaneLanding, Tag, Headset, Globe, Building2, Smile } from "lucide-react";

export async function generateMetadata() {
  return getSeoMetadata("mn-nhn", "about");
}

export const revalidate = 3600;

// ← الحل: wrap كل service بـ unstable_cache
const getCachedSeoPage = unstable_cache(
  async () => getSeoPage("about"),
  ["seo-page-about"],
  { revalidate: 3600 }
);

const getCachedSettings = unstable_cache(
  async () => getGlobalSettings(),
  ["global-settings"],
  { revalidate: 3600 }
);

const aboutAchievements = [
  {
    icon: <PlaneLanding className="w-8 h-8" />,
    title: "حجز سهل وسريع",
    description:
      "نوفر نظام حجز بسيط وسلس يساعدك على البحث عن الرحلات والفنادق بسهولة ومقارنة الخيارات المختلفة",
  },
  {
    icon: <Tag className="w-8 h-8" />,
    title: "أفضل الأسعار والعروض",
    description:
      "نعمل على تقديم أفضل الأسعار والعروض الحصرية على الطيران والفنادق وباقات السفر",
  },
  {
    icon: <Headset className="w-8 h-8" />,
    title: "دعم متواصل",
    description:
      "فريق خدمة العملاء لدينا جاهز لمساعدتك في أي وقت ومساندتك في جميع مراحل رحلتك قبل الحجز وأثناء السفر.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "خيارات سفر متنوعة",
    description:
      "نقدم مجموعة واسعة من الوجهات والرحلات والفنادق حول العالم، مما يمنحك حرية اختيار الرحلة التي تناسبك.",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "شركاء موثوقون",
    description:
      "نتعاون مع شركات طيران وفنادق معروفة لضمان تقديم خدمات عالية الجودة وتجربة سفر آمنة ومريحة لعملائنا.",
  },
  {
    icon: <Smile className="w-8 h-8" />,
    title: "تجربة سفر مريحة",
    description:
      "هدفنا هو أن نجعل كل خطوة في رحلتك أسهل، من التخطيط والحجز وحتى الوصول إلى وجهتك والاستمتاع بتجربة لا تُنسى.",
  },
];

const AboutPage = async () => {
  let data = null as AboutSeo | null;
  let settings = null;

  try {
    data = (await getCachedSeoPage()) as AboutSeo;
  } catch (error) {
    console.error("Failed to fetch seo config:", error);
  }

  try {
    settings = await getCachedSettings();
  } catch (error) {
    console.error("Failed to fetch global settings:", error);
  }

  const phones = settings?.data?.contactInfo?.phones || [];
  const mainPhoneNumber = phones?.[0]
    ? phones[0].countryCode + phones[0].number
    : "";
  const emails = settings?.data?.contactInfo?.emails || [];
  const mainEmail = emails?.[0]?.email || "";

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: data?.data?.seo?.metaTitle || "عن شركتنا",
    description: data?.data?.seo?.metaDescription || "معلومات عن شركتنا",
    url: `${baseUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "مواسم",
      url: baseUrl,
      description: data?.data?.seo?.metaDescription || "وصف شركتك هنا",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: mainPhoneNumber,
        email: mainEmail,
        availableLanguage: ["ar", "en"],
      },
    },
  };

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
        name: "عن الشركة",
        item: `${baseUrl}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, breadcrumbSchema]),
        }}
      />

      <div className="min-h-screen mt-[-88px]">
        <div>
          {/* Hero */}
          <AboutHero />

          {/* (Why clients trust us) section - Updated Design */}
          <div className="py-12">
            <SectionHeader
              title="لماذا يثق بنا عملاؤنا"
              desc="نحرص على تقديم تجربة سفر سهلة وموثوقة لعملائنا من خلال خدمات احترافية، عروض مميزة، ودعم مستمر في كل خطوة من رحلتك."
            />

            <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {aboutAchievements.map((item, index) => (
                <div
                  key={index}
                  className="group bg-primary/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-10 
                   shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500
                   relative overflow-hidden"
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-[100px] group-hover:from-primary/10 transition-colors" />

                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl md:text-[28px] font-bold text-primary mb-4 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15.5px] md:text-base">
                    {item.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="h-1 w-12 bg-primary mt-8 rounded-full group-hover:w-20 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
