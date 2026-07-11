export interface packagesCountry {
  success: boolean
  message: string
  data: Daum[]
}

export interface Daum {
  seo: Seo
  _id: string
  name: string
  price: number
  rate: number
  header: Header
  country: Country
  descText: string
  slug: string
  alt: string
  imageCover: string
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

export interface Header {
  dayNumber: number
  nights: number
  location: string
  _id: string
}

export interface Country {
  _id: string
  name: string
  id: string
}
