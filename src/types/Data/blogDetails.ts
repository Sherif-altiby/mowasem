export interface BlogDetails {
  success: boolean;
  message: string;
  data: {
    blog: Data;
    relatedBlogs: {
      _id: string;
      title: string;
      tags: string[];
      imageCover: string;
      timeToRead: number;
      publishedAt: string;
      slug: string;
    }[];
  };
}

export interface Data {
  seo: Seo;
  _id: string;
  title: string;
  descText: string;
  description: string;
  tags: string[];
  images: string[];
  slug: string;
  alt: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  imageCover: string;
  updatedBy: string;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  slugUrl: string;
  priority: number;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  changeFrequency: string;
  noIndex: boolean;
  noFollow: boolean;
  noArchive: boolean;
  noSnippet: boolean;
}
