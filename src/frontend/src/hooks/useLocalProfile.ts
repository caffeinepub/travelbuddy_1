import { useCallback, useState } from "react";
import type { ConveyanceProfile, UserProfile } from "../types";

const PROFILE_KEY = "travelbuddy_profile";
const CONVEYANCE_KEY = "travelbuddy_conveyances";

const DEFAULT_PROFILE: UserProfile = {
  fullName: "",
  gender: "",
  age: "",
  profession: "",
  education: "",
  residency: "",
  planningNeeds: [],
  bio: "",
};

export function useLocalProfile() {
  const [profile, setProfileState] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const saveProfile = useCallback((p: UserProfile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    setProfileState(p);
  }, []);

  return { profile, saveProfile };
}

export function useLocalConveyances() {
  const [conveyances, setConveyancesState] = useState<ConveyanceProfile[]>(
    () => {
      try {
        const stored = localStorage.getItem(CONVEYANCE_KEY);
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
      return [
        {
          id: "c1",
          mode: "Air" as const,
          flightOrTrainNumber: "AI-202",
          date: "2026-03-25",
          origin: "Delhi (DEL)",
          destination: "Mumbai (BOM)",
          seatClass: "Economy",
          seatNumber: "14C",
        },
        {
          id: "c2",
          mode: "Rail" as const,
          flightOrTrainNumber: "12301",
          date: "2026-04-02",
          origin: "New Delhi",
          destination: "Kolkata",
          seatClass: "3A",
          seatNumber: "B4-42",
        },
      ];
    },
  );

  const addConveyance = useCallback((c: ConveyanceProfile) => {
    setConveyancesState((prev) => {
      const next = [...prev, c];
      localStorage.setItem(CONVEYANCE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeConveyance = useCallback((id: string) => {
    setConveyancesState((prev) => {
      const next = prev.filter((c) => c.id !== id);
      localStorage.setItem(CONVEYANCE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { conveyances, addConveyance, removeConveyance };
}
