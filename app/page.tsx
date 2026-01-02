"use client";

import { useState, useEffect } from "react";
import { Book } from "../types/book";
import { books as mockBooks } from "../data/books";
import { Mood } from "../data/moods";
import { filterBooksByMood } from "../utils/filterBooks";
import { getRandomBook } from "../utils/randomBook";
import { loadBooks, saveBooks } from "../utils/storage";

import ProfileComponent from "../components/Profile";

export default function Page() {

  const [books, setBooks] = useState<Book[]>(() => {
    const storedBooks = loadBooks();
    return Array.isArray(storedBooks) && storedBooks.length > 0
      ? storedBooks
      : mockBooks;
  });

  const [selectedMood, setSelectedMood] = useState<Mood>("cozy");
  const [pickedBook, setPickedBook] = useState<Book | null>(null);

  useEffect(() => {
    saveBooks(books);
  }, [books]);

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
    <div style={{ padding: "1rem" }}>
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
        <div style={{ marginTop: "1rem" }}>
          <h2>{pickedBook.title}</h2>
          <p>{pickedBook.author}</p>
          <p>Moods: {pickedBook.moods.join(", ")}</p>
          <p>Status: {pickedBook.status}</p>
        </div>
      )}

      <hr style={{ margin: "2rem 0" }} />

      <ProfileComponent />
    </div>
  );
}
