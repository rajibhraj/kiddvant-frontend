import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSafeImageUrl = (src: any, fallback = "/Product/p1.jpg"): string => {
  if (!src || typeof src !== "string") return fallback;
  const trimmed = src.trim();
  if (!trimmed) return fallback;
  
  if (trimmed.startsWith("data:")) {
    return trimmed;
  }
  
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      new URL(trimmed);
      return trimmed;
    } catch (e) {
      return fallback;
    }
  }
  
  if (trimmed.startsWith("/")) {
    return trimmed;
  }
  
  if (trimmed.includes("/") || trimmed.includes(".")) {
    return `/${trimmed}`;
  }
  
  return fallback;
};
