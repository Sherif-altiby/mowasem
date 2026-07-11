export interface Airlines {
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
  imageCover: string
  createdBy: string
  createdAt: string
  updatedAt: string
  slug: string
  alt: string
  updatedBy: string
}

export interface Seo {
  changeFrequency: string
  noIndex: boolean
  noFollow: boolean
  noArchive: boolean
  noSnippet: boolean
}
