export interface PackageTypes {
  status: string;
  results: number;
  data: Data;
}

export interface Data {
  data: Daum[];
}

export interface Daum {
  seo: Seo;
  _id: string;
  name: string;
  description: string;
  descText: string;
  imageCover: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  alt: string;
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