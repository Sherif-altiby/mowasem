export const dynamic = "force-dynamic";
import Script from "next/script";
import { getSeoPage } from "@/services/Seo/seoPage";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import { FiUser, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import { redirect } from "next/navigation";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
export async function generateMetadata() {
  return getSeoMetadata("atsl-bna", "contact");
}

async function handleSubmit(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message }),
  });

  if (!res.ok) {
    console.warn("❌ فشل الإرسال");
    return;
  }

  redirect("/contact/success");
}

export default async function ContactPage() {
  let seoData = null as NormalPageSeo | null;
  try {
    seoData = (await getSeoPage("contact")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch contact seo:", error);
  }
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  // ✅ Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: seoData?.data?.seo?.metaTitle || "تواصل معنا",
    description: seoData?.data?.seo?.metaDescription || "صفحة تواصل معنا",
    url: `${baseUrl}/contact`,
    breadcrumb: {
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
          name: "تواصل معنا",
          item: `${baseUrl}/contact`,
        },
      ],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/contact`,
    },
  };

  return (
    <div className="min-h-screen">
      <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container mx-auto pt-4 ">
        <Breadcrumb items={[{ href: "/contact", label: "تواصل معنا" }]} />

        <div className="max-w-4xl mx-auto secondary-page-layout">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Header Section */}
            <section className="flex flex-col gap-4 items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                {seoData?.data?.title || "تواصل معنا"}
              </h1>
              <p className="text-lg text-center">
                {seoData?.data?.description ||
                  "تواصل معنا للحصول على المزيد من المعلومات"}
              </p>
            </section>

            {/* Form Section */}
            <div className="p-4 md:p-12">
              <form action={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="أدخل اسمك الكامل"
                      className="w-full pr-10 pl-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-blue-100 transition-all"
                      required
                    />
                    <FiUser className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      className="w-full pr-10 pl-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-blue-100 transition-all"
                      required
                    />
                    <FiMail className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <div className="relative ">
                    <input
                      dir="ltr"
                      type="tel"
                      name="phone"
                      placeholder="+20 123 456 7890"
                      className="w-full pr-10 pl-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                    <FiPhone className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Message Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الرسالة
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full pr-10 pl-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                      required
                    ></textarea>
                    <FiMessageSquare className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-4 px-8 rounded-xl transition disabled:opacity-50"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
