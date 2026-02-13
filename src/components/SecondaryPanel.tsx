import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Check, Copy, ExternalLink, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  promptText: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, promptText }: SecondaryPanelProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="flex flex-col gap-space-3">
      <Card>
        <CardHeader className="pb-space-2">
          <CardTitle className="text-lg">{stepTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{stepDescription}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-space-2">
          <CardTitle className="text-sm text-muted-foreground font-sans font-medium">Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border bg-muted p-space-2">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-foreground">{promptText}</pre>
          </div>
          <div className="mt-space-2 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={handleCopy}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button size="sm" variant="default">
              <ExternalLink className="h-3.5 w-3.5" />
              Build in Lovable
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-space-2">
          <CardTitle className="text-sm text-muted-foreground font-sans font-medium">Feedback</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button size="sm" variant="success">
            <Check className="h-3.5 w-3.5" />
            It Worked
          </Button>
          <Button size="sm" variant="outline">
            <AlertCircle className="h-3.5 w-3.5" />
            Error
          </Button>
          <Button size="sm" variant="outline">
            <Camera className="h-3.5 w-3.5" />
            Add Screenshot
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};

export default SecondaryPanel;
