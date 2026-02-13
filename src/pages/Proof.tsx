import { ClipboardCheck } from "lucide-react";

const Proof = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-space-4 py-space-5">
      <div className="rounded-full border p-space-3 text-muted-foreground">
        <ClipboardCheck className="h-8 w-8" />
      </div>
      <h1 className="mt-space-3 font-serif text-3xl font-semibold tracking-tight text-foreground">
        Proof of Work
      </h1>
      <p className="mt-space-2 max-w-md text-center text-muted-foreground">
        Artifacts and build evidence will be collected here as you progress through each step.
      </p>
    </div>
  );
};

export default Proof;
