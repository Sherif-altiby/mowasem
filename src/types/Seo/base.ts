export interface Root {
  status: string
  data: Data
}

export interface Data {
  _id: string
  title: string
  pageType: string
  slug: string
  alt: string
  seo: Seo
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Seo {
  metaTitle: string
  metaDescription: string
  keywords: string
  priority: number
  changeFrequency: string
  noIndex: boolean
  noFollow: boolean
  noArchive: boolean
  noSnippet: boolean
  ogTitle: string
  ogDescription: string
  ogImage: string
}
