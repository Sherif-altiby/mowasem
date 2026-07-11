import { Seo } from "./base"

export interface FlightSeo {
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
  sections: Sections
}



export interface Sections {
  flights: Flights
}

export interface Flights {
  title: string
  subtitle: string
  description: string[]
  image: string
  header: string
  btnText: string
}
