import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getData, postData } from "@/lib/api/client";
import { GlobalSettings } from "@/types/Data/globalSettings";

// Cache time configurations (in milliseconds)
export const CACHE_TIMES = {
  SHORT: 2 * 60 * 1000,      // 2 minutes - frequently changing data
  MEDIUM: 5 * 60 * 1000,     // 5 minutes - moderate change frequency
  LONG: 15 * 60 * 1000,      // 15 minutes - rarely changing data
  VERY_LONG: 30 * 60 * 1000, // 30 minutes - static data
};

// Generic GET hook with caching
export function useApiGet<T>(
  queryKey: readonly unknown[],
  url: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  return useQuery({
    queryKey,
    queryFn: () => getData<T>(url),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? CACHE_TIMES.MEDIUM,
    gcTime: options?.gcTime ?? CACHE_TIMES.LONG,
    refetchOnWindowFocus: false,
  });
}

// Generic POST hook
export function useApiPost<T, P = unknown>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: readonly unknown[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: P) => postData<P, T>(url, payload) as Promise<T>,
    onSuccess: (data) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

// Settings hooks
export function useGlobalSettings() {
  return useApiGet<GlobalSettings>(
    ["settings"],
    "settings",
    {
      staleTime: CACHE_TIMES.VERY_LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

// Flights hooks
export function useFlightSearch(params: string) {
  return useApiGet(
    ["flights", "search", params],
    `flights/search?${params}`,
    {
      staleTime: CACHE_TIMES.MEDIUM,
      gcTime: CACHE_TIMES.LONG,
    }
  );
}

export function useAirlines() {
  return useApiGet(
    ["airlines"],
    "airLines",
    {
      staleTime: CACHE_TIMES.VERY_LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

// Hotels hooks
export function useHotels(params?: {
  city?: string;
  country?: string;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params?.city) query.append("city", params.city);
  if (params?.country) query.append("country", params.country);
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  
  const queryString = query.toString();
  return useApiGet(
    ["hotels", queryString],
    `hotels${queryString ? `?${queryString}` : ""}`,
    {
      staleTime: CACHE_TIMES.MEDIUM,
      gcTime: CACHE_TIMES.LONG,
    }
  );
}

export function useHotelCountries() {
  return useApiGet(
    ["hotels", "countries"],
    "hotels/countries",
    {
      staleTime: CACHE_TIMES.VERY_LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

export function useSingleHotel(hotelId: string) {
  return useApiGet(
    ["hotels", hotelId],
    `hotels/${hotelId}`,
    {
      staleTime: CACHE_TIMES.LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

// Blogs hooks
export function useBlogs() {
  return useApiGet(
    ["blogs"],
    "blogs",
    {
      staleTime: CACHE_TIMES.MEDIUM,
      gcTime: CACHE_TIMES.LONG,
    }
  );
}

export function useBlogBySlug(slug: string) {
  return useApiGet(
    ["blogs", slug],
    `blogs/slug/${slug}`,
    {
      staleTime: CACHE_TIMES.LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

// Tours hooks
export function useTours(params?: {
  city?: string;
  country?: string;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params?.city) query.append("city", params.city);
  if (params?.country) query.append("country", params.country);
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  
  const queryString = query.toString();
  return useApiGet(
    ["tours", queryString],
    `tours${queryString ? `?${queryString}` : ""}`,
    {
      staleTime: CACHE_TIMES.MEDIUM,
      gcTime: CACHE_TIMES.LONG,
    }
  );
}

export function useTourBySlug(slug: string) {
  return useApiGet(
    ["tours", slug],
    `tours/slug/${slug}`,
    {
      staleTime: CACHE_TIMES.LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

// Cities hooks
export function useCities() {
  return useApiGet(
    ["cities"],
    "cities",
    {
      staleTime: CACHE_TIMES.VERY_LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

// Services hooks
export function useServices() {
  return useApiGet(
    ["services"],
    "services",
    {
      staleTime: CACHE_TIMES.VERY_LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

// Tour Guides hooks
export function useTourGuides(params?: {
  city?: string;
  country?: string;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params?.city) query.append("city", params.city);
  if (params?.country) query.append("country", params.country);
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  
  const queryString = query.toString();
  return useApiGet(
    ["tour-guides", queryString],
    `tour-guides${queryString ? `?${queryString}` : ""}`,
    {
      staleTime: CACHE_TIMES.MEDIUM,
      gcTime: CACHE_TIMES.LONG,
    }
  );
}

export function useTourGuideBySlug(slug: string) {
  return useApiGet(
    ["tour-guides", slug],
    `tour-guides/slug/${slug}`,
    {
      staleTime: CACHE_TIMES.LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}

// Offers hooks
export function useOffers() {
  return useApiGet(
    ["offers"],
    "offers",
    {
      staleTime: CACHE_TIMES.SHORT,
      gcTime: CACHE_TIMES.MEDIUM,
    }
  );
}

// Package Types hooks
export function usePackageTypes() {
  return useApiGet(
    ["package-types"],
    "package-types",
    {
      staleTime: CACHE_TIMES.VERY_LONG,
      gcTime: CACHE_TIMES.VERY_LONG,
    }
  );
}
