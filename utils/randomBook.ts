import { Book } from "../types/book";

export const getRandomBook = (books: Book[]): Book | null => {
  if (!books.length) return null;
  const index = Math.floor(Math.random() * books.length);
  return books[index];
};
