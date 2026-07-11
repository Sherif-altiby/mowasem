export interface Offers {
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
  offer: number
  alt: string
  name: string
  description: string
  descText: string
  price: number
  oldPrice: number
  createdBy: string
  createdAt: string
  updatedAt: string
  imageCover: string
  updatedBy: string
}

export interface Seo {
  changeFrequency: string
  noIndex: boolean
  noFollow: boolean
  noArchive: boolean
  noSnippet: boolean
}
