const isDev = import.meta.env.MODE === 'development';
export const API_BASE = isDev 
  ? '' 
  : (import.meta.env.VITE_API_URL || 'https://piccolescelte.onrender.com').trim().replace(/\/$/, '');
