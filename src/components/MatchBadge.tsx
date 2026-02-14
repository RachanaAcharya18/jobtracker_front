import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MatchBadgeProps {
  score: number;
}

const MatchBadge = ({ score }: MatchBadgeProps) => {
  const colorClass =
    score >= 80
      ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]"
      : score >= 60
        ? "bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]"
        : score >= 40
          ? "bg-secondary text-secondary-foreground"
          : "bg-muted text-muted-foreground";

  return (
    <Badge className={cn("text-xs font-semibold border-0", colorClass)}>
      {score}% match
    </Badge>
  );
};

export default MatchBadge;
