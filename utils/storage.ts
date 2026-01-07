
export type Profile = {
  name: string;
  yearlyGoal: number;
  favoriteMoods: string[];
};

export const loadProfile = (): Profile | null => {
  return {
    name: "Kat",
    yearlyGoal: 20,
    favoriteMoods: ["cozy", "winter"]
  };
};

// Save profile does nothin yet
export const saveProfile = (profile: Profile) => {
  console.log("Pretend we saved this profile:", profile);
};
