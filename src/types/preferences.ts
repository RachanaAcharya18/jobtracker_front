export interface Preferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredModes: ("Remote" | "Hybrid" | "Onsite")[];
  experienceLevel: string;
  skills: string[];
  minMatchScore: number;
}

export const DEFAULT_PREFERENCES: Preferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredModes: [],
  experienceLevel: "",
  skills: [],
  minMatchScore: 40,
};

export const STORAGE_KEY = "jobTrackerPreferences";
