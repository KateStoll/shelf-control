
export type Book = {
  id: number;
  title: string;
  author: string;
  mood: string;
  read: boolean;
};

// placeholder
export const loadBooks = (): Book[] => {
  return [
    { id: 1, title: "Book One", author: "Author A", mood: "cozy", read: false },
    { id: 2, title: "Book Two", author: "Author B", mood: "winter", read: false },
  ];
};

// placeholdr
export const saveBooks = (books: Book[]) => {
  console.log("Pretend we saved these books:", books);
};
