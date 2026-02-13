import TopBar from "@/components/TopBar";
import ContextHeader from "@/components/ContextHeader";
import WorkspaceLayout from "@/components/WorkspaceLayout";
import SecondaryPanel from "@/components/SecondaryPanel";
import ProofFooter from "@/components/ProofFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PrimaryWorkspace = () => {
  return (
    <div className="flex flex-col gap-space-3">
      <Card>
        <CardHeader>
          <CardTitle>Design System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-body text-muted-foreground">
            The KodNest Premium Build System has been initialized. All tokens, typography,
            spacing, and component variants are configured and ready for use.
          </p>
          <div className="mt-space-3 grid grid-cols-2 gap-space-2">
            <div className="rounded-md border p-space-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Colors</p>
              <div className="mt-space-1 flex gap-2">
                <span className="h-8 w-8 rounded bg-background border" title="Background" />
                <span className="h-8 w-8 rounded bg-foreground" title="Foreground" />
                <span className="h-8 w-8 rounded bg-primary" title="Primary" />
                <span className="h-8 w-8 rounded bg-muted" title="Muted" />
              </div>
            </div>
            <div className="rounded-md border p-space-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Typography</p>
              <p className="mt-space-1 font-serif text-lg">Serif Heading</p>
              <p className="text-sm text-muted-foreground">Sans-serif body text</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Component Samples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-space-3">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-space-1">Buttons</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-space-1">Spacing Scale</p>
              <div className="flex items-end gap-1">
                {[8, 16, 24, 40, 64].map((size) => (
                  <div key={size} className="flex flex-col items-center gap-1">
                    <div
                      className="bg-primary/15 border border-primary/30 rounded"
                      style={{ width: size, height: size }}
                    />
                    <span className="text-[10px] text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-space-1">Input</p>
              <input
                type="text"
                placeholder="Clean input with clear focus state"
                className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-[200ms] ease-in-out placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-space-1">Empty State</p>
              <div className="rounded-md border border-dashed p-space-4 text-center">
                <p className="text-sm text-muted-foreground">No items yet.</p>
                <Button variant="outline" size="sm" className="mt-space-2">
                  Add your first item
                </Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-space-1">Error State</p>
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-space-2">
                <p className="text-sm font-medium text-destructive">Build failed</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  The deployment could not complete. Check that all environment variables are set, then try again.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={1}
        totalSteps={6}
        status="In Progress"
      />
      <ContextHeader
        headline="Design System Initialized"
        subtext="All tokens, components, and layout structures are configured. Ready to build."
      />
      <WorkspaceLayout
        primary={<PrimaryWorkspace />}
        secondary={
          <SecondaryPanel
            stepTitle="Step 1 — Foundation"
            stepDescription="The design system defines all visual tokens: colors, typography, spacing, and component variants. Every future component inherits from this foundation."
            promptText='Create a premium SaaS design system with off-white background (#F7F6F3), deep red accent (#8B0000), serif headings, and an 8px spacing scale.'
          />
        }
      />
      <ProofFooter />
    </div>
  );
};

export default Index;
