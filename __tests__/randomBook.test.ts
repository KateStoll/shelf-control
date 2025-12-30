import { getRandomBook } from "../utils/randomBook";
import { Book } from "../types/book";

const books: Book[] = [
  { id: "1", title: "Cozy Winter", author: "A", format: "physical", status: "unread", moods: ["cozy", "winter"] },
  { id: "2", title: "Dark Short", author: "B", format: "ebook", status: "unread", moods: ["dark", "short"] },
];

describe("getRandomBook", () => {
  it("returns a book from the list", () => {
    const book = getRandomBook(books);
    expect(books).toContain(book!);
  });

  it("returns null for empty array", () => {
    const book = getRandomBook([]);
    expect(book).toBeNull();
  });
});
