import PageHeader from "@/components/common/PageHeader/PageHeader";
import React from "react";
import ShowMore from "@/components/common/ShowMore/ShowMore";
import PackageSlider from "./PackageSlider";
import { getPackages } from "@/services/PagesData/package";

export default async function PackageSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const data = await getPackages();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const packages = (data as any)?.data?.packages || [];

  if (!packages || packages.length === 0) return null;

  return (
    <div className="main-page-section container mb-8!">
      <PageHeader header={title} description={subtitle} />
      <PackageSlider data={data} />
      <ShowMore href="package-types" />
    </div>
  );
}
