import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "../app/page";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          books: [
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
            },
          ],
        }),
    } as any)
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Page component (API-driven)", () => {
  test("renders books from the API", async () => {
    render(<Page />);

    expect(await screen.findByText(/A Wintery Tale/i)).toBeInTheDocument();
    expect(screen.getByText(/Short & Sweet/i)).toBeInTheDocument();
    expect(screen.getByText(/Dark Nights/i)).toBeInTheDocument();
  });

  test("filters books by selected mood", async () => {
    render(<Page />);

    await screen.findByText(/A Wintery Tale/i);

    fireEvent.click(screen.getByRole("button", { name: "cozy" }));

    expect(screen.getByText(/A Wintery Tale/i)).toBeInTheDocument();
    expect(screen.getByText(/Dark Nights/i)).toBeInTheDocument();
    expect(screen.queryByText(/Short & Sweet/i)).not.toBeInTheDocument();

    expect(screen.getByTestId("selected-mood")).toHaveTextContent("cozy");
  });

  test("resets to all books when mood is toggled off", async () => {
    render(<Page />);

    await screen.findByText(/A Wintery Tale/i);

    const cozyButton = screen.getByRole("button", { name: "cozy" });

    fireEvent.click(cozyButton);
    fireEvent.click(cozyButton);

    expect(screen.getByText(/A Wintery Tale/i)).toBeInTheDocument();
    expect(screen.getByText(/Short & Sweet/i)).toBeInTheDocument();
    expect(screen.getByText(/Dark Nights/i)).toBeInTheDocument();

    expect(screen.queryByTestId("selected-mood")).not.toBeInTheDocument();
  });
});
