export interface singleCity {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  city: City;
  packages: Package[];
  cityWeather: CityWeather;
}

export interface City {
  seo: Seo;
  _id: string;
  name: string;
  country: Country;
  description: string;
  descText: string;
  favTime: string[];
  favMonth: string[];
  images: string[];
  slug: string;
  alt: string;
  imageCover: string;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  slugUrl: string;
  priority: number;
  changeFrequency: string;
  noIndex: boolean;
  noFollow: boolean;
  noArchive: boolean;
  noSnippet: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}
export interface Country {
  _id: string;
  name: string;
  id: string;
}
export interface Package {
  seo: Seo2;
  _id: string;
  name: string;
  price: number;
  rate: number;
  header: Header;
  packageType: string;
  itinerary: Itinerary[];
  includes: string[];
  excludes: string[];
  country: string;
  city: string;
  images: string[];
  description: string;
  descText: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  alt: string;
  __v: number;
  imageCover: string;
  updatedBy: string;
}

export interface Seo2 {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  slugUrl: string;
  priority: number;
  changeFrequency: string;
  noIndex: boolean;
  noFollow: boolean;
  noArchive: boolean;
  noSnippet: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export interface Header {
  dayNumber: number;
  nights: number;
  location: string;
  _id: string;
}

export interface Itinerary {
  day: number;
  title: string;
  description: string;
  _id: string;
}

export interface CityWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
