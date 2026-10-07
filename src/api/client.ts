/**
 * Universal Shared API Client
 * Compatible with iOS, Android, Web, Windows, macOS, and Linux
 */

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
    });

    if (!response.ok) {
      return {
        data: null,
        error: `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    const data = (await response.json()) as T;
    return { data, error: null, status: response.status };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error',
      status: 0,
    };
  }
}
