import { Book } from "../types/book";
import { Mood } from "../data/moods";

export const filterBooksByMood = (books: Book[], selectedMood: Mood): Book[] => {
  return books.filter(book => book.status === "unread" && book.moods.includes(selectedMood));
};
