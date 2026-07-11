export interface HotelDetails {
  success: boolean;
  message: string;
  data: {
    hotel: HotelData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    similarHotels: any[];
  };
}

export interface HotelData {
  _id?: string;
  hotel_id?: string;
  hotel_name?: string;
  name?: string;
  hotel_translated_name?: string;
  star_rating?: number;
  stars?: number;
  rating_average?: number;
  rating?: number;
  ratingWord?: string;
  ratingCount?: number;
  number_of_reviews?: number;
  overview?: string;
  description?: string;
  addressline1?: string;
  address?: string;
  zipcode?: string;
  city?: City | string;
  country?: Country | string;
  continent_name?: string;
  longitude?: number;
  latitude?: number;
  numberrooms?: number;
  numberfloors?: number;
  checkin?: string;
  checkout?: string;
  images: string[] | { all?: string[]; room?: string[]; lobby?: string[]; restaurant?: string[]; facilities?: string[]; property?: string[] };
  imageCover?: string;
  isActive?: boolean;
  slug?: string;
  seo?: Seo;
  price?: {
    min?: string;
    max?: string;
    currency?: string;
    amount?: number;
  } | number;
  currency?: string;
  website?: string;
  url?: string;
  includes?: { _id?: string; icon: string; title: string }[];
  facilities?: string[];
  policies?: {
    _id?: string;
    title: string;
    description: string;
    icon: string;
  }[] | {
    checkIn?: { from?: string; until?: string };
    checkOut?: { from?: string; until?: string };
    rules?: string[];
    children?: string[];
    internet?: string[];
    pets?: string[];
    parking?: string[];
    cancellation?: string[];
  };
  rooms?: {
    _id?: string;
    id?: string;
    title?: string;
    name?: string;
    description: string;
    image?: string;
    photos?: string[];
    price: number | string;
    currency?: string;
    area?: string | number;
    maxAdults?: number;
    highlights?: string[];
    bedOptions?: string;
    occupancy?: { adults?: number; children?: number; maxOccupancy?: string };
    facilities?: string[];
    cancellation?: { free?: boolean; text?: string };
    mealPlan?: string;
  }[];
  reviews?: Review[];
  contact?: {
    phone?: string;
    email?: string;
  };
}

export interface Review {
  _id?: string;
  author?: string;
  rating?: number;
  comment?: string;
  date?: string;
}

export interface City {
  _id: string;
  name: string;
}

export interface Country {
  _id: string;
  name: string;
  id: string;
}

export interface Price {
  min: string;
  max: string;
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
