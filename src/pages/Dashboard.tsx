import { useState, useMemo } from "react";
import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { usePreferences } from "@/hooks/usePreferences";
import { useJobStatus, JobStatus } from "@/hooks/useJobStatus";
import { computeMatchScore } from "@/lib/matchScore";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import JobDetailModal from "@/components/JobDetailModal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, SearchX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function extractSalaryNum(s: string): number {
  const m = s.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

const Dashboard = () => {
  const { isSaved, toggleSave } = useSavedJobs();
  const { preferences, hasPreferences } = usePreferences();
  const { getStatus, setStatus: setJobStatus } = useJobStatus();
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [mode, setMode] = useState("All Modes");
  const [experience, setExperience] = useState("All Experience");
  const [source, setSource] = useState("All Sources");
  const [sort, setSort] = useState("Latest");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const scored = useMemo(() => {
    const hasPref = hasPreferences();
    return jobs.map((job) => ({
      job,
      matchScore: hasPref ? computeMatchScore(job, preferences) : 0,
    }));
  }, [preferences, hasPreferences]);

  const filtered = useMemo(() => {
    let result = [...scored];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.job.title.toLowerCase().includes(q) ||
          r.job.company.toLowerCase().includes(q)
      );
    }
    if (location !== "All Locations") {
      result = result.filter((r) => r.job.location === location);
    }
    if (mode !== "All Modes") {
      result = result.filter((r) => r.job.mode === mode);
    }
    if (experience !== "All Experience") {
      result = result.filter((r) => r.job.experience === experience);
    }
    if (source !== "All Sources") {
      result = result.filter((r) => r.job.source === source);
    }
    if (statusFilter !== "All Statuses") {
      result = result.filter((r) => getStatus(r.job.id) === statusFilter);
    }
    if (showOnlyMatches && hasPreferences()) {
      result = result.filter((r) => r.matchScore >= preferences.minMatchScore);
    }

    if (sort === "Latest") {
      result.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
    } else if (sort === "Oldest") {
      result.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
    } else if (sort === "Match Score") {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sort === "Salary") {
      result.sort((a, b) => extractSalaryNum(b.job.salaryRange) - extractSalaryNum(a.job.salaryRange));
    }

    return result;
  }, [scored, search, location, mode, experience, source, sort, showOnlyMatches, preferences, hasPreferences, statusFilter, getStatus]);

  const handleView = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleStatusChange = (jobId: number, status: JobStatus) => {
    setJobStatus(jobId, status);
    if (status !== "Not Applied") {
      toast({ title: `Status updated: ${status}` });
    }
  };

  const hasPref = hasPreferences();

  return (
    <div className="flex flex-1 flex-col px-space-4 py-space-4">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-space-1 text-muted-foreground">
          {filtered.length} jobs found
        </p>

        {!hasPref && (
          <div className="mt-space-3 flex items-center gap-space-2 rounded-md border border-border bg-card p-space-2">
            <AlertCircle className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              <a href="/settings" className="font-medium text-primary underline underline-offset-2">
                Set your preferences
              </a>{" "}
              to activate intelligent matching.
            </p>
          </div>
        )}

        <div className="mt-space-3">
          <JobFilters
            search={search}
            onSearchChange={setSearch}
            location={location}
            onLocationChange={setLocation}
            mode={mode}
            onModeChange={setMode}
            experience={experience}
            onExperienceChange={setExperience}
            source={source}
            onSourceChange={setSource}
            sort={sort}
            onSortChange={setSort}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </div>

        {hasPref && (
          <div className="mt-space-2 flex items-center gap-space-2">
            <Switch
              id="match-toggle"
              checked={showOnlyMatches}
              onCheckedChange={setShowOnlyMatches}
            />
            <Label htmlFor="match-toggle" className="text-sm cursor-pointer">
              Show only jobs above my threshold ({preferences.minMatchScore}%)
            </Label>
          </div>
        )}

        <div className="mt-space-3 grid gap-space-2 sm:grid-cols-2">
          {filtered.map((r) => (
            <JobCard
              key={r.job.id}
              job={r.job}
              isSaved={isSaved(r.job.id)}
              onToggleSave={toggleSave}
              onView={handleView}
              matchScore={hasPref ? r.matchScore : undefined}
              status={getStatus(r.job.id)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-space-5 flex flex-col items-center text-center">
            <div className="rounded-full border p-space-3 text-muted-foreground">
              <SearchX className="h-8 w-8" />
            </div>
            <p className="mt-space-3 font-serif text-xl text-foreground">No roles match your criteria</p>
            <p className="mt-space-1 text-sm text-muted-foreground">
              Adjust your filters or lower your match threshold in Settings.
            </p>
          </div>
        )}
      </div>

      <JobDetailModal
        job={selectedJob}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Dashboard;
