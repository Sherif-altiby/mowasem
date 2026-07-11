export async function getData<T>(
  url: string,
  options?: RequestInit,
  errorObj?: unknown,
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: options?.cache || "force-cache",
    signal: options?.signal || AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    if (errorObj) return errorObj as T;
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return response.json();
}

export async function postData<P, T>(
  url: string,
  payload?: P,
  options?: RequestInit,
  newBase?: string,
): Promise<T | { status: string; message: string }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${newBase ? newBase : baseUrl}/${url}`, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(payload),
    signal: options?.signal || AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    // throw new Error(`Failed to fetch data from ${url}`);
    return { status: "fail", message: "something went wrong!" };
  }

  return response.json();
}

// Helper function to get page and limit params for cards in homepage (...Lite)
export const getParamsLite = () => {
  const params = new URLSearchParams();
  params.set("limit", String(10));
  params.set("page", String(1));
  return params;
};
