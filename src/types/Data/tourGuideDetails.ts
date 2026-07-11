export interface singleTourGuide {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  seo: Seo;
  _id: string;
  name: string;
  code: string;
  continent: string;
  currency: string;
  language: string;
  description: string;
  descText: string;
  favTime: string[];
  favMonth: string[];
  isActive: boolean;
  images: string[];
  introduction: string;
  cities: {
    images: string[];
    name: string;
    slug: string;
    _id: string;
  }[];
  country: {
    name: string;
    slug: string;
    continent: string;
    descText: string;
    description: string;
    imageCover: {
      url: string;
    };
    language: string;
    _id: string;
    tripDuration: string;
    requiredVisaDocuments: string;
    bestTimeToVisit: string;
  };
  imageCover: string;
  slug: string;
  alt: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
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
