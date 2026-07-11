export interface GlobalSettings {
  status: string;
  data: Data;
}

export interface Data {
  contactInfo: ContactInfo;
  socialMedia: SocialMedia;
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ContactInfo {
  addresses: string[];   // ← backend model uses 'addresses', not 'address'
  phones: Phone[];
  emails: Email[];
}

export interface Phone {
  number: string;
  label: string;
  isPrimary: boolean;
  isWhatsApp: boolean;
  countryCode: string;
  _id: string;
}

export interface Email {
  email: string;
  label: string;
  isPrimary: boolean;
  department: string;
  _id: string;
}

export interface SocialMedia {
  facebook: Facebook;
  instagram: Instagram;
  youtube: Youtube;
  twitter: Twitter;
  tiktok: Tiktok;
  snapchat: Snapchat;
  linkedin: Linkedin;
  whatsApp: WhatsApp;
}

export interface Facebook {
  name: string;
  mobileImage: string;
  deskTopImage: string;
  url: string;
}

export interface Instagram {
  name: string;
  mobileImage: string;
  deskTopImage: string;
  url: string;
}

export interface Youtube {
  name: string;
  mobileImage: string;
  deskTopImage: string;
  url: string;
}

export interface Twitter {
  name: string;
  mobileImage: string;
  deskTopImage: string;
  url: string;
}

export interface Tiktok {
  name: string;
  mobileImage: string;
  deskTopImage: string;
  url: string;
}

export interface Snapchat {
  name: string;
  mobileImage: string;
  deskTopImage: string;
  url: string;
}

export interface Linkedin {
  name: string;
  mobileImage: string;
  deskTopImage: string;
  url: string;
}

export interface WhatsApp {
  name: string;
  mobileImage: string;
  deskTopImage: string;
  url: string;
}
