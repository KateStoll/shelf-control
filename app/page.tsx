"use client";

import { useState } from "react";
import { loadBooks, Book } from "../utils/books";
import { loadProfile } from "@/utils/storage";
import ProfileComponent from "../components/Profile";

export default function Page() {
  const [books] = useState<Book[]>(() => loadBooks());
  const [profile] = useState(() => loadProfile());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Filter books by mood if selected
  const filteredBooks = selectedMood
    ? books.filter((book) => book.mood === selectedMood)
    : books;

  // Toggle mood selection
  const handleSelectMood = (mood: string) => {
    setSelectedMood((prev) => (prev === mood ? null : mood));
  };

  return (
    <main className="p-6">
      <ProfileComponent profile={profile} onSelectMood={handleSelectMood} />

      <section>
        <h2 className="text-xl font-semibold mb-4">Your Books</h2>

        {selectedMood && (
          <p className="text-sm text-gray-600 mb-2">
            Showing books for mood:{" "}
            <strong data-testid="selected-mood">{selectedMood}</strong>
          </p>
        )}

        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredBooks.map((book) => (
              <li key={book.id} className="border p-2 rounded">
                <strong>{book.title}</strong> by {book.author}{" "}
                <span className="italic">({book.mood})</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
