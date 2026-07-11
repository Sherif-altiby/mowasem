import { Root } from "@/types/Data/services";
import { getData } from "../apiBase";

export const getServices = async () => {
  try {
    return await getData<Root>(`/services`);
  } catch (error) {
    console.warn("getServices timeout or error:", error);
    return { status: "fallback", data: { data: [], settings: { _id: "", contactInfo: { phones: [] } } } };
  }
};
