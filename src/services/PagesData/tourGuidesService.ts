import { ToursGuide } from "@/types/Data/toursGuide";
import { getData } from "../apiBase";
import { singleTourGuide } from "@/types/Data/tourGuideDetails";

export const getTourGuides = async () => {
  try {
    return await getData<ToursGuide>(`/tourguides`);
  } catch (error) {
    console.warn("getTourGuides timeout or error:", error);
    return null;
  }
};

export const getTourGuideBySlug = (slug: string) =>
  getData<singleTourGuide>(`/tourguides/${slug}`);

