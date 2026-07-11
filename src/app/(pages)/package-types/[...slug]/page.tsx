import React from "react";
import PackageDetails from "@/components/page-components/PackageTypes/PackacgeDetails/PackacgeDetails";
import PackagesSection from "@/components/page-components/PackageTypes/PackagesSection/PackagesSection";
import { getSeoMetadata, mapSeoToMetadata } from "@/helper/getSeoMetadata";
import { getPackagesDetails } from "@/services/PagesData/packageTypesService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (slug.length === 1) {
    return getSeoMetadata(slug[0], `package-types/${slug[0]}`);
  }

  if (slug.length === 2) {
    try {
      const data = await getPackagesDetails(slug[0], slug[1]);
      return mapSeoToMetadata(data?.data?.pkg?.seo, "package-types", slug);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { title: "Package Details" };
    }
  }
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (slug.length === 1) {
    /* package-types/World-packages */
    return <PackagesSection slug={slug} />;
  }

  if (slug.length === 2) {
    // package-types/World-packages/go-To-Mecca
    return <PackageDetails slug={slug} />;
  }
}
