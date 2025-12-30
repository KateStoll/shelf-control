export const moods = [
  "cozy",
  "winter",
  "light",
  "dark",
  "short",
  "surprise"
] as const;

export type Mood = (typeof moods)[number];
