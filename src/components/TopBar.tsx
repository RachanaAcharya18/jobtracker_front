interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "Not Started" | "In Progress" | "Shipped";
}

const statusStyles: Record<TopBarProps["status"], string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-warning/15 text-warning",
  Shipped: "bg-success/15 text-success",
};

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background px-space-4 py-space-2">
      <span className="text-sm font-semibold tracking-tight">{projectName}</span>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <span
        className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
      >
        {status}
      </span>
    </header>
  );
};

export default TopBar;
