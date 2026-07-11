import { Seo } from "../Seo/base";

export interface Tours {
  success: boolean;
  count: number;
  total: number;
  priceRange?: {
    min: number;
    max: number;
  };
  pagination: Pagination;
  tours: Daum[];
}

export interface Pagination {
  page: number;
  pages: number;
  limit: number;
}

export interface Daum {
  seo?: Seo;
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  city?: string;
  country?: Country;
  includes?: string[];
  paths?: Path[];
  price?: {
    amount: number;
    currency: string;
  };
  rating?: {
    average: number;
    count: number;
  };
  images?: {
    url: string;
    caption?: string;
    captionAr?: string;
    isCover?: boolean;
  }[];
  coverImage?: {
    url: string;
    alt: string;
  };
  rawViatorData?: {
    images?: {
      url: string;
      caption?: string;
      captionAr?: string;
      isCover?: boolean;
    }[];
  };
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  alt?: string;
  id?: string;
  source?: string;
  duration?: number;
  descText?: string;
}

export interface City {
  _id: string;
  name: string;
}

export interface Country {
  _id: string;
  name: string;
  id: string;
}

export interface Path {
  title: string;
  duration: string;
  description: string;
  descText: string;
  _id: string;
}

export interface Header {
  days: number;
  people: number;
  type: string;
  _id: string;
}
