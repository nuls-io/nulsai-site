export const DEV = import.meta.env.REACT_APP_DEV

export const APP_SERVER_URL =
  (import.meta.env.VITE_APP_SERVER_URL as string) || '/'
export const CACHE_PREFIX = import.meta.env.VITE_CACHE_PREFIX as string
export const CDN_URL = import.meta.env.VITE_CDN_URL as string
