
"use client";

import { useState, useEffect } from "react";
import { Profile } from "../types/profile";
import { Mood, moods } from "../data/moods";
import { loadProfile, saveProfile } from "../utils/storage";

export default function ProfileComponent() {
  const [profile, setProfile] = useState<Profile>(() => {
    const stored = loadProfile();
    return stored ?? {
      displayName: "",
      yearlyGoal: 12,
      favoriteMoods: [],
    };
  });


  useEffect(() => {
    saveProfile(profile);
  }, [profile]);


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, displayName: e.target.value }));
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, yearlyGoal: Number(e.target.value) }));
  };

  const handleMoodToggle = (mood: Mood) => {
    setProfile(prev => ({
      ...prev,
      favoriteMoods: prev.favoriteMoods.includes(mood)
        ? prev.favoriteMoods.filter(m => m !== mood)
        : [...prev.favoriteMoods, mood],
    }));
  };

  return (
    <div>
      <h2>Profile</h2>
      <label>
        Name:
        <input value={profile.displayName} onChange={handleNameChange} />
      </label>

      <label>
        Yearly Goal:
        <input
          type="number"
          value={profile.yearlyGoal}
          min={1}
          onChange={handleGoalChange}
        />
      </label>

      <fieldset>
        <legend data-testid="favorite-moods">Favorite Moods</legend>
        {moods.map(m => (
          <label key={m}>
            <input
              type="checkbox"
              checked={profile.favoriteMoods.includes(m)}
              onChange={() => handleMoodToggle(m)}
            />
            {m}
          </label>
        ))}
      </fieldset>

      <div>
        <h3>Preview</h3>
        <p>
          Hello, {profile.displayName || "Reader"}! Your goal is{" "}
          {profile.yearlyGoal} books this year.
        </p>
        <p>Favorite moods: {profile.favoriteMoods.join(", ") || "None"}</p>
      </div>
    </div>
  );
}
