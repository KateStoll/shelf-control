// types/profile.ts
import { Mood } from "../data/moods";

export type Profile = {
  displayName: string;
  yearlyGoal: number;
  favoriteMoods: Mood[];
};
