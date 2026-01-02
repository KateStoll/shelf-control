import { Book } from "../types/book";

const STORAGE_KEY = "shelfControlBooks";

export const saveBooks = (books: Book[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

// Updated loadBooks with explicit type for TS
export const loadBooks = (): Book[] => {
  if (typeof window === "undefined") return []; // SSR safety
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as Book[]) : [];
};
