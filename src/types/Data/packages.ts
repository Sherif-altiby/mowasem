export interface PackagesResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  packages: Packages[];
  packageType: PackageType;
}

export interface PackageType {
  id: string;
  name: string;
  slug: string;
  description: string;
  descText: string;
  alt: string;
  isActive: boolean;
  seo: Seo;
  createdAt: string;
  updatedAt: string;
}

export interface Packages {
  seo: Seo;
  _id: string;
  name: string;
  alt: string;
  imageCover: string;
  descText: string;
  slug: string;
  country: Country;
  cities: City[];
}

export interface Country {
  _id: string;
  name: string;
}

export interface City {
  _id: string;
  name: string;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  slugUrl: string;
  priority: number;
  changeFrequency: string;
  noIndex: boolean;
  noFollow: boolean;
  noArchive: boolean;
  noSnippet: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}
