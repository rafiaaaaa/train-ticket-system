type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
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
    let message = "Something went wrong";

    try {
      const error = await res.json();
      message = error.message ?? message;
    } catch {}

    throw new ApiError(message, res.status);
  }

  if (res.status === 204) {
    return null as T;
  }

  return await res.json();
}
