export interface Hotels {
  success: boolean;
  count?: number;
  results?: number;
  pagination?: {
    totalHotels: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
  data: HotelsData;
}

export interface HotelsData {
  hotels: Daum[];
}
export interface Daum {
  _id: string;
  hotel_id?: string;
  name: string;
  hotel_translated_name?: string;
  star_rating?: number;
  stars?: number;
  price: number | { amount: number; currency: string };
  currency: string;
  hotelId: string | number;
  rating_average?: number;
  rating?: number;
  ratingWord?: string;
  number_of_reviews?: number;
  numberrooms?: number;
  numberfloors?: number;
  addressline1?: string;
  address?: string;
  zipcode?: string;
  description?: string;
  overview?: string;
  country?: Country;
  city?: City;
  continent_name?: string;
  latitude?: number;
  longitude?: number;
  checkin?: string;
  checkout?: string;
  url?: string;
  images: string[];
  image: string;
  slug?: string;
  alt?: string;
  seo: Seo;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface Price {
  min: string;
  max: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  slugUrl?: string;
  priority?: number;
  changeFrequency?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  noArchive?: boolean;
  noSnippet?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface Country {
  _id: string;
  name: string;
  id?: string;
}

export interface City {
  _id: string;
  name: string;
}
