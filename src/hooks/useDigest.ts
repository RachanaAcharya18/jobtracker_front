import { useState, useCallback } from "react";
import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";
import { usePreferences } from "@/hooks/usePreferences";
import { computeMatchScore } from "@/lib/matchScore";

interface DigestEntry {
  job: Job;
  matchScore: number;
}

interface DigestData {
  date: string;
  entries: DigestEntry[];
}

function storageKey(date: string) {
  return `jobTrackerDigest_${date}`;
}

function todayString() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function useDigest() {
  const { preferences, hasPreferences } = usePreferences();
  const today = todayString();

  const loadExisting = useCallback((): DigestData | null => {
    try {
      const raw = localStorage.getItem(storageKey(today));
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  }, [today]);

  const [digest, setDigest] = useState<DigestData | null>(loadExisting);

  const generate = useCallback(() => {
    // Check if already exists for today
    const existing = loadExisting();
    if (existing) {
      setDigest(existing);
      return existing;
    }

    const scored = jobs.map((job) => ({
      job,
      matchScore: computeMatchScore(job, preferences),
    }));

    scored.sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return a.job.postedDaysAgo - b.job.postedDaysAgo;
    });

    const top10 = scored.slice(0, 10);
    const data: DigestData = { date: today, entries: top10 };

    localStorage.setItem(storageKey(today), JSON.stringify(data));
    setDigest(data);
    return data;
  }, [today, preferences, loadExisting]);

  const digestText = useCallback(() => {
    if (!digest) return "";
    const lines = [`Top 10 Jobs For You — 9AM Digest`, `Date: ${digest.date}`, ""];
    digest.entries.forEach((e, i) => {
      lines.push(`${i + 1}. ${e.job.title} at ${e.job.company}`);
      lines.push(`   Location: ${e.job.location} | Experience: ${e.job.experience}`);
      lines.push(`   Match: ${e.matchScore}% | Apply: ${e.job.applyUrl}`);
      lines.push("");
    });
    lines.push("This digest was generated based on your preferences.");
    return lines.join("\n");
  }, [digest]);

  return { digest, generate, digestText, hasPreferences, today };
}
