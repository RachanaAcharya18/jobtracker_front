import { Job } from "@/types/job";
import { Preferences } from "@/types/preferences";

export function computeMatchScore(job: Job, prefs: Preferences): number {
  let score = 0;
  const titleLower = job.title.toLowerCase();
  const descLower = job.description.toLowerCase();

  // +25 if any roleKeyword appears in job.title
  if (prefs.roleKeywords.some((kw) => titleLower.includes(kw.toLowerCase()))) {
    score += 25;
  }

  // +15 if any roleKeyword appears in job.description
  if (prefs.roleKeywords.some((kw) => descLower.includes(kw.toLowerCase()))) {
    score += 15;
  }

  // +15 if job.location matches preferredLocations
  if (prefs.preferredLocations.some((loc) => loc === job.location)) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (prefs.preferredModes.includes(job.mode)) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills
  const userSkillsLower = prefs.skills.map((s) => s.toLowerCase());
  if (job.skills.some((s) => userSkillsLower.includes(s.toLowerCase()))) {
    score += 15;
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(score, 100);
}
