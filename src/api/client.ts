/**
 * Universal Shared API Client
 * Compatible with iOS, Android, Web, Windows, macOS, and Linux
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || '';

/**
 * Resolves a relative path (e.g. '/api/chat') to an absolute URL.
 * - On Web: uses relative path or EXPO_PUBLIC_API_URL.
 * - On Native (Expo Go / iOS / Android): prepends EXPO_PUBLIC_API_URL (e.g. Render live URL).
 */
export function resolveApiUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (API_BASE_URL) {
    return `${API_BASE_URL.replace(/\/$/, '')}${cleanPath}`;
  }
  if (typeof window !== 'undefined' && window.location) {
    return cleanPath;
  }
  return `http://localhost:3000${cleanPath}`;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const targetUrl = resolveApiUrl(url);
    const response = await fetch(targetUrl, {
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
