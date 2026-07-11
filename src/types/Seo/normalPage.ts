import { Seo } from "./base"

export interface NormalPageSeo {
  status: string
  data: Data
}

export interface Data {
  _id: string
  title: string
  subtitle: string
  description: string
  descText: string
  pageType: string
  slug: string
  alt: string
  seo: Seo
  createdBy: string
  createdAt: string
  updatedAt: string
  
}




