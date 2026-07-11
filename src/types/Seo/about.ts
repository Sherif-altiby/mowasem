import { Seo } from "./base";

export interface AboutSeo {
  status: string;
  data: Data;
}

export interface Data {
  seo: Seo;
  alt: string;
  _id: string;
  slug: string;
  title: string;
  pageType: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  sections: Sections;
}

export interface Sections {
  achievements: Achievement[];
  stats: Stat[];
  ourGoals: OurGoal[];
}

export interface Achievement {
  title: string;
  subtitle: string;
  description: string;
}

export interface Stat {
  title: string;
  subtitle: string;
  description: string[];
}

export interface OurGoal {
  title: string;
  description: string;
}
