import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Circle,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { useTestChecklist, TEST_ITEMS } from "@/hooks/useTestChecklist";
import { useProofSubmission, isValidUrl, ProofLinks } from "@/hooks/useProofSubmission";
import { toast } from "sonner";

const STEPS = [
  "Project Setup & Landing Page",
  "Layout & Navigation Shell",
  "Job Data & Card Grid",
  "Job Detail Modal & Save",
  "Preferences & Match Scoring",
  "Daily Digest Engine",
  "Status Tracking & Notifications",
  "Test Checklist & Proof",
];

const Proof = () => {
  const { passedCount, allPassed, total } = useTestChecklist();
  const { links, saveLinks, shipStatus, updateStatus, allLinksValid } = useProofSubmission();

  const [lovableUrl, setLovableUrl] = useState(links.lovableUrl);
  const [githubUrl, setGithubUrl] = useState(links.githubUrl);
  const [deployedUrl, setDeployedUrl] = useState(links.deployedUrl);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!lovableUrl.trim()) e.lovableUrl = "Required";
    else if (!isValidUrl(lovableUrl)) e.lovableUrl = "Enter a valid URL";
    if (!githubUrl.trim()) e.githubUrl = "Required";
    else if (!isValidUrl(githubUrl)) e.githubUrl = "Enter a valid URL";
    if (!deployedUrl.trim()) e.deployedUrl = "Required";
    else if (!isValidUrl(deployedUrl)) e.deployedUrl = "Enter a valid URL";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveLinks = () => {
    if (!validate()) return;
    const updated: ProofLinks = { lovableUrl: lovableUrl.trim(), githubUrl: githubUrl.trim(), deployedUrl: deployedUrl.trim() };
    saveLinks(updated);
    if (shipStatus === "Not Started") updateStatus("In Progress");
    toast.success("Links saved");
  };

  const canShip = allLinksValid && allPassed;

  const handleShip = () => {
    if (!validate()) return;
    if (!allPassed) {
      toast.error(`Complete all ${total} test checklist items first`);
      return;
    }
    const updated: ProofLinks = { lovableUrl: lovableUrl.trim(), githubUrl: githubUrl.trim(), deployedUrl: deployedUrl.trim() };
    saveLinks(updated);
    updateStatus("Shipped");
    toast.success("Project 1 Shipped Successfully.");
  };

  const copySubmission = () => {
    const text = `Job Notification Tracker — Final Submission

Lovable Project:
${links.lovableUrl}

GitHub Repository:
${links.githubUrl}

Live Deployment:
${links.deployedUrl}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const statusBadgeVariant = shipStatus === "Shipped" ? "default" : shipStatus === "In Progress" ? "secondary" : "outline";

  return (
    <div className="flex flex-1 flex-col px-space-4 py-space-4">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
              Proof of Work
            </h1>
            <p className="mt-space-1 text-muted-foreground">
              Project 1 — Job Notification Tracker
            </p>
          </div>
          <Badge variant={statusBadgeVariant} className="text-xs">
            {shipStatus}
          </Badge>
        </div>

        {/* Step Completion Summary */}
        <Card className="mt-space-3">
          <CardHeader>
            <CardTitle className="text-base">Step Completion Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-space-1 sm:grid-cols-2">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-success" />
                  <span className="text-sm text-foreground">
                    {i + 1}. {step}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Checklist Status */}
        <Card className="mt-space-2">
          <CardContent className="pt-space-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {allPassed ? (
                  <ShieldCheck className="h-5 w-5 text-success" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                )}
                <span className="text-sm font-medium text-foreground">
                  Test Checklist: {passedCount} / {total}
                </span>
              </div>
              {!allPassed && (
                <a href="/settings" className="text-xs text-primary underline underline-offset-2">
                  Complete in Settings
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        <Separator className="my-space-3" />

        {/* Artifact Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Artifact Collection</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-space-2">
            <div>
              <Label htmlFor="lovable-url" className="text-sm">Lovable Project Link</Label>
              <Input
                id="lovable-url"
                placeholder="https://lovable.dev/projects/..."
                value={lovableUrl}
                onChange={(e) => setLovableUrl(e.target.value)}
                className="mt-1"
              />
              {errors.lovableUrl && <p className="mt-1 text-xs text-destructive">{errors.lovableUrl}</p>}
            </div>
            <div>
              <Label htmlFor="github-url" className="text-sm">GitHub Repository Link</Label>
              <Input
                id="github-url"
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="mt-1"
              />
              {errors.githubUrl && <p className="mt-1 text-xs text-destructive">{errors.githubUrl}</p>}
            </div>
            <div>
              <Label htmlFor="deployed-url" className="text-sm">Deployed URL</Label>
              <Input
                id="deployed-url"
                placeholder="https://your-app.vercel.app"
                value={deployedUrl}
                onChange={(e) => setDeployedUrl(e.target.value)}
                className="mt-1"
              />
              {errors.deployedUrl && <p className="mt-1 text-xs text-destructive">{errors.deployedUrl}</p>}
            </div>

            <div className="flex gap-space-2 mt-space-1">
              <Button variant="secondary" onClick={handleSaveLinks}>
                Save Links
              </Button>
              {shipStatus === "Shipped" && (
                <Button variant="ghost" onClick={copySubmission}>
                  <Copy className="mr-1 h-4 w-4" />
                  Copy Final Submission
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ship Button */}
        <div className="mt-space-3">
          {shipStatus !== "Shipped" ? (
            <>
              <Button
                onClick={handleShip}
                disabled={!canShip}
                className="w-full"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Mark as Shipped
              </Button>
              {!canShip && (
                <p className="mt-space-1 text-center text-xs text-muted-foreground">
                  {!allPassed && !allLinksValid
                    ? "Complete all test items and provide all links to ship."
                    : !allPassed
                    ? "Complete all test checklist items to ship."
                    : "Provide all three artifact links to ship."}
                </p>
              )}
            </>
          ) : (
            <div className="rounded-md border border-success/30 bg-success/5 p-space-3 text-center">
              <ShieldCheck className="mx-auto h-6 w-6 text-success" />
              <p className="mt-space-1 font-serif text-lg font-medium text-foreground">
                Project 1 Shipped Successfully.
              </p>
              <Button variant="ghost" size="sm" className="mt-space-2" onClick={copySubmission}>
                <Copy className="mr-1 h-4 w-4" />
                Copy Final Submission
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proof;
