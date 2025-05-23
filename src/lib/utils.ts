import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const protocol =
  process.env.NODE_ENV === "production" ? "https" : "http";

export const apiKey = process.env.OPENAI_API_KEY;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
