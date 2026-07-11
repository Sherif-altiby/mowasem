import { Seo } from "../Seo/base";

export interface PackageDetails {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  pkg: Pkg;
  branches: Branch[];
  relatedPackages: RelatedPackages[];
}

export interface RelatedPackages {
  descText: string;
  name: string;
  slug: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  _id: string;
}

export interface Pkg {
  _id: string;
  name: string;
  slug: string;
  descText: string;
  description: string;
  images: string[];
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  packageType: PackageType;
  country: Country;
  cities: City[];
  seo: Seo;
}
export interface PackageType {
  _id: string;
  name: string;
}

export interface Country {
  _id: string;
  name: string;
}

export interface City {
  _id: string;
  description: string;
  imageCover: string;
  slug: string;
  name: string;
}

export interface Branch {
  _id: string;
  name: string;
  slug?: string;
  alt?: string;
  package: string;
  daysCount: number;
  nightsCount: number;
  price: number;
  includes?: string[];
  excludes?: string[];
  days?: Day[];
  seo?: Seo;
  createdAt?: string;
  updatedAt?: string;
  cities?: City[];
}

export interface Day {
  dayNumber: number;
  type: string;
  tour: Tour;
  customTitle?: string;
  customDescription?: string;
}
export interface Tour {
  _id: string;
  title: string;
  description: string;
  descText: string;
  city: string;
  country: string;
  includes: string[];
  excludes: string[];
  header: string;
  paths: string[];
  images: string[];
  seo: Seo;
  createdAt: string;
  updatedAt: string;
}
