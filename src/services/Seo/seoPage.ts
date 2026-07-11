import { NormalPageSeo } from "@/types/Seo/normalPage";

export const getSeoPage = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo-pages/${slug}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(5000)
      }
    );
    if (!res.ok) return fallbackSeo;
    return res.json();
  } catch (error) {
    // Catch TimeoutError (AbortError) and any network errors
    const name = (error as { name?: string })?.name;
    if (name === "TimeoutError" || name === "AbortError") {
      console.warn(`getSeoPage timeout for slug: ${slug}`);
    } else {
      console.error("Fetch error in getSeoPage:", error);
    }
    return fallbackSeo;
  }
};

const fallbackSeo: NormalPageSeo = {
  status: "fallback",
  data: {
    _id: "fallback",
    title: "",
    subtitle: "",
    description: "",
    descText: "",
    pageType: "page",
    slug: "",
    alt: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      noIndex: false,
      noFollow: false,
      noArchive: false,
      noSnippet: false,
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    createdBy: "",
    createdAt: "",
    updatedAt: "",
  },
};
