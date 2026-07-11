"use client";

import { useState } from "react";
import PackageCard from "./PackageCard";

type Package = {
  _id: string;
  id?: string;
  name?: string;
  title?: string;
  slug?: string;
  price?: number | null;
  currency?: string | null;
  inclusions?: string[];
  exclusions?: string[];
  packageDescription?: string[];
  termsAndConditions?: string[];
  howToUse?: string[];
};

type TourPackagesProps = {
  packages: Package[];
};

const TourPackages = ({ packages }: TourPackagesProps) => {
  const [selectedId, setSelectedId] = useState<string>(
    packages[0]?._id ?? packages[0]?.id ?? ""
  );

  if (!packages.length) return null;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg._id || pkg.id}
          name={pkg.name || pkg.title || ""}
          inclusions={pkg.inclusions || pkg.packageDescription || []}
          exclusions={pkg.exclusions || pkg.termsAndConditions || []}
          howToUse={pkg.howToUse}
          price={pkg.price}
          currency={pkg.currency}
          isSelected={selectedId === (pkg._id || pkg.id)}
          onClick={() => setSelectedId(pkg._id || pkg.id || "")}
        />
      ))}
    </div>
  );
};

export default TourPackages;
