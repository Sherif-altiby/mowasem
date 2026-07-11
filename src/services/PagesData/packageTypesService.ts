import { getData } from "../apiBase";
import { PackageTypes } from "@/types/Data/packageTypes";
import { PackageDetails } from "@/types/Data/packageDetails";
import { PackagesResponse } from "@/types/Data/packages";

// get package types

export const getPackageTypes = () => getData<PackageTypes>("/packageTypes");

// get countries by package type
export const getPackagesPackageType = (packageTypeSlug: string) =>
  getData<PackagesResponse>(`/packageTypes/slug/${packageTypeSlug}`);

// get package details
export const getPackagesDetails = (
  packageTypeSlug: string,
  packageSlug: string,
) =>
  getData<PackageDetails>(
    `/packageTypes/${packageTypeSlug}/packages/${packageSlug}`,
  );

export const getPackagesReviews = (packageSlug: string) =>
  getData(`/rates/package/${packageSlug}`);
