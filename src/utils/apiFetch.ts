import { API_BASE } from '../config';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
  } as Record<string, string>;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle absolute or relative URLs
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  return fetch(url, {
    ...options,
    headers
  });
}
