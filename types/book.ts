export type Book = {
  id: string;
  title: string;
  author: string;
  format: "physical" | "ebook" | "audio";
  status: "unread" | "reading" | "read";
  moods: string[]; // max 3 moods for MVP
};



