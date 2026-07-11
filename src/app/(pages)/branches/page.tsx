import { Metadata } from "next";
import BranchesContent from "@/components/branches/BranchesContent";
import { getSeoPage } from "@/services/Seo/seoPage";
import { getOfficeBranches } from "@/services/PagesData/officeBranchesService";


export async function generateMetadata(): Promise<Metadata> {
    let seoPage: { seo?: { metaTitle?: string; metaDescription?: string; keywords?: string; ogTitle?: string; ogDescription?: string; ogImage?: string; noIndex?: string; noFollow?: string; noArchive?: string; noSnippet?: string } } | null = null;
    try {
        const response = await getSeoPage("branches");
        seoPage = response?.data;
    } catch {
        // SEO page not found, use default metadata
        console.warn("SEO data not found for branches, using defaults");
    }

    const seo = seoPage || {};

    const title = seo?.seo?.metaTitle || "الفروع";
    const description = seo?.seo?.metaDescription;
    const keywords = seo?.seo?.keywords;
    const ogTitle = seo?.seo?.ogTitle;
    const ogDescription = seo?.seo?.ogDescription;
    const ogImage = seo?.seo?.ogImage;
    const canonicalUrl = "/branches";
    const strToBool = (str: string | undefined) => str === "true";

    return {
        title,
        description,
        keywords: Array.isArray(keywords) ? keywords : keywords?.split(","),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                ar: `/branches`,
            },
        },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: canonicalUrl,
            images: ogImage ? [{
                url: ogImage,
                width: 1200,
                height: 630,
                alt: ogTitle,
            }] : [],
            locale: "ar_AR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: ogTitle,
            description: ogDescription,
            images: ogImage ? [ogImage] : [],
        },
        robots: seo?.seo ? {
            index: !strToBool(seo.seo.noIndex),
            follow: !strToBool(seo.seo.noFollow),
            noarchive: strToBool(seo.seo.noArchive),
            nosnippet: strToBool(seo.seo.noSnippet),
            googleBot: {
                index: !strToBool(seo.seo.noIndex),
                follow: !strToBool(seo.seo.noFollow),
                noarchive: strToBool(seo.seo.noArchive),
                nosnippet: strToBool(seo.seo.noSnippet),
            },
        } : undefined,
    };
}

const Branches = async () => {
    let branchesData = null;
    try {
        branchesData = await getOfficeBranches();
    } catch (error) {
        console.error("Failed to fetch office branches:", error);
    }
    console.log("branchesData:", branchesData);

    return (
        <section className="h-[calc(100vh-180px)]  mt-32 md:mt-42  m-5 md:m-10  relative overflow-hidden rounded-[32px] md:rounded-[48px]">
            <BranchesContent branchesData={branchesData} />
        </section>
    );
};

export default Branches;
