"use client";

import { useState } from "react";
import { books } from "../data/books";
import { filterBooksByMood } from "../utils/filterBooks";
import { getRandomBook } from "../utils/randomBook";

export default function BookPicker() {
  const [selectedMood, setSelectedMood] = useState("cozy");
  const [pickedBook, setPickedBook] = useState<typeof books[0] | null>(null);

  const handlePick = () => {
    const filtered = filterBooksByMood(books, selectedMood as any);
    setPickedBook(getRandomBook(filtered));
  };

  return (
    <div>
      <h1>Shelf Control — Pick a Book</h1>

      <label>
        Mood:
        <select value={selectedMood} onChange={e => setSelectedMood(e.target.value)}>
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
          <p>{pickedBook.moods.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
