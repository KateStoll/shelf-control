import { render, screen, fireEvent } from "@testing-library/react";
import ProfileComponent, { Profile } from "../components/Profile";
import { loadProfile } from "@/utils/storage";

jest.mock("@/utils/storage", () => ({
  loadProfile: jest.fn(() => ({
    name: "Kat",
    yearlyGoal: 20,
    favoriteMoods: ["cozy", "winter"],
  })),
}));

describe("ProfileComponent", () => {
  const profile: Profile = {
    name: "Kat",
    yearlyGoal: 20,
    favoriteMoods: ["cozy", "winter"],
  };

  test("renders profile info correctly", () => {
    render(<ProfileComponent profile={profile} />);
    expect(screen.getByText(/Hey Kat/i)).toBeInTheDocument();
    expect(screen.getByText(/2026 goal: 20 books/i)).toBeInTheDocument();
    expect(screen.getByText(/cozy/i)).toBeInTheDocument();
    expect(screen.getByText(/winter/i)).toBeInTheDocument();
  });

  test("calls onSelectMood callback when a mood button is clicked", () => {
    const mockSelect = jest.fn();
    render(<ProfileComponent profile={profile} onSelectMood={mockSelect} />);

    const cozyButton = screen.getByText("cozy");
    fireEvent.click(cozyButton);

    expect(mockSelect).toHaveBeenCalledWith("cozy");
  });

  test("does not render anything if profile is null", () => {

    (loadProfile as jest.Mock).mockReturnValueOnce(null);

    render(<ProfileComponent profile={null} />);
    expect(screen.queryByText(/Hey/i)).not.toBeInTheDocument();
  });
});
