export interface City {
  status: string;
  results: number;
  data: Data;
}

export interface Data {
  data: Daum[];
}

export interface Daum {
  coordinates: Coordinates;
  seo: Seo;
  _id: string;
  name: string;
  country: Country;
  description: string;
  descText: string;
  favTime: string[];
  favMonth: string[];
  images: string[];
  imageCover: string;

  createdBy: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  alt: string;
}

export interface Country {
  _id: string;
  name: string;
  id: string;
}
export interface Coordinates {
  lat: number;
  lng: number;
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