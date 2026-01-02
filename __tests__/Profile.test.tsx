import { render, screen, fireEvent } from "@testing-library/react";
import ProfileComponent from "../components/Profile";
import * as storage from "../utils/storage";

// Mock localStorage functions
jest.spyOn(storage, "loadProfile").mockReturnValue(null);
jest.spyOn(storage, "saveProfile");

describe("ProfileComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all inputs and labels", () => {
    render(<ProfileComponent />);
    
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Yearly Goal/i)).toBeInTheDocument();
    expect(screen.getByTestId("favorite-moods")).toBeInTheDocument();  });

  test("typing in name updates state and calls saveProfile", () => {
    render(<ProfileComponent />);
    
    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Kat" } });

    expect(nameInput).toHaveValue("Kat");
    expect(storage.saveProfile).toHaveBeenCalled();
  });

  test("changing yearly goal updates state and calls saveProfile", () => {
    render(<ProfileComponent />);
    
    const goalInput = screen.getByLabelText(/Yearly Goal/i) as HTMLInputElement;
    fireEvent.change(goalInput, { target: { value: 20 } });

    expect(goalInput).toHaveValue(20);
    expect(storage.saveProfile).toHaveBeenCalled();
  });

  test("toggling a mood checkbox updates state and calls saveProfile", () => {
    render(<ProfileComponent />);
    
    const cozyCheckbox = screen.getByLabelText("cozy") as HTMLInputElement;
    expect(cozyCheckbox.checked).toBe(false);

    fireEvent.click(cozyCheckbox);
    expect(cozyCheckbox.checked).toBe(true);
    expect(storage.saveProfile).toHaveBeenCalled();
  });
});
