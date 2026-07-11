export async function getData<T>(endpoint: string, options?: { timeout?: number }): Promise<T> {
  const timeout = options?.timeout || 10000; // Reduced from 60s to 10s for build-time
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    cache: "force-cache",
        // cache: "no-store",
    next: { revalidate: 300 }, // Revalidate after 5 minutes
    signal: AbortSignal.timeout(timeout),
  });

  if (!res.ok) {
    throw new Error(`API Error (${res.status}): ${res.statusText}`);
  }

  return res.json();
}

export async function getDataBySlug<T>(
  endpoint: string,
  slug: string,
): Promise<T> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}/${slug}`,
    {
      cache: "force-cache",
        // cache: "no-store",
      next: { revalidate: 600 }, // Revalidate after 10 minutes
      signal: AbortSignal.timeout(60000),
    },
  );

  if (!res.ok) {
    throw new Error(`API Error (${res.status}): ${res.statusText}`);
  }

  return res.json();
}
export async function postData<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API Error (${res.status}): ${res.statusText}`,
    );
  }

  return res.json();
}
