"use client";

import { useState } from "react";
import { loadProfile } from "@/utils/storage";

export type Profile = {
  name: string;
  yearlyGoal: number;
  favoriteMoods: string[];
};

type ProfileProps = {
  profile?: Profile | null;
  onSelectMood?: (mood: string) => void;
};

export default function ProfileComponent({
  profile,
  onSelectMood,
}: ProfileProps) {

  const [localProfile] = useState<Profile | null>(() => profile ?? loadProfile());

  if (!localProfile) return null;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold">Hey {localProfile.name} 👋</h2>
      <p className="text-sm text-gray-600">2026 goal: {localProfile.yearlyGoal} books</p>

      {localProfile.favoriteMoods.length > 0 && (
        <div className="mt-2">
          <p className="text-sm mb-1">Favorite moods:</p>
          <div className="flex gap-2 flex-wrap">
            {localProfile.favoriteMoods.map((mood) => (
              <button
                key={mood}
                className="px-2 py-1 bg-blue-200 rounded hover:bg-blue-300"
                onClick={() => onSelectMood && onSelectMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
