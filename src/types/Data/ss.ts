export interface Package {
  status: string
  results: number
  data: Data
}

export interface Data {
  data: Daum[]
}

export interface Daum {
  seo: Seo
  _id: string
  name: string
  price: string
  rate: string
  header: Header
  packageType: PackageType
  itinerary: Itinerary[]
  includes: string[]
  excludes: string[]
  country?: Country
  cities: string[]
  imageCover?: string
  images: string[]
  description: string
  descText: string
  createdBy: string
  createdAt: string
  updatedAt: string
  slug: string
  alt: string
  updatedBy?: string
  city?: string
}

export interface Seo {
  changeFrequency: string
  noIndex: string
  noFollow: string
  noArchive: string
  noSnippet: string
  metaTitle?: string
  keywords?: string
  slugUrl?: string
  metaDescription?: string
  priority?: string
  ogTitle?: string
  ogImage?: string
  ogDescription?: string
}

export interface Header {
  dayNumber: string
  nights: string
  location: string
  _id: string
}

export interface PackageType {
  slug: string
}

export interface Itinerary {
  day: number
  title: string
  description: string
  _id: string
}

export interface Country {
  slug: string
  id: string
}
