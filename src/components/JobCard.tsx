import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
import MatchBadge from "@/components/MatchBadge";
import { JobStatus } from "@/hooks/useJobStatus";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  onView: (job: Job) => void;
  matchScore?: number;
  status: JobStatus;
  onStatusChange: (jobId: number, status: JobStatus) => void;
}

function formatDaysAgo(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

const sourceColors: Record<string, string> = {
  LinkedIn: "bg-[hsl(210,60%,94%)] text-[hsl(210,60%,30%)] border-[hsl(210,60%,85%)]",
  Naukri: "bg-[hsl(145,30%,93%)] text-[hsl(145,40%,28%)] border-[hsl(145,30%,82%)]",
  Indeed: "bg-[hsl(38,60%,93%)] text-[hsl(38,60%,30%)] border-[hsl(38,60%,82%)]",
};

const statusStyles: Record<JobStatus, string> = {
  "Not Applied": "bg-muted text-muted-foreground border-border",
  Applied: "bg-[hsl(210,60%,94%)] text-[hsl(210,60%,30%)] border-[hsl(210,60%,85%)]",
  Rejected: "bg-[hsl(0,60%,94%)] text-[hsl(0,60%,35%)] border-[hsl(0,60%,85%)]",
  Selected: "bg-[hsl(145,40%,92%)] text-[hsl(145,40%,28%)] border-[hsl(145,40%,82%)]",
};

const allStatuses: JobStatus[] = ["Not Applied", "Applied", "Rejected", "Selected"];

const JobCard = ({ job, isSaved, onToggleSave, onView, matchScore, status, onStatusChange }: JobCardProps) => {
  return (
    <Card className="transition-all duration-default hover:border-primary/30">
      <CardContent className="p-space-3">
        <div className="flex items-start justify-between gap-space-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              {job.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-foreground/80">{job.company}</p>
          </div>
          <div className="flex items-center gap-space-1 shrink-0">
            {matchScore !== undefined && <MatchBadge score={matchScore} />}
            <Badge
              variant="outline"
              className={`text-xs ${sourceColors[job.source] || ""}`}
            >
              {job.source}
            </Badge>
          </div>
        </div>

        <div className="mt-space-2 flex flex-wrap items-center gap-space-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
          <span className="text-border">•</span>
          <span>{job.mode}</span>
          <span className="text-border">•</span>
          <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
        </div>

        <p className="mt-space-1 text-sm text-muted-foreground">{job.salaryRange}</p>

        <div className="mt-space-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatDaysAgo(job.postedDaysAgo)}
        </div>

        {/* Status selector */}
        <div className="mt-space-2 flex flex-wrap items-center gap-1">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(job.id, s)}
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                status === s ? statusStyles[s] : "bg-transparent text-muted-foreground/60 border-transparent hover:border-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-space-2 flex items-center gap-space-1">
          <Button variant="outline" size="sm" onClick={() => onView(job)}>
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>
          <Button
            variant={isSaved ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleSave(job.id)}
          >
            {isSaved ? (
              <BookmarkCheck className="h-3.5 w-3.5" />
            ) : (
              <Bookmark className="h-3.5 w-3.5" />
            )}
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Apply
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
