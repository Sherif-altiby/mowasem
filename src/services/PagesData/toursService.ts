import { getData } from "../apiBase";
import { TourDetails } from "@/types/Data/tourDetails";

export const getTours = async (params?: Record<string, string>) => {
  try {
    const queryParams = { limit: "10", ...params };
    const query = new URLSearchParams(queryParams).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tours?${query}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    return await res.json();
  } catch (error) {
    console.warn("getTours timeout or error:", error);
    return null;
  }
};

export const getTourbySlug = (slug: string) =>
  getData<TourDetails>(`/tours/${slug}`);
