import { Mail, Copy, MailOpen, Sparkles, AlertCircle, SearchX, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDigest } from "@/hooks/useDigest";
import { useJobStatus } from "@/hooks/useJobStatus";
import { jobs } from "@/data/jobs";
import MatchBadge from "@/components/MatchBadge";
import { useToast } from "@/hooks/use-toast";

const statusBadgeStyles: Record<string, string> = {
  Applied: "bg-[hsl(210,60%,94%)] text-[hsl(210,60%,30%)] border-[hsl(210,60%,85%)]",
  Rejected: "bg-[hsl(0,60%,94%)] text-[hsl(0,60%,35%)] border-[hsl(0,60%,85%)]",
  Selected: "bg-[hsl(145,40%,92%)] text-[hsl(145,40%,28%)] border-[hsl(145,40%,82%)]",
};

const Digest = () => {
  const { digest, generate, digestText, hasPreferences, today } = useDigest();
  const { changes } = useJobStatus();
  const { toast } = useToast();

  const handleCopy = async () => {
    const text = digestText();
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: "Digest text copied successfully." });
  };

  const handleEmailDraft = () => {
    const text = digestText();
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(text);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  const hasPref = hasPreferences();

  // Recent status changes (last 10)
  const recentChanges = changes.slice(0, 10).map((c) => {
    const job = jobs.find((j) => j.id === c.jobId);
    return { ...c, job };
  }).filter((c) => c.job);

  if (!hasPref) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-space-4 py-space-5">
        <div className="rounded-full border p-space-3 text-muted-foreground">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="mt-space-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
          Preferences Required
        </h1>
        <p className="mt-space-2 max-w-md text-center text-muted-foreground">
          Set preferences to generate a personalized digest.
        </p>
        <Button className="mt-space-3" asChild>
          <a href="/settings">Set Preferences</a>
        </Button>
      </div>
    );
  }

  if (!digest) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-space-4 py-space-5">
        <div className="rounded-full border p-space-3 text-muted-foreground">
          <Mail className="h-8 w-8" />
        </div>
        <h1 className="mt-space-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
          Daily Digest
        </h1>
        <p className="mt-space-2 max-w-md text-center text-muted-foreground">
          Your personalized daily job summary will appear here every morning at 9AM.
        </p>
        <Button className="mt-space-3" onClick={generate}>
          <Sparkles className="h-4 w-4" />
          Generate Today's 9AM Digest (Simulated)
        </Button>
        <p className="mt-space-2 text-xs text-muted-foreground">
          Demo Mode: Daily 9AM trigger simulated manually.
        </p>

        {/* Show recent status updates even without digest */}
        {recentChanges.length > 0 && (
          <div className="mt-space-4 w-full max-w-2xl">
            <RecentStatusSection changes={recentChanges} />
          </div>
        )}
      </div>
    );
  }

  const noMatches = digest.entries.every((e) => e.matchScore === 0);

  if (noMatches) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-space-4 py-space-5">
        <div className="rounded-full border p-space-3 text-muted-foreground">
          <SearchX className="h-8 w-8" />
        </div>
        <h1 className="mt-space-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
          No Matching Roles Today
        </h1>
        <p className="mt-space-2 max-w-md text-center text-muted-foreground">
          Check again tomorrow or adjust your preferences.
        </p>
      </div>
    );
  }

  const formattedDate = new Date(digest.date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-1 flex-col px-space-4 py-space-4">
      <div className="mx-auto w-full max-w-2xl">
        {/* Email-style digest card */}
        <Card className="overflow-hidden">
          {/* Header */}
          <div className="border-b bg-primary px-space-3 py-space-3">
            <div className="flex items-center gap-space-2">
              <Mail className="h-5 w-5 text-primary-foreground" />
              <h1 className="font-serif text-xl font-semibold text-primary-foreground">
                Top 10 Jobs For You — 9AM Digest
              </h1>
            </div>
            <p className="mt-1 text-sm text-primary-foreground/80">{formattedDate}</p>
          </div>

          {/* Job list */}
          <CardContent className="divide-y p-0">
            {digest.entries.map((entry, i) => (
              <div key={entry.job.id} className="flex items-start gap-space-2 px-space-3 py-space-2">
                <span className="mt-0.5 shrink-0 font-serif text-lg font-semibold text-muted-foreground/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-space-1">
                    <div>
                      <p className="font-serif text-base font-semibold text-foreground">
                        {entry.job.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{entry.job.company}</p>
                    </div>
                    <MatchBadge score={entry.matchScore} />
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-space-1 text-xs text-muted-foreground">
                    <span>{entry.job.location}</span>
                    <span className="text-border">•</span>
                    <span>{entry.job.experience === "Fresher" ? "Fresher" : `${entry.job.experience} yrs`}</span>
                    <span className="text-border">•</span>
                    <span>{entry.job.salaryRange}</span>
                  </div>
                  <div className="mt-space-1">
                    <Button variant="outline" size="sm" asChild>
                      <a href={entry.job.applyUrl} target="_blank" rel="noopener noreferrer">
                        Apply
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Footer */}
          <div className="border-t px-space-3 py-space-2">
            <p className="text-xs text-muted-foreground">
              This digest was generated based on your preferences.
            </p>
          </div>
        </Card>

        {/* Action buttons */}
        <div className="mt-space-3 flex flex-wrap items-center gap-space-2">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            Copy Digest to Clipboard
          </Button>
          <Button variant="outline" onClick={handleEmailDraft}>
            <MailOpen className="h-4 w-4" />
            Create Email Draft
          </Button>
        </div>

        {/* Recent Status Updates */}
        {recentChanges.length > 0 && (
          <div className="mt-space-4">
            <RecentStatusSection changes={recentChanges} />
          </div>
        )}

        <p className="mt-space-3 text-center text-xs text-muted-foreground">
          Demo Mode: Daily 9AM trigger simulated manually.
        </p>
      </div>
    </div>
  );
};

function RecentStatusSection({ changes }: { changes: Array<{ jobId: number; status: string; date: string; job: any }> }) {
  return (
    <Card>
      <div className="border-b px-space-3 py-space-2">
        <div className="flex items-center gap-space-1">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-serif text-base font-semibold text-foreground">Recent Status Updates</h2>
        </div>
      </div>
      <CardContent className="divide-y p-0">
        {changes.map((c, i) => (
          <div key={`${c.jobId}-${i}`} className="flex items-center justify-between px-space-3 py-space-2">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{c.job.title}</p>
              <p className="text-xs text-muted-foreground">{c.job.company}</p>
            </div>
            <div className="flex items-center gap-space-1 shrink-0">
              <Badge variant="outline" className={`text-xs ${statusBadgeStyles[c.status] || ""}`}>
                {c.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(c.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Digest;
