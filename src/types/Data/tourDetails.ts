import { Seo } from "../Seo/base";

export interface TourDetails {
  success: boolean;
  data: Data;
}

export interface Data {
  _id: string;
  productCode: string;
  title: string;
  description: string;
  shortDescription?: string;
  rating?: {
    average: number;
    count: number;
  };
  price?: {
    amount: number;
    currency: string;
  };
  duration: number | string;
  city: string | { name?: string; slug?: string; coordinates?: { lat?: string; lon?: string }; country?: { name?: string; slug?: string } } | null;
  slug: string;
  images: Image[];
  cancellationPolicy?: string | { type?: string; description?: string } | null;
  isInstantConfirmation?: boolean;
  isFreeCancellation?: boolean;
  timeZone?: string | null;
  exclusions: string[];
  inclusions: string[];
  program: ProgramItem[];
  packages: Package[];
  source: string;
  seo?: Seo;
  coordinates?: {
    lat: number;
    lng: number;
  };
  location?: string;
  country?: { name?: string } | null;
  itinerary?: {
    itineraryItems?: ItineraryItem[];
  };
  logistics?: {
    travelerPickup?: {
      additionalInfo?: string;
    };
  };
  additionalInfo?: (string | { description?: string })[];
  productOptions?: ProductOption[];
  tags?: string[];
  isSavedByUser?: boolean;
}

export interface Image {
  url: string;
  alt: string;
  isCover: boolean;
}

export interface Package {
  _id: string;
  name: string;
  slug: string;
  price?: number | null;
  currency?: string | null;
  inclusions: string[];
  exclusions: string[];
}

export interface ProductOption {
  _id: string;
  id: string;
  optionCode: string;
  title: string;
  packageDescription: string[];
  termsAndConditions: string[];
  howToUse: string[];
  price: number;
  currency: string;
}

export interface ItineraryItem {
  description?: string;
  duration?: {
    fixedDurationInMinutes?: number;
  };
}

export interface ProgramItem {
  duration?: {
    fixedDurationInMinutes?: number;
  };
  passByWithoutStopping?: boolean;
  admissionIncluded?: string;
  description?: string;
}
