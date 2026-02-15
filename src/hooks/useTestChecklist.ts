import { useState, useCallback } from "react";

const STORAGE_KEY = "jobTrackerTestChecklist";

export interface TestItem {
  id: string;
  label: string;
  howToTest: string;
}

export const TEST_ITEMS: TestItem[] = [
  { id: "prefs_persist", label: "Preferences persist after refresh", howToTest: "Save preferences, refresh the page, and verify they're still there." },
  { id: "match_score", label: "Match score calculates correctly", howToTest: "Set preferences and check that job cards show correct match badges." },
  { id: "match_toggle", label: "\"Show only matches\" toggle works", howToTest: "Enable the toggle on Dashboard and verify only high-score jobs appear." },
  { id: "save_persist", label: "Save job persists after refresh", howToTest: "Save a job, refresh the page, and check it's still saved." },
  { id: "apply_tab", label: "Apply opens in new tab", howToTest: "Click Apply on a job card and verify it opens in a new browser tab." },
  { id: "status_persist", label: "Status update persists after refresh", howToTest: "Change a job status, refresh, and verify the status is retained." },
  { id: "status_filter", label: "Status filter works correctly", howToTest: "Filter by a status on Dashboard and verify only matching jobs show." },
  { id: "digest_top10", label: "Digest generates top 10 by score", howToTest: "Generate a digest and verify it lists 10 jobs sorted by match score." },
  { id: "digest_persist", label: "Digest persists for the day", howToTest: "Generate a digest, refresh, and confirm it loads without regenerating." },
  { id: "no_console_errors", label: "No console errors on main pages", howToTest: "Open browser DevTools and navigate all pages. Check for errors." },
];

function loadChecked(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useTestChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setChecked({});
  }, []);

  const passedCount = TEST_ITEMS.filter((t) => checked[t.id]).length;
  const allPassed = passedCount === TEST_ITEMS.length;

  return { checked, toggle, reset, passedCount, allPassed, total: TEST_ITEMS.length };
}
