export interface Blogs {
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
  title: string;
  descText: string;
  description: string;
  tags: string[];
  images: string[];
  slug: string;
  alt: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  imageCover?: string;
  updatedBy?: string;
  timeToRead?: string | number;
}

export interface Seo {
  changeFrequency: string;
  noIndex: boolean;
  noFollow: boolean;
  noArchive: boolean;
  noSnippet: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  slugUrl?: string;
  priority?: number;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}
