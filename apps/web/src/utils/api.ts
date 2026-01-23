type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api<T>(url: string, options: FetchOptions = {}) {
  const res = await fetch(BASE_URL + url, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new ApiError(
      error.message ?? "Something went wrong",
      res.status,
      error,
    );
  }

  if (res.status === 204) {
    return null as T;
  }

  return await res.json();
}
