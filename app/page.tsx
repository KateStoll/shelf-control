"use client";

import { useEffect, useState } from "react";
import { Book } from "../types/book";
import { books as mockBooks } from "../data/books";
import { Mood } from "../data/moods";
import { filterBooksByMood } from "../utils/filterBooks";
import { getRandomBook } from "../utils/randomBook";
import { loadBooks, saveBooks } from "../utils/storage";

export default function Page() {
  // State
  const [books, setBooks] = useState<Book[]>(() => {
    const storedBooks = loadBooks();
    return Array.isArray(storedBooks) && storedBooks.length > 0
      ? storedBooks
      : mockBooks;
  });

  const [selectedMood, setSelectedMood] = useState<Mood>("cozy");
  const [pickedBook, setPickedBook] = useState<Book | null>(null);

  // Save books to localStorage whenever they change
  useEffect(() => {
    saveBooks(books);
  }, [books]);

  // Pick a book based on the selected mood
  const handlePick = () => {
    const filtered = filterBooksByMood(books, selectedMood);
    const book = getRandomBook(filtered);

    setPickedBook(book);

    if (book) {
      setBooks(prevBooks =>
        prevBooks.map(b =>
          b.id === book.id ? { ...b, status: "reading" } : b
        )
      );
    }
  };

  return (
    <div>
      <h1>Shelf Control — Pick a Book</h1>

      <label>
        Mood:
        <select
          value={selectedMood}
          onChange={e => setSelectedMood(e.target.value as Mood)}
        >
          <option value="cozy">Cozy</option>
          <option value="winter">Winter</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="short">Short</option>
          <option value="surprise">Surprise</option>
        </select>
      </label>

      <button onClick={handlePick}>Pick for Me</button>

      {pickedBook && (
        <div>
          <h2>{pickedBook.title}</h2>
          <p>{pickedBook.author}</p>
          <p>Moods: {pickedBook.moods.join(", ")}</p>
          <p>Status: {pickedBook.status}</p>
        </div>
      )}
    </div>
  );
}
