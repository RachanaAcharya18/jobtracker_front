import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Save, CheckCircle, RotateCcw, AlertTriangle, Info } from "lucide-react";
import { usePreferences } from "@/hooks/usePreferences";
import { Preferences } from "@/types/preferences";
import { toast } from "sonner";
import { useTestChecklist, TEST_ITEMS } from "@/hooks/useTestChecklist";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const ALL_LOCATIONS = [
  "Bangalore", "Chennai", "Hyderabad", "Mumbai", "Pune",
  "Noida", "Gurgaon", "Goa", "Mysore", "Multiple Locations",
];

const MODES = ["Remote", "Hybrid", "Onsite"] as const;
const EXPERIENCE_LEVELS = ["Fresher", "0-1", "1-3", "3-5"];

const Settings = () => {
  const { preferences, save } = usePreferences();
  const { checked, toggle, reset, passedCount, allPassed, total } = useTestChecklist();

  const [roleKeywords, setRoleKeywords] = useState(preferences.roleKeywords.join(", "));
  const [selectedLocations, setSelectedLocations] = useState<string[]>(preferences.preferredLocations);
  const [selectedModes, setSelectedModes] = useState<string[]>(preferences.preferredModes);
  const [experienceLevel, setExperienceLevel] = useState(preferences.experienceLevel);
  const [skills, setSkills] = useState(preferences.skills.join(", "));
  const [minMatchScore, setMinMatchScore] = useState(preferences.minMatchScore);

  const addLocation = (loc: string) => {
    if (loc && !selectedLocations.includes(loc)) {
      setSelectedLocations((prev) => [...prev, loc]);
    }
  };

  const removeLocation = (loc: string) => {
    setSelectedLocations((prev) => prev.filter((l) => l !== loc));
  };

  const toggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleSave = () => {
    const prefs: Preferences = {
      roleKeywords: roleKeywords.split(",").map((s) => s.trim()).filter(Boolean),
      preferredLocations: selectedLocations,
      preferredModes: selectedModes as Preferences["preferredModes"],
      experienceLevel,
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
      minMatchScore,
    };
    save(prefs);
    toast.success("Preferences saved successfully");
  };

  return (
    <div className="flex flex-1 flex-col px-space-4 py-space-4">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Preferences
        </h1>
        <p className="mt-space-1 text-muted-foreground">
          Configure your job tracking criteria for intelligent matching.
        </p>

        <div className="mt-space-4 flex flex-col gap-space-3">
          {/* Role Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Role Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g. Frontend, SDE Intern, Backend Developer"
                value={roleKeywords}
                onChange={(e) => setRoleKeywords(e.target.value)}
              />
              <p className="mt-space-1 text-xs text-muted-foreground">
                Comma-separated keywords matched against job titles and descriptions.
              </p>
            </CardContent>
          </Card>

          {/* Preferred Locations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preferred Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={addLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Add a location…" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_LOCATIONS.filter((l) => !selectedLocations.includes(l)).map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedLocations.length > 0 && (
                <div className="mt-space-2 flex flex-wrap gap-space-1">
                  {selectedLocations.map((loc) => (
                    <Badge key={loc} variant="secondary" className="gap-1 pr-1">
                      {loc}
                      <button onClick={() => removeLocation(loc)} className="ml-1 rounded-full hover:bg-muted">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Work Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Work Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-space-3">
                {MODES.map((mode) => (
                  <label key={mode} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={selectedModes.includes(mode)}
                      onCheckedChange={() => toggleMode(mode)}
                    />
                    <span className="text-sm">{mode}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Level */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Experience Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "Fresher" ? "Fresher" : `${level} yrs`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g. React, Python, Java, SQL"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <p className="mt-space-1 text-xs text-muted-foreground">
                Comma-separated skills matched against job requirements.
              </p>
            </CardContent>
          </Card>

          {/* Min Match Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Minimum Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-space-3">
                <Slider
                  value={[minMatchScore]}
                  onValueChange={(v) => setMinMatchScore(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="w-12 text-right text-sm font-medium text-foreground">
                  {minMatchScore}%
                </span>
              </div>
              <p className="mt-space-1 text-xs text-muted-foreground">
                Jobs below this score will be hidden when the threshold toggle is active.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-space-4">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </div>

        <Separator className="my-space-4" />

        {/* Test Checklist */}
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Test Checklist
          </h2>
          <p className="mt-space-1 text-muted-foreground">
            Verify each feature before shipping.
          </p>

          <div className="mt-space-3 rounded-md border border-border bg-card p-space-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Tests Passed: {passedCount} / {total}
              </p>
              <Button variant="ghost" size="sm" onClick={reset}>
                <RotateCcw className="mr-1 h-3.5 w-3.5" />
                Reset
              </Button>
            </div>

            {!allPassed && (
              <div className="mt-space-2 flex items-center gap-space-2 rounded-md border border-warning/30 bg-warning/5 p-space-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
                <p className="text-xs text-muted-foreground">
                  Resolve all issues before shipping.
                </p>
              </div>
            )}

            <div className="mt-space-3 flex flex-col gap-space-2">
              {TEST_ITEMS.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer rounded-md p-1.5 transition-all duration-[200ms] ease-in-out hover:bg-accent/50"
                >
                  <Checkbox
                    checked={!!checked[item.id]}
                    onCheckedChange={() => toggle(item.id)}
                  />
                  <span className={`flex-1 text-sm ${checked[item.id] ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {item.label}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        <Info className="h-3.5 w-3.5 text-muted-foreground/60" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-[220px] text-xs">
                      {item.howToTest}
                    </TooltipContent>
                  </Tooltip>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
