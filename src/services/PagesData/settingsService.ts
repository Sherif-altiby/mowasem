import { GlobalSettings } from "@/types/Data/globalSettings";
import { getData } from "../apiBase";
import { unstable_cache } from "next/cache";

const cachedGetGlobalSettings = unstable_cache(
  async () => {
    try {
      const result = await getData<GlobalSettings>(`/settings`);
      // Handle cases where the backend returns a PromiseSettledResult or an error object
      if (!result || result.status === "rejected" || !result.data) {
        console.error("Settings API returned an error or empty data:", result);
        return null;
      }
      return result;
    } catch (error) {
      // لو في مشكلة هنا مش هيوقف الـ build نهائيًا
      console.error("Failed to load global settings:", error);
      return null;
    }
  },
  ["global-settings"],
  { revalidate: 3600, tags: ["settings"] }
);

export const getGlobalSettings = cachedGetGlobalSettings;
