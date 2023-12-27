import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function datefmt(dt: Date) {
  return dt.toLocaleString("en-IN", { hour12: false, hourCycle: "h23" });
}
