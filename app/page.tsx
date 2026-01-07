"use client";

import { useEffect, useState } from "react";
import ProfileComponent from "../components/Profile";
import { loadProfile } from "@/utils/storage";

type Book = {
  id: string;
  title: string;
  author: string;
  format: string;
  status: string;
  moods: string[];
};

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [profile] = useState(() => loadProfile());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data.books);
      setLoading(false);
    }

    fetchBooks();
  }, []);

  const filteredBooks = selectedMood
    ? books.filter((book) => book.moods.includes(selectedMood))
    : books;

  const handleSelectMood = (mood: string) => {
    setSelectedMood((prev) => (prev === mood ? null : mood));
  };

  if (loading) {
    return <p className="p-6">Loading books…</p>;
  }

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
                <span className="italic">
                  ({book.moods.join(", ")})
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
