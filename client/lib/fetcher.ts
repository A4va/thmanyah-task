export const fetcher = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.statusText}`);
  }

  return res.json();
};
