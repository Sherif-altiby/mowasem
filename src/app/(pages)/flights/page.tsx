export const dynamic = "force-dynamic";
import PageSection from "@/components/layout/PageSection/PageSection";
import FlightBookForm from "@/components/page-components/Flight/FlightForm";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getSeoPage } from "@/services/Seo/seoPage";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import Script from "next/script";
import { Zap, Banknote, Headset } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";

export async function generateMetadata() {
  return getSeoMetadata("flights", "flights");
}

const features = [
  {
    icon: <Headset size={28} strokeWidth={1.5} />,
    title: "دعم مستمر",
    description:
      "فريقنا متواجد دائماً لمساعدتك في أي استفسار أو تعديل على الحجز لنضمن تجربة سفر مريحة وخالية من القلق.",
  },
  {
    icon: <Banknote size={28} strokeWidth={1.5} />,
    title: "أفضل الأسعار",
    description:
      "نقدم لك عروض وأسعار تنافسية على الرحلات إلى أشهر الوجهات العالمية، لتجد دائماً الخيار المناسب لميزانيتك.",
  },
  {
    icon: <Zap size={28} strokeWidth={1.5} />,
    title: "حجز سريع",
    description:
      "استمتع بتجربة حجز سهلة وسريعة من البداية للنهاية مع خطوات واضحة لتأمين رحلتك في دقائق قليلة.",
  },
];



export default async function FlightsPage() {
  let seoData = null as NormalPageSeo | null;

  try {
    seoData = (await getSeoPage("flights")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch flights seo:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "الطيران", item: `${baseUrl}/flights` },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${baseUrl}/flights`,
    name: seoData?.data?.seo?.metaTitle,
    description: seoData?.data?.seo?.metaDescription,
    inLanguage: "ar",
    isPartOf: { "@type": "WebSite", url: baseUrl, name: "مواسم" },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "حجز تذاكر الطيران",
    provider: { "@type": "Organization", name: "مواسم", url: baseUrl },
    areaServed: { "@type": "Place", name: "العالم" },
    availableChannel: { "@type": "ServiceChannel", serviceUrl: `${baseUrl}/flights` },
  };

  return (
    <>
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="relative mt-[-88px] min-h-[580px] bg-primary overflow-hidden flex flex-col justify-between items-center pt-40 pb-16">
         <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,.13) 0%, transparent 70%)",
            top: -160,
            right: -120,
          }}
        />

        {/* Eyebrow label */}
        <p className="relative z-10 text-primary text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
          مواسم · حجز الطيران
        </p>

        {/* Main headline */}
        <h1 className="relative z-10 text-center text-white font-extrabold leading-tight mb-6"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          احجز رحلتك الجوية
          <br />
          <span className=" text-[#E8DFC8]">بسهولة وثقة</span>
        </h1>

        <p className="relative z-10 text-center text-white/60 max-w-2xl leading-relaxed mb-10"
          style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)" }}>
          نقارن بين شركات الطيران العالمية لنقدم لك أفضل الأسعار وأنسب المواعيد
          — من الحجز حتى الوصول بكل راحة.
        </p>

        {/* Quick-stats bar */}
        <div className="relative z-10 flex items-center gap-8 md:gap-16 border border-white/10 rounded-2xl px-8 py-4 bg-white/5 backdrop-blur-sm">
          {[
            { n: "+500", l: "وجهة" },
            { n: "24/7", l: "دعم فوري" },
            { n: "3 دق", l: "وقت الحجز" },
          ].map(({ n, l }) => (
            <div key={l} className="text-center">
              <p className=" text-white font-bold text-xl md:text-2xl">{n}</p>
              <p className="text-white/50 text-xs mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </section>


      <PageSection className="md:!py-16">
        {/* ─── Booking Form ─────────────────────────────────────────── */}
   
          
 <SectionHeader
            title="   أين تريد أن تتجه؟"
            desc=" شاركنا وجهتك وتواريخ سفرك، وسيتواصل معك فريقنا بأفضل العروض المتاحة."
          />

          <FlightBookForm />
     
        {/* ─── Features ─────────────────────────────────────────────── */}
          <SectionHeader
            title="  سافر براحة واطمئنان"
            desc=" نوفر تجربة حجز طيران سهلة وسريعة مع أفضل العروض، دعم مستمر،
              وخيارات دفع آمنة لكل المسافرين.
            "
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-3xl bg-primary/5 p-8 flex flex-col group"
              >
                {/* Subtle corner glow */}
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors duration-500"
                />

                {/* Step number */}
                <span className="text-primary/20 font-extrabold text-6xl absolute top-4 left-6 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-5">
                  {feature.icon}
                </div>

                <h3 className="relative z-10 text-primary font-bold text-3xl mb-3">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-primary/55 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary to-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            ))}
          </div>
      </PageSection>

      <Script id="breadcrumb-schema-flights" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="webpage-schema-flights" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <Script id="service-schema-flights" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}