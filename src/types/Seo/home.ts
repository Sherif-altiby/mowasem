import { Seo } from "./base";

export interface HomeSeo {
  status: string;
  data: Data;
}

export interface Data {
  _id: string;
  title: string;
  pageType: string;
  slug: string;
  alt: string;
  seo: Seo;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sections: Sections;
}

export interface Sections {
  ourServices: OurServices;
  promotion: Promotion;
  ourTours: OurTours;
  ourOffers: OurOffers;
  flights: Flights;
  ourHotels: OurHotels;
  tourGuide: TourGuide;
  packages: Packages;
}

export interface OurServices {
  title: string;
  subtitle: string;
}
export interface Packages {
  title: string;
  subtitle: string;
}

export interface Promotion {
  title: string;
  subtitle: string;
}

export interface OurTours {
  title: string;
  subtitle: string;
}

export interface OurOffers {
  title: string;
  subtitle: string;
}

export interface Flights {
title: string;
subtitle: string;
}

export interface OurHotels {
  title: string;
  subtitle: string;
}

export interface TourGuide {
  title: string;
  subtitle: string;
}
