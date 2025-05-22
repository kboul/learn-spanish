import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function debounce<T extends (...args: never[]) => void>(fn: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function getUrlParams() {
  return new URLSearchParams(window.location.search);
}

function capitalizeFirstLetter(word: string) {
  if (!word) return "";
  return String(word).charAt(0).toUpperCase() + String(word).slice(1).toLocaleLowerCase();
}

export { capitalizeFirstLetter, cn, debounce, getUrlParams };
