import { useState, useMemo } from "react";
import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import JobDetailModal from "@/components/JobDetailModal";

const Dashboard = () => {
  const { isSaved, toggleSave } = useSavedJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [mode, setMode] = useState("All Modes");
  const [experience, setExperience] = useState("All Experience");
  const [source, setSource] = useState("All Sources");
  const [sort, setSort] = useState("Latest");

  const filtered = useMemo(() => {
    let result = [...jobs];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q)
      );
    }
    if (location !== "All Locations") {
      result = result.filter((j) => j.location === location);
    }
    if (mode !== "All Modes") {
      result = result.filter((j) => j.mode === mode);
    }
    if (experience !== "All Experience") {
      result = result.filter((j) => j.experience === experience);
    }
    if (source !== "All Sources") {
      result = result.filter((j) => j.source === source);
    }

    result.sort((a, b) =>
      sort === "Latest"
        ? a.postedDaysAgo - b.postedDaysAgo
        : b.postedDaysAgo - a.postedDaysAgo
    );

    return result;
  }, [search, location, mode, experience, source, sort]);

  const handleView = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col px-space-4 py-space-4">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-space-1 text-muted-foreground">
          {filtered.length} jobs found
        </p>

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
          />
        </div>

        <div className="mt-space-3 grid gap-space-2 sm:grid-cols-2">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              onToggleSave={toggleSave}
              onView={handleView}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-space-5 text-center">
            <p className="font-serif text-xl text-foreground">No matching jobs</p>
            <p className="mt-space-1 text-sm text-muted-foreground">
              Try adjusting your filters to see more results.
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
