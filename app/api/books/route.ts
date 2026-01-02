export async function GET() {
  return Response.json({ books: [
    {
    id: "1",
    title: "A Wintery Tale",
    author: "Author One",
    format: "physical",
    status: "unread",
    moods: ["winter", "cozy"],
  },
  {
    id: "2",
    title: "Short & Sweet",
    author: "Author Two",
    format: "ebook",
    status: "unread",
    moods: ["short", "light"],
  },
  {
    id: "3",
    title: "Dark Nights",
    author: "Author Three",
    format: "audio",
    status: "unread",
    moods: ["dark", "cozy"],
  }]})
}