import { useState, useCallback, useEffect } from "react";
import { Preferences, DEFAULT_PREFERENCES, STORAGE_KEY } from "@/types/preferences";

function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_PREFERENCES;
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences);

  const save = useCallback((prefs: Preferences) => {
    setPreferences(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, []);

  const hasPreferences = useCallback(() => {
    return (
      preferences.roleKeywords.length > 0 ||
      preferences.preferredLocations.length > 0 ||
      preferences.preferredModes.length > 0 ||
      preferences.experienceLevel !== "" ||
      preferences.skills.length > 0
    );
  }, [preferences]);

  return { preferences, save, hasPreferences };
}
