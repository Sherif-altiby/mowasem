// TourGuide list response — from GET /tourguides
// Returns: { success: boolean, data: TourGuide[] }
// Each TourGuide links to a Country and Cities document.
export interface ToursGuide {
  success: boolean;
  data: Daum[];
}

export interface Daum {
  _id: string;
  country: Country;
  cities: City[];
  isPopular: boolean;
  introduction?: {
    ar: string;
    en: string;
  };
   imageCover?: {
    url: string;
  };
  features?: Feature[];
  restaurants?: Place[];
  thingsToDo?: Place[];
  hotels?: Place[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Country {
  _id: string;
  name: string;
  slug: string;
  code?: string;
  continent: string;
  imageCover?: {
    url: string;
    public_id: string;
  };
  introduction?: {
    ar: string;
    en: string;
  };
  language?: string;
  descText?: string;
  description?: string;
}

export interface City {
  _id: string;
  name: string;
  slug: string;
}

export interface Feature {
  title?: string;
  icon?: string;
  description?: string;
}

export interface Place {
  _id: string;
  type: string;
  images: Image[];
  rating: number;
  reviewsCount: number;
  location: Location;
  priceLevel: PriceLevel;
  features: Feature[];
  duration?: Duration;
  bookingUrl?: string;
}

export interface Image {
  url: string;
  alt: {
    en: string;
    ar: string;
  };
  isCover: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: {
    en: string;
    ar: string;
  };
  googleMapsUrl: string;
}

export interface PriceLevel {
  currency: string;
  amount: number;
}

export interface Duration {
  en: string;
  ar: string;
}
