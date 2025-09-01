import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Magic UI specific utilities
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, length + 2);
}

export function formatDuration(duration: number | string): string {
  if (typeof duration === "number") {
    return `${duration}s`;
  }
  return duration;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}
