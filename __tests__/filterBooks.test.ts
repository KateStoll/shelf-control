import { filterBooksByMood } from "../utils/filterBooks";
import { Book } from "../types/book";

const books: Book[] = [
  { id: "1", title: "Cozy Winter", author: "A", format: "physical", status: "unread", moods: ["cozy", "winter"] },
  { id: "2", title: "Dark Short", author: "B", format: "ebook", status: "unread", moods: ["dark", "short"] },
  { id: "3", title: "Read Already", author: "C", format: "audio", status: "read", moods: ["cozy"] },
];

describe("filterBooksByMood", () => {
  it("returns only unread books with selected mood", () => {
    const result = filterBooksByMood(books, "cozy");
    expect(result).toEqual([
      { id: "1", title: "Cozy Winter", author: "A", format: "physical", status: "unread", moods: ["cozy", "winter"] },
    ]);
  });

  it("returns empty array if no unread books match mood", () => {
    const result = filterBooksByMood(books, "surprise");
    expect(result).toEqual([]);
  });

  it("does not return books that are read even if mood matches", () => {
    const result = filterBooksByMood(books, "cozy");
    expect(result.some(book => book.status === "read")).toBe(false);
  });
});
