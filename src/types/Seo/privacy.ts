import { Seo } from "./base"

export interface PrivacySeo {
  status: string
  data: Data
}

export interface Data {
  _id: string
  title: string
  description: string
  pageType: string
  slug: string
  alt: string
  seo: Seo
  createdBy: string
  createdAt: string
  updatedAt: string
  sections: Sections
}


export interface Sections {
  privacyData: PrivacyDaum[]
}

export interface PrivacyDaum {
  title: string
  subtitle: string
}
