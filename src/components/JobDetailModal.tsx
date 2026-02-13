import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MapPin, ExternalLink } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailModal = ({ job, open, onOpenChange }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{job.title}</DialogTitle>
          <DialogDescription className="text-sm">
            {job.company} · {job.location} · {job.mode}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-space-3">
          <div className="flex flex-wrap items-center gap-space-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{job.location}</span>
            <span className="text-border">•</span>
            <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
            <span className="text-border">•</span>
            <span>{job.salaryRange}</span>
          </div>

          <div>
            <h4 className="mb-space-1 text-sm font-semibold text-foreground">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-space-1 text-sm font-semibold text-foreground">Description</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
          </div>

          <Button asChild className="w-full">
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Apply on {job.source}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
