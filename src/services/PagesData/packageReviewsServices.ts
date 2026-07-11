import { getDataBySlug, postData } from "../apiBase";

export const getPackageReviews = (slug: string) =>
  getDataBySlug("/rates/package", slug);

export const createPackageReview = (data: {
  package: string;
  rate: number;
  content: string;
  authorName: string;
}) => postData("/rates", data);
