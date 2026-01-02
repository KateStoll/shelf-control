import { Book } from "../types/book";
import { Profile } from "../types/profile";

const STORAGE_KEY = "shelfControlBooks";

export const saveBooks = (books: Book[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const loadBooks = (): Book[] => {
  if (typeof window === "undefined") return []; // SSR safety
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as Book[]) : [];
};

export const loadProfile = (): Profile | null => {
  const data = localStorage.getItem("profile");
  return data ? (JSON.parse(data) as Profile) : null;
};


export const saveProfile = (profile: Profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};