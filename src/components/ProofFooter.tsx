import { useState } from "react";

const checklistItems = [
  { id: "ui", label: "UI Built" },
  { id: "logic", label: "Logic Working" },
  { id: "test", label: "Test Passed" },
  { id: "deploy", label: "Deployed" },
];

const ProofFooter = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <footer className="border-t bg-background px-space-4 py-space-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-4">
          {checklistItems.map((item) => (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="flex items-center gap-2 text-sm transition-all duration-[200ms] ease-in-out hover:opacity-80"
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded border text-xs transition-all duration-[200ms] ease-in-out ${
                  checked[item.id]
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-transparent"
                }`}
              >
                ✓
              </span>
              <span className={checked[item.id] ? "text-foreground" : "text-muted-foreground"}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {completedCount} / {checklistItems.length} complete
        </span>
      </div>
    </footer>
  );
};

export default ProofFooter;
