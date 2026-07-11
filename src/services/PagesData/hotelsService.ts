import { Hotels } from "@/types/Data/hotels";
import { getData } from "../apiBase";
import { HotelDetails } from "@/types/Data/hotelDetails";

export const getHotels = async (params?: {
  city?: string;
  country?: string;
  page?: number;
  limit?: number;
  q?: string;
}) => {
  try {
    const query = new URLSearchParams();
    if (params?.city) query.append("city", params.city);
    if (params?.country) query.append("country", params.country);
    if (params?.page) query.append("page", params.page.toString());
    // Default limit to 6 for homepage, can be overridden
    const limit = params?.limit || 6;
    query.append("limit", limit.toString());
    if (params?.q) query.append("q", params.q);

    const queryString = query.toString();
    return await getData<Hotels>(`/hotels${queryString ? `?${queryString}` : ""}`);
  } catch (error) {
    console.warn("getHotels timeout or error:", error);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHotelCountries = () => getData<any>(`/hotels/countries`);

export const getSingleHotel = (hotelId: string) =>
  getData<HotelDetails>(`/hotels/${hotelId}`, { timeout: 60000 }); // 60 seconds timeout for hotel details
