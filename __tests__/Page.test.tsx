import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../app/page";
import { Book } from "../utils/books";

jest.mock("../utils/books", () => ({
  loadBooks: jest.fn(() => [
    { id: "1", title: "Cozy Mystery", author: "Author A", mood: "cozy" },
    { id: "2", title: "Winter Tales", author: "Author B", mood: "winter" },
    { id: "3", title: "Summer Fun", author: "Author C", mood: "summer" },
  ]),
}));

jest.mock("@/utils/storage", () => ({
  loadProfile: jest.fn(() => ({
    name: "Kat",
    yearlyGoal: 20,
    favoriteMoods: ["cozy", "winter"],
  })),
}));

describe("Page component", () => {
  test("renders profile and all books initially", () => {
    render(<Page />);
    expect(screen.getByText(/Hey Kat/i)).toBeInTheDocument();
    expect(screen.getByText(/Cozy Mystery/i)).toBeInTheDocument();
    expect(screen.getByText(/Winter Tales/i)).toBeInTheDocument();
    expect(screen.getByText(/Summer Fun/i)).toBeInTheDocument();
  });

  test("filters books by selected mood", () => {
    render(<Page />);

    const cozyButton = screen.getByRole("button", { name: "cozy" });
    fireEvent.click(cozyButton);

    expect(screen.getByText(/Cozy Mystery/i)).toBeInTheDocument();
    expect(screen.queryByText(/Winter Tales/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Summer Fun/i)).not.toBeInTheDocument();

    expect(screen.getByTestId("selected-mood")).toHaveTextContent("cozy");
  });

  test("resets to all books when same mood button clicked again", () => {
    render(<Page />);

    const cozyButton = screen.getByRole("button", { name: "cozy" });
    fireEvent.click(cozyButton); 
    fireEvent.click(cozyButton); 

    expect(screen.getByText(/Cozy Mystery/i)).toBeInTheDocument();
    expect(screen.getByText(/Winter Tales/i)).toBeInTheDocument();
    expect(screen.getByText(/Summer Fun/i)).toBeInTheDocument();

    expect(screen.queryByTestId("selected-mood")).not.toBeInTheDocument();
  });

  test("selecting a different mood updates the list correctly", () => {
    render(<Page />);

    // Select "cozy" first
    const cozyButton = screen.getByRole("button", { name: "cozy" });
    fireEvent.click(cozyButton);

    // Then select "winter"
    const winterButton = screen.getByRole("button", { name: "winter" });
    fireEvent.click(winterButton);

    expect(screen.queryByText(/Cozy Mystery/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Winter Tales/i)).toBeInTheDocument();
    expect(screen.queryByText(/Summer Fun/i)).not.toBeInTheDocument();

    expect(screen.getByTestId("selected-mood")).toHaveTextContent("winter");
  });
});
