import { useState } from "react";
import { Bookmark } from "lucide-react";
import { jobs } from "@/data/jobs";
import { Job } from "@/types/job";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { useJobStatus, JobStatus } from "@/hooks/useJobStatus";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import { useToast } from "@/hooks/use-toast";

const Saved = () => {
  const { savedIds, isSaved, toggleSave } = useSavedJobs();
  const { getStatus, setStatus: setJobStatus } = useJobStatus();
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

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

  if (savedJobs.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-space-4 py-space-5">
        <div className="rounded-full border p-space-3 text-muted-foreground">
          <Bookmark className="h-8 w-8" />
        </div>
        <h1 className="mt-space-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
          Saved Jobs
        </h1>
        <p className="mt-space-2 max-w-md text-center text-muted-foreground">
          Jobs you bookmark will appear here. Save roles that interest you from the Dashboard to review later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-space-4 py-space-4">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Saved Jobs
        </h1>
        <p className="mt-space-1 text-muted-foreground">
          {savedJobs.length} saved {savedJobs.length === 1 ? "job" : "jobs"}
        </p>

        <div className="mt-space-3 grid gap-space-2 sm:grid-cols-2">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              onToggleSave={toggleSave}
              onView={handleView}
              status={getStatus(job.id)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>

      <JobDetailModal
        job={selectedJob}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Saved;
