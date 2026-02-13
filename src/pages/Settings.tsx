import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="flex flex-1 flex-col px-space-4 py-space-4">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Preferences
        </h1>
        <p className="mt-space-1 text-muted-foreground">
          Configure your job tracking criteria.
        </p>

        <div className="mt-space-4 flex flex-col gap-space-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Role Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                placeholder="e.g. Frontend Engineer, Product Designer"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background transition-all duration-default"
                disabled
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preferred Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                placeholder="e.g. Bangalore, Mumbai, Hyderabad"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background transition-all duration-default"
                disabled
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Work Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-space-2">
                {["Remote", "Hybrid", "Onsite"].map((mode) => (
                  <span
                    key={mode}
                    className="rounded-md border px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {mode}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Experience Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-space-2">
                {["Fresher", "1–3 yrs", "3–5 yrs", "5+ yrs"].map((level) => (
                  <span
                    key={level}
                    className="rounded-md border px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-space-4">
          <Button disabled>Save Preferences</Button>
          <p className="mt-space-1 text-xs text-muted-foreground">
            Preference logic will be implemented in the next step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
