export interface Root {
  status: string
  data: Data
}

export interface Data {
  data: Daum[]
  settings: Settings
}

export interface Daum {
  seo: Seo
  _id: string
  name: string
  imageCover: string
  description: string
  descText: string
  method: string
  summary: string
  alt: string
  createdAt: string
  updatedAt: string
  slug: string
  __v: number
  id: string
}

export interface Seo {
  changeFrequency: string
  noIndex: string
  noFollow: string
  noArchive: string
  noSnippet: string
}

export interface Settings {
  _id: string
  contactInfo: ContactInfo
}

export interface ContactInfo {
  phones: Phone[]
}

export interface Phone {
  number: string
  label: string
  isPrimary: boolean
  isWhatsApp: boolean
  countryCode: string
  _id: string
}
